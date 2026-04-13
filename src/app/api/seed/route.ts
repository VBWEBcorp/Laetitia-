import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { GalleryImage, GallerySettings } from '@/models/Gallery'
import { BlogPost, BlogSettings } from '@/models/Blog'
import { verifyAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const results: string[] = []

    // ─── Gallery: 6 photos univers bien-être ───
    const existingImages = await GalleryImage.countDocuments()
    if (existingImages === 0) {
      const galleryImages = [
        {
          title: 'Connexion à la nature',
          description: 'Se reconnecter à la terre, sentir l\'énergie de la nature et retrouver l\'harmonie intérieure.',
          imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
          category: 'Nature',
          order: 1,
          active: true,
        },
        {
          title: 'Méditation et pleine conscience',
          description: 'Un moment de calme pour se recentrer, respirer et être pleinement présente.',
          imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
          category: 'Méditation',
          order: 2,
          active: true,
        },
        {
          title: 'Mouvement et liberté',
          description: 'La danse intuitive, un espace de liberté où le corps s\'exprime sans jugement.',
          imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
          category: 'Danse',
          order: 3,
          active: true,
        },
        {
          title: 'Pieds dans le sable',
          description: 'Marcher pieds nus, sentir le sable chaud et l\'eau sur la peau. Un retour à l\'essentiel.',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
          category: 'Nature',
          order: 4,
          active: true,
        },
        {
          title: 'Yoga et équilibre',
          description: 'Trouver son équilibre intérieur à travers le mouvement et la respiration consciente.',
          imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
          category: 'Bien-être',
          order: 5,
          active: true,
        },
        {
          title: 'Lumière intérieure',
          description: 'Chaque être porte en lui une lumière. Mon accompagnement vous aide à la révéler.',
          imageUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&q=80',
          category: 'Inspiration',
          order: 6,
          active: true,
        },
      ]

      await GalleryImage.insertMany(galleryImages)
      results.push('6 images galerie créées')

      let gallerySettings = await GallerySettings.findOne()
      if (!gallerySettings) {
        await GallerySettings.create({
          enabled: true,
          title: 'Mon univers en images',
          description: 'Découvrez mon univers à travers des photos inspirantes. Nature, danse, connexion à soi et moments de pleine conscience.',
          eyebrow: 'Galerie',
        })
      } else {
        gallerySettings.enabled = true
        await gallerySettings.save()
      }
      results.push('Galerie activée')
    } else {
      results.push('Galerie déjà peuplée, ignorée')
    }

    // ─── Blog: 3 articles bien-être + catégories ───
    const existingPosts = await BlogPost.countDocuments()
    if (existingPosts === 0) {
      const blogPosts = [
        {
          title: 'Coaching et tantra : vers une vie épanouie',
          slug: 'coaching-et-tantra-vers-une-vie-epanouie',
          excerpt: 'Découvrez comment l\'alliance du coaching et du tantra peut transformer votre quotidien et vous guider vers une vie plus épanouie.',
          content: '<h2>Le coaching et le tantra : deux approches complémentaires</h2><p>Le coaching personnalisé et les pratiques tantriques partagent un objectif commun : vous aider à vous reconnecter à votre être profond et à vivre une vie plus épanouie. Le coaching vous apporte la clarté mentale et les outils concrets pour avancer, tandis que le tantra vous reconnecte à votre corps et à vos sensations.</p><h2>S\'autoriser à jouir de la vie</h2><p>L\'important n\'est pas de tout comprendre, mais de s\'autoriser à vivre pleinement. C\'est un chemin de découverte de soi, fait de petits pas et de grandes révélations. Chaque séance est une invitation à explorer ce qui vous fait vibrer.</p><h2>Un accompagnement sur 3 mois</h2><p>Mon programme d\'accompagnement de 3 mois, avec 2 séances par mois, vous permet de prendre ce temps pour vous. Ensemble, nous explorons vos blocages, vos désirs profonds et les chemins vers une vie orgasmique — une vie où chaque instant est vécu avec présence et joie.</p>',
          coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
          category: 'Tantra',
          tags: ['tantra', 'coaching', 'épanouissement', 'bien-être'],
          author: 'Laetitia Sandoz',
          published: true,
          publishedAt: new Date('2026-03-15'),
          metaTitle: 'Coaching et tantra : vers une vie épanouie - Jouir de sa propre vie',
          metaDescription: 'Découvrez comment l\'alliance du coaching et du tantra peut vous guider vers une vie plus épanouie et connectée.',
        },
        {
          title: 'Danse intuitive : libérez votre énergie créative',
          slug: 'danse-intuitive-liberez-votre-energie-creative',
          excerpt: 'La danse intuitive n\'est pas une question de technique. C\'est un outil puissant pour se reconnecter à son corps et libérer ses émotions.',
          content: '<h2>Qu\'est-ce que la danse intuitive ?</h2><p>La danse intuitive, c\'est laisser le corps s\'exprimer librement, sans chorégraphie ni jugement. L\'important n\'est pas de bien danser, mais que la danse vous fasse du bien. Que vos mouvements vous libèrent de vos émotions, que vous puissiez exprimer à travers la danse vos différentes émotions.</p><h2>La vie est une danse</h2><p>Chaque émotion a son mouvement. La joie, la tristesse, la colère, la tendresse — toutes peuvent s\'exprimer à travers le corps. En dansant, vous apprenez à accueillir ce qui est là, sans le refouler ni le contrôler.</p><h2>Pour qui est la danse intuitive ?</h2><p>Pour tout le monde. Vous n\'avez besoin d\'aucune expérience en danse. Mon rôle est de créer un espace sûr et bienveillant où vous pouvez vous laisser aller, lâcher le mental et écouter votre corps.</p>',
          coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
          category: 'Danse Intuitive',
          tags: ['danse', 'intuition', 'créativité', 'mouvement'],
          author: 'Laetitia Sandoz',
          published: true,
          publishedAt: new Date('2026-03-28'),
          metaTitle: 'Danse intuitive : libérez votre énergie créative - Jouir de sa propre vie',
          metaDescription: 'La danse intuitive pour se reconnecter à son corps, libérer ses émotions et exprimer sa créativité profonde.',
        },
        {
          title: 'Inspiration quotidienne : textes et photos révélateurs',
          slug: 'inspiration-quotidienne-textes-et-photos-revelateurs',
          excerpt: 'Des mots et des images pour nourrir votre chemin intérieur. Comment la photothérapie et l\'écriture peuvent vous aider à vous voir autrement.',
          content: '<h2>Le pouvoir des mots et des images</h2><p>Nous vivons dans un monde d\'images, mais prenons-nous vraiment le temps de nous regarder ? La photothérapie est un outil puissant de découverte de soi. Se voir à travers l\'objectif, c\'est se voir autrement — célébrer sa beauté intérieure et extérieure.</p><h2>L\'écriture comme miroir de l\'âme</h2><p>Écrire, c\'est mettre des mots sur ce qui habite en nous. C\'est donner forme à nos ressentis, nos rêves, nos peurs. Dans mon accompagnement, j\'utilise l\'écriture intuitive comme un outil de connaissance de soi.</p><h2>Nourrir son chemin chaque jour</h2><p>L\'épanouissement personnel n\'est pas un événement ponctuel, c\'est un chemin quotidien. Chaque jour offre l\'occasion de se choisir, de s\'écouter et de s\'autoriser à vivre pleinement.</p>',
          coverImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
          category: 'Bien-être',
          tags: ['inspiration', 'photothérapie', 'écriture', 'développement personnel'],
          author: 'Laetitia Sandoz',
          published: true,
          publishedAt: new Date('2026-04-05'),
          metaTitle: 'Inspiration quotidienne : textes et photos révélateurs - Jouir de sa propre vie',
          metaDescription: 'Photothérapie et écriture intuitive pour nourrir votre chemin intérieur et vous voir autrement.',
        },
      ]

      await BlogPost.insertMany(blogPosts)
      results.push('3 articles blog créés')

      let blogSettings = await BlogSettings.findOne()
      if (!blogSettings) {
        await BlogSettings.create({
          enabled: true,
          title: 'Inspirations & Partages',
          description: 'Retrouvez mes réflexions sur la danse intuitive, le tantra, le coaching et le chemin vers l\'épanouissement personnel.',
          eyebrow: 'Blog',
          categories: ['Danse Intuitive', 'Tantra', 'Coaching', 'Bien-être'],
        })
      } else {
        blogSettings.enabled = true
        if (!blogSettings.categories || blogSettings.categories.length === 0) {
          blogSettings.categories = ['Danse Intuitive', 'Tantra', 'Coaching', 'Bien-être']
        }
        await blogSettings.save()
      }
      results.push('Blog activé avec catégories')
    } else {
      results.push('Blog déjà peuplé, ignoré')
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
