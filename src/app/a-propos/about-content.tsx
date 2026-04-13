'use client'

import { motion } from 'framer-motion'
import { Heart, Flower2, HandHeart } from 'lucide-react'

import { CtaSection } from '@/components/sections/cta-section'
import { PageHero } from '@/components/sections/page-hero'
import { SectionTitle } from '@/components/ui/section-title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useContent } from '@/hooks/use-content'

const ease = [0.22, 1, 0.36, 1] as const
const defaultIcons = [Heart, Flower2, HandHeart]

const defaults = {
  hero: {
    eyebrow: 'À propos',
    title: 'Laetitia Sandoz, accompagnatrice vers l\'épanouissement',
    description: 'Un parcours atypique, une passion pour l\'accompagnement. Je guide les êtres sur le chemin de la découverte de soi à travers la danse intuitive, le tantra, le coaching et la méditation.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=80',
  },
  values: [
    { title: 'Bienveillance', description: 'Un espace sûr et sans jugement où vous pouvez explorer, guérir et vous connecter profondément avec votre être intérieur.' },
    { title: 'Authenticité', description: 'Chaque accompagnement est unique, adapté à votre rythme et à votre chemin personnel vers l\'épanouissement.' },
    { title: 'Connexion', description: 'Se reconnecter à son corps, ses émotions et son énergie pour retrouver l\'harmonie et la joie de vivre.' },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=600&q=80',
  ],
}

export function AboutContent() {
  const { data } = useContent('about', defaults)
  const hero = data.hero ?? defaults.hero
  const values = data.values ?? defaults.values
  const gallery = data.gallery ?? defaults.gallery

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        breadcrumb="À propos"
      />

      <section className="border-b border-border/60 bg-muted/10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow="Mes valeurs" title="Ce qui guide mon accompagnement" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((v: any, i: number) => {
              const Icon = defaultIcons[i] ?? Heart
              return (
                <motion.div
                  key={v.title || i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, ease, delay: i * 0.05 }}
                >
                  <Card className="h-full rounded-2xl border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5">
                    <CardHeader>
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="font-display text-base">{v.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow="En images" title="Mon univers" />
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {gallery.map((src: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease, delay: i * 0.06 }}
                className="overflow-hidden rounded-2xl"
              >
                <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
