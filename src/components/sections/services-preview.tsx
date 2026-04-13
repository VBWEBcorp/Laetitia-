'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Music, Flame, HeartHandshake, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { SectionTitle } from '@/components/ui/section-title'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContent } from '@/hooks/use-content'

const iconMap: Record<string, any> = { Music, Flame, HeartHandshake, Sparkles }
const defaultServices = [
  { title: 'Danse Intuitive', desc: 'Laissez-vous guider par le mouvement spontané de votre corps pour libérer les émotions et retrouver l\'harmonie intérieure.' },
  { title: 'Tantra', desc: 'Explorez la connexion profonde entre le corps et l\'esprit à travers des pratiques millénaires de pleine conscience et de sensualité.' },
  { title: 'Coaching', desc: 'Recevez un accompagnement personnalisé pour surmonter les obstacles, atteindre vos objectifs et épanouir votre potentiel authentique.' },
  { title: 'Méditation', desc: 'Plongez dans un état de calme intérieur et de clarté mentale à travers des pratiques méditatives guidées pour une harmonie totale.' },
]

const defaultIcons = [Music, Flame, HeartHandshake, Sparkles]

const ease = [0.22, 1, 0.36, 1] as const

export function ServicesPreview() {
  const { data } = useContent('services', {
    hero: { eyebrow: 'Nos services' },
    services: defaultServices,
  })

  const services = (data.services ?? defaultServices).slice(0, 4)

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle
          eyebrow="Mes services"
          title="Un accompagnement adapté à votre chemin"
          description="Des pratiques variées pour vous accompagner vers l'épanouissement personnel et la découverte de soi."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((s: any, i: number) => {
            const Icon = defaultIcons[i] ?? Globe
            return (
              <motion.div
                key={s.title || i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, ease, delay: i * 0.04 }}
              >
                <Card className="h-full rounded-2xl border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <CardTitle className="font-display text-base">{s.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{s.desc || s.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" className="group" asChild>
            <Link href="/services">
              Voir tous mes services
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
