'use client'

import { motion } from 'framer-motion'
import {
  Music, Flame, HeartHandshake, Sparkles, Camera, HandHeart, Flower2, Sun,
} from 'lucide-react'

import { CtaSection } from '@/components/sections/cta-section'
import { PageHero } from '@/components/sections/page-hero'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContent } from '@/hooks/use-content'

const ease = [0.22, 1, 0.36, 1] as const
const defaultIcons = [Music, Flame, HeartHandshake, Sparkles, Camera, HandHeart, Flower2, Sun]

const defaults = {
  hero: {
    eyebrow: 'Services',
    title: 'Un accompagnement pour chaque étape de votre chemin',
    description: 'Des pratiques variées et complémentaires pour vous accompagner vers l\'épanouissement personnel et la reconnexion à votre être profond.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=80',
  },
  services: [
    { title: 'Danse Intuitive', description: 'Laissez-vous guider par le mouvement spontané de votre corps pour libérer les émotions et retrouver l\'harmonie intérieure. L\'important n\'est pas de bien danser, mais que la danse vous fasse du bien.' },
    { title: 'Tantra', description: 'Explorez la connexion profonde entre le corps et l\'esprit à travers des pratiques millénaires de pleine conscience et de sensualité. Un chemin vers la présence et l\'éveil des sens.' },
    { title: 'Coaching personnalisé', description: 'Un accompagnement sur mesure pour surmonter les obstacles, identifier ce qui vous fait vibrer et épanouir votre potentiel authentique vers une vie orgasmique et jouissive.' },
    { title: 'Méditation guidée', description: 'Plongez dans un état de calme intérieur et de clarté mentale à travers des pratiques méditatives guidées pour une harmonie totale entre corps et esprit.' },
    { title: 'Photothérapie', description: 'Utilisez l\'image comme miroir de votre beauté intérieure. La photothérapie permet de se voir autrement et de célébrer qui vous êtes vraiment.' },
    { title: 'Massage énergétique', description: 'Un toucher bienveillant qui libère les tensions, rééquilibre les énergies et vous reconnecte à votre corps en profondeur.' },
    { title: 'Accompagnement 3 mois', description: 'Un programme complet de 3 mois avec 2 séances par mois pour prendre le chemin d\'une vie épanouie. Apprendre à voir ce qui vous fait vibrer et jouir de la vie.' },
    { title: 'Séances découverte', description: 'Une première rencontre pour découvrir les pratiques, poser vos intentions et commencer votre chemin vers vous-même en toute bienveillance.' },
  ],
}

export function ServicesContent() {
  const { data } = useContent('services', defaults)
  const hero = data.hero ?? defaults.hero
  const services = data.services ?? defaults.services

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        breadcrumb="Services"
      />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s: any, i: number) => {
              const Icon = defaultIcons[i] ?? Sparkles
              return (
                <motion.div
                  key={s.title || i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, ease, delay: i * 0.03 }}
                >
                  <Card className="h-full rounded-2xl border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                    <CardHeader>
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="font-display text-base">{s.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{s.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
