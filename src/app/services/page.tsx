import type { Metadata } from 'next'

import { ServicesContent } from './services-content'
import {
  breadcrumbJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from '@/components/seo/json-ld'

const description =
  'Danse intuitive, tantra, coaching, méditation, photothérapie et massage énergétique : découvrez les accompagnements proposés par Laetitia Sandoz pour votre épanouissement personnel.'

const services = [
  { title: 'Danse Intuitive', desc: 'Laissez-vous guider par le mouvement spontané de votre corps pour libérer les émotions et retrouver l\'harmonie intérieure.' },
  { title: 'Tantra', desc: 'Explorez la connexion profonde entre le corps et l\'esprit à travers des pratiques millénaires de pleine conscience.' },
  { title: 'Coaching personnalisé', desc: 'Un accompagnement sur mesure pour identifier ce qui vous fait vibrer et épanouir votre potentiel authentique.' },
  { title: 'Méditation guidée', desc: 'Plongez dans un état de calme intérieur et de clarté mentale pour une harmonie totale.' },
  { title: 'Photothérapie', desc: 'Utilisez l\'image comme miroir de votre beauté intérieure et célébrez qui vous êtes vraiment.' },
  { title: 'Massage énergétique', desc: 'Un toucher bienveillant qui libère les tensions et rééquilibre les énergies.' },
  { title: 'Accompagnement 3 mois', desc: 'Un programme complet avec 2 séances par mois pour prendre le chemin d\'une vie épanouie.' },
  { title: 'Séances découverte', desc: 'Une première rencontre pour découvrir les pratiques et poser vos intentions.' },
]

export const metadata: Metadata = {
  title: 'Services',
  description,
  alternates: { canonical: '/services' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Services', description, '/services'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    ...services.map((s) => serviceJsonLd(s.title, s.desc, '/services')),
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  )
}
