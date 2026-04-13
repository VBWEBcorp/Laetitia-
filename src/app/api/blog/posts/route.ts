import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { BlogPost } from '@/models/Blog'
import { verifyAuth } from '@/lib/auth'

const demoPosts = [
  {
    _id: 'demo-1',
    title: 'Coaching et tantra : vers une vie épanouie',
    slug: 'coaching-et-tantra-vers-une-vie-epanouie',
    excerpt: 'Découvrez comment l\'alliance du coaching et du tantra peut transformer votre quotidien et vous guider vers une vie plus épanouie et connectée à votre être profond.',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    category: 'Tantra',
    tags: ['tantra', 'coaching', 'épanouissement', 'bien-être'],
    author: 'Laetitia Sandoz',
    published: true,
    publishedAt: '2026-03-15T00:00:00.000Z',
  },
  {
    _id: 'demo-2',
    title: 'Danse intuitive : libérez votre énergie créative',
    slug: 'danse-intuitive-liberez-votre-energie-creative',
    excerpt: 'La danse intuitive n\'est pas une question de technique. C\'est un outil puissant pour se reconnecter à son corps, libérer ses émotions et exprimer sa créativité profonde.',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    category: 'Danse Intuitive',
    tags: ['danse', 'intuition', 'créativité', 'mouvement'],
    author: 'Laetitia Sandoz',
    published: true,
    publishedAt: '2026-03-28T00:00:00.000Z',
  },
  {
    _id: 'demo-3',
    title: 'Inspiration quotidienne : textes et photos révélateurs',
    slug: 'inspiration-quotidienne-textes-et-photos-revelateurs',
    excerpt: 'Des mots et des images pour nourrir votre chemin intérieur. Comment la photothérapie et l\'écriture peuvent vous aider à vous voir autrement.',
    coverImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    category: 'Bien-être',
    tags: ['inspiration', 'photothérapie', 'écriture', 'développement personnel'],
    author: 'Laetitia Sandoz',
    published: true,
    publishedAt: '2026-04-05T00:00:00.000Z',
  },
]

// GET all posts (public: published only, admin: all)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { authenticated } = await verifyAuth(request)
    const filter = authenticated ? {} : { published: true }

    const posts = await BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 })
    if (posts.length === 0) return NextResponse.json(demoPosts)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Blog posts error:', error)
    return NextResponse.json(demoPosts)
  }
}

// POST create post (admin only)
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Generate slug from title
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Check slug uniqueness
    const existing = await BlogPost.findOne({ slug: body.slug })
    if (existing) {
      body.slug = `${body.slug}-${Date.now()}`
    }

    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date()
    }

    const post = await BlogPost.create(body)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
