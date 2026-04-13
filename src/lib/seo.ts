export const siteConfig = {
  name: 'Jouir de sa propre vie',
  url: 'https://www.jouirdesaproprevie.fr',
  locale: 'fr_FR',
  description:
    'Accompagnement en danse intuitive, tantra, coaching et méditation par Laetitia Sandoz. Explorez votre chemin vers l\'épanouissement personnel et la découverte de soi.',
  ogImage: 'https://www.jouirdesaproprevie.fr/og.png',
  twitterHandle: '@jouirdesaproprevie',
  themeColor: '#7c3a54',
  phone: '+33 6 00 00 00 00',
  email: 'lele3125@outlook.fr',
  address: {
    street: '',
    city: '',
    postalCode: '',
    country: 'FR',
  },
} as const

export type SeoMeta = {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

export function buildTitle(page?: string) {
  if (!page) return siteConfig.name
  return `${page} - ${siteConfig.name}`
}

export const routes = [
  '/',
  '/a-propos',
  '/services',
  '/contact',
  '/mentions-legales',
  '/politique-de-confidentialite',
  '/conditions-generales',
  '/politique-cookies',
] as const
