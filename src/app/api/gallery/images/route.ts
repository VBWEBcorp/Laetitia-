import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { GalleryImage } from '@/models/Gallery'
import { verifyAuth } from '@/lib/auth'

const demoImages = [
  {
    _id: 'demo-1',
    title: 'Connexion à la nature',
    description: 'Se reconnecter à la terre, sentir l\'énergie de la nature et retrouver l\'harmonie intérieure.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    category: 'Nature',
    order: 1,
    active: true,
  },
  {
    _id: 'demo-2',
    title: 'Méditation et pleine conscience',
    description: 'Un moment de calme pour se recentrer, respirer et être pleinement présente.',
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    category: 'Méditation',
    order: 2,
    active: true,
  },
  {
    _id: 'demo-3',
    title: 'Mouvement et liberté',
    description: 'La danse intuitive, un espace de liberté où le corps s\'exprime sans jugement.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    category: 'Danse',
    order: 3,
    active: true,
  },
  {
    _id: 'demo-4',
    title: 'Pieds dans le sable',
    description: 'Marcher pieds nus, sentir le sable chaud et l\'eau sur la peau. Un retour à l\'essentiel.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    category: 'Nature',
    order: 4,
    active: true,
  },
  {
    _id: 'demo-5',
    title: 'Yoga et équilibre',
    description: 'Trouver son équilibre intérieur à travers le mouvement et la respiration consciente.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    category: 'Bien-être',
    order: 5,
    active: true,
  },
  {
    _id: 'demo-6',
    title: 'Lumière intérieure',
    description: 'Chaque être porte en lui une lumière. Mon accompagnement vous aide à la révéler.',
    imageUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&q=80',
    category: 'Inspiration',
    order: 6,
    active: true,
  },
]

// GET all gallery images (public - only active)
export async function GET() {
  try {
    await connectDB()
    const images = await GalleryImage.find({ active: true }).sort({ order: 1 })
    if (images.length === 0) return NextResponse.json(demoImages)
    return NextResponse.json(images)
  } catch (error) {
    console.error('Gallery images error:', error)
    return NextResponse.json(demoImages)
  }
}

// POST create gallery image (admin only)
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { title, description, imageUrl, category, order } = await request.json()

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and imageUrl are required' },
        { status: 400 }
      )
    }

    const image = await GalleryImage.create({
      title,
      description,
      imageUrl,
      category: category || 'general',
      order: order || 0,
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Gallery image creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
