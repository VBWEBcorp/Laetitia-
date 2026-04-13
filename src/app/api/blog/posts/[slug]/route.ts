import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { BlogPost } from '@/models/Blog'
import { verifyAuth } from '@/lib/auth'

type Params = Promise<{ slug: string }>

const demoPosts: Record<string, any> = {
  'coaching-et-tantra-vers-une-vie-epanouie': {
    _id: 'demo-1',
    title: 'Coaching et tantra : vers une vie épanouie',
    slug: 'coaching-et-tantra-vers-une-vie-epanouie',
    excerpt: 'Découvrez comment l\'alliance du coaching et du tantra peut transformer votre quotidien et vous guider vers une vie plus épanouie.',
    content: '<h2>Le coaching et le tantra : deux approches complémentaires</h2><p>Le coaching personnalisé et les pratiques tantriques partagent un objectif commun : vous aider à vous reconnecter à votre être profond et à vivre une vie plus épanouie. Le coaching vous apporte la clarté mentale et les outils concrets pour avancer, tandis que le tantra vous reconnecte à votre corps et à vos sensations.</p><h2>S\'autoriser à jouir de la vie</h2><p>L\'important n\'est pas de tout comprendre, mais de s\'autoriser à vivre pleinement. C\'est un chemin de découverte de soi, fait de petits pas et de grandes révélations. Chaque séance est une invitation à explorer ce qui vous fait vibrer.</p><h2>Un accompagnement sur 3 mois</h2><p>Mon programme d\'accompagnement de 3 mois, avec 2 séances par mois, vous permet de prendre ce temps pour vous. Ensemble, nous explorons vos blocages, vos désirs profonds et les chemins vers une vie orgasmique — une vie où chaque instant est vécu avec présence et joie.</p>',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    category: 'Tantra',
    tags: ['tantra', 'coaching', 'épanouissement', 'bien-être'],
    author: 'Laetitia Sandoz',
    published: true,
    publishedAt: '2026-03-15T00:00:00.000Z',
  },
  'danse-intuitive-liberez-votre-energie-creative': {
    _id: 'demo-2',
    title: 'Danse intuitive : libérez votre énergie créative',
    slug: 'danse-intuitive-liberez-votre-energie-creative',
    excerpt: 'La danse intuitive n\'est pas une question de technique. C\'est un outil puissant pour se reconnecter à son corps et libérer ses émotions.',
    content: '<h2>Qu\'est-ce que la danse intuitive ?</h2><p>La danse intuitive, c\'est laisser le corps s\'exprimer librement, sans chorégraphie ni jugement. L\'important n\'est pas de bien danser, mais que la danse vous fasse du bien. Que vos mouvements vous libèrent de vos émotions, que vous puissiez exprimer à travers la danse vos différentes émotions.</p><h2>La vie est une danse</h2><p>Chaque émotion a son mouvement. La joie, la tristesse, la colère, la tendresse — toutes peuvent s\'exprimer à travers le corps. En dansant, vous apprenez à accueillir ce qui est là, sans le refouler ni le contrôler.</p><h2>Pour qui est la danse intuitive ?</h2><p>Pour tout le monde. Vous n\'avez besoin d\'aucune expérience en danse. Mon rôle est de créer un espace sûr et bienveillant où vous pouvez vous laisser aller, lâcher le mental et écouter votre corps.</p>',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    category: 'Danse Intuitive',
    tags: ['danse', 'intuition', 'créativité', 'mouvement'],
    author: 'Laetitia Sandoz',
    published: true,
    publishedAt: '2026-03-28T00:00:00.000Z',
  },
  'inspiration-quotidienne-textes-et-photos-revelateurs': {
    _id: 'demo-3',
    title: 'Inspiration quotidienne : textes et photos révélateurs',
    slug: 'inspiration-quotidienne-textes-et-photos-revelateurs',
    excerpt: 'Des mots et des images pour nourrir votre chemin intérieur. Comment la photothérapie et l\'écriture peuvent vous aider à vous voir autrement.',
    content: '<h2>Le pouvoir des mots et des images</h2><p>Nous vivons dans un monde d\'images, mais prenons-nous vraiment le temps de nous regarder ? La photothérapie est un outil puissant de découverte de soi. Se voir à travers l\'objectif, c\'est se voir autrement — célébrer sa beauté intérieure et extérieure.</p><h2>L\'écriture comme miroir de l\'âme</h2><p>Écrire, c\'est mettre des mots sur ce qui habite en nous. C\'est donner forme à nos ressentis, nos rêves, nos peurs. Dans mon accompagnement, j\'utilise l\'écriture intuitive comme un outil de connaissance de soi.</p><h2>Nourrir son chemin chaque jour</h2><p>L\'épanouissement personnel n\'est pas un événement ponctuel, c\'est un chemin quotidien. Chaque jour offre l\'occasion de se choisir, de s\'écouter et de s\'autoriser à vivre pleinement.</p>',
    coverImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    category: 'Bien-être',
    tags: ['inspiration', 'photothérapie', 'écriture', 'développement personnel'],
    author: 'Laetitia Sandoz',
    published: true,
    publishedAt: '2026-04-05T00:00:00.000Z',
  },
}

// GET single post by slug
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params
    await connectDB()

    const post = await BlogPost.findOne({ slug })
    if (!post) {
      const demo = demoPosts[slug]
      if (demo) return NextResponse.json(demo)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    const { slug } = await params
    const demo = demoPosts[slug]
    if (demo) return NextResponse.json(demo)
    console.error('Blog post error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update post (admin only)
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await params
    await connectDB()

    const body = await request.json()

    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date()
    }

    const post = await BlogPost.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Blog post update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE post (admin only)
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await params
    await connectDB()

    const post = await BlogPost.findOneAndDelete({ slug })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Post deleted' })
  } catch (error) {
    console.error('Blog post delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
