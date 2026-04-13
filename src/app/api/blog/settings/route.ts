import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { BlogSettings } from '@/models/Blog'
import { verifyAuth } from '@/lib/auth'

const defaultSettings = {
  enabled: true,
  title: 'Inspirations & Partages',
  eyebrow: 'Blog',
  description: 'Retrouvez mes réflexions sur la danse intuitive, le tantra, le coaching et le chemin vers l\'épanouissement personnel.',
  categories: ['Danse Intuitive', 'Tantra', 'Coaching', 'Bien-être'],
}

export async function GET() {
  try {
    await connectDB()
    const settings = await BlogSettings.findOne()
    if (!settings) {
      return NextResponse.json(defaultSettings)
    }
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Blog settings error:', error)
    return NextResponse.json(defaultSettings)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    let settings = await BlogSettings.findOne()
    if (!settings) {
      settings = await BlogSettings.create(body)
    } else {
      const fields = ['enabled', 'title', 'description', 'eyebrow', 'heroImage', 'categories']
      for (const field of fields) {
        if (body[field] !== undefined) (settings as any)[field] = body[field]
      }
      await settings.save()
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Blog settings update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
