import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/shared/ThemeToggle';
import {
  Car,
  LayoutDashboard,
  Users,
  Gauge,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const fonctionnalitesGratuites = [
  { icone: LayoutDashboard, titre: 'Tableau de bord', description: 'Vue d\'ensemble de votre agence en temps réel.' },
  { icone: Users, titre: 'Fiches clients', description: 'Créez et gérez vos clients en quelques clics.' },
  { icone: Gauge, titre: 'État des véhicules', description: 'Suivez la disponibilité de toute votre flotte.' },
];

const pourquoi = [
  { icone: Zap, titre: 'Rapide à prendre en main', description: 'Aucune formation nécessaire, interface pensée pour le terrain.' },
  { icone: ShieldCheck, titre: 'Données sécurisées', description: 'Vos informations clients et véhicules, protégées.' },
  { icone: Car, titre: 'Pensé pour la location', description: 'Conçu spécifiquement pour les agences de location de véhicules.' },
];

const offres = [
  {
    nom: 'Gratuit',
    prix: '0 $',
    periode: '/mois',
    description: 'Pour démarrer et découvrir le back-office LocaCar.',
    fonctionnalites: ['Tableau de bord', 'Créer des fiches clients', 'Voir l\'état des véhicules'],
    misEnAvant: false,
  },
  {
    nom: 'Pro',
    prix: '—',
    periode: '/mois',
    description: 'Pour les agences qui gèrent réservations et personnel au quotidien.',
    fonctionnalites: ['Tout Gratuit, plus :', 'Gestion des réservations', 'Création d\'employés', 'Rôles et permissions'],
    misEnAvant: true,
  },
  {
    nom: 'Entreprise',
    prix: 'Sur devis',
    periode: '',
    description: 'Pour les réseaux multi-agences avec besoins spécifiques.',
    fonctionnalites: ['Tout Pro, plus :', 'Multi-agences', 'Facturation détaillée', 'Support prioritaire'],
    misEnAvant: false,
  },
];

export default function Vitrine() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-xl p-2">
            <Car className="size-5" />
          </div>
          <h1 className="text-xl font-bold">LocaCar</h1>
        </div>
        <ThemeToggle />
      </header>

      {/* HERO */}
<section className="relative overflow-hidden px-6 pt-16 pb-24 min-h-[520px] flex items-center">
  <div
    className="absolute inset-0 -z-10 bg-cover bg-center"
    style={{ backgroundImage: "url('https://unsplash.com/fr/photos/une-rangee-de-voitures-garees-dans-un-parking-jzttMs1pZ70')" }}
  />
  <div className="absolute inset-0 -z-10 bg-black/60" />

  <div className="text-center max-w-2xl mx-auto">
    <Badge className="mb-4 bg-white/10 text-white border-white/20">
      Pour les agences de location
    </Badge>
    <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-white">
      Gérez votre agence
      <br />
      en toute simplicité
    </h2>
    <p className="text-white/80 text-lg mb-8">
      Tableau de bord, clients, véhicules et réservations — tout au même endroit.
      Commencez gratuitement, évoluez selon vos besoins.
    </p>
    <div className="flex flex-wrap gap-3 justify-center">
      <a
        href="mailto:contact@locacar.com?subject=Demande d'accès LocaCar"
        className={buttonVariants({ size: 'lg' }) + ' gap-2'}
      >
        Demander un accès <ArrowRight className="size-4" />
      </a>
      <a
        href="#tarifs"
        className="inline-flex items-center justify-center h-10 px-4 rounded-4xl border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors"
      >
        Voir les tarifs
      </a>
    </div>
  </div>
</section>

      {/* INCLUS GRATUITEMENT */}
      <section className="px-6 py-16 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-2">Inclus gratuitement</h3>
          <p className="text-muted-foreground text-center mb-10">
            Tout ce qu'il faut pour démarrer, sans carte bancaire.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {fonctionnalitesGratuites.map(({ icone: Icone, titre, description }) => (
              <Card key={titre} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="bg-primary/10 text-primary rounded-xl size-11 flex items-center justify-center mb-4">
                    <Icone className="size-5" />
                  </div>
                  <p className="font-semibold mb-1">{titre}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI LOCACAR */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-10">Pourquoi LocaCar</h3>
        <div className="grid sm:grid-cols-3 gap-8">
          {pourquoi.map(({ icone: Icone, titre, description }) => (
            <div key={titre} className="text-center">
              <div className="bg-primary/10 text-primary rounded-full size-12 flex items-center justify-center mx-auto mb-4">
                <Icone className="size-6" />
              </div>
              <p className="font-semibold mb-1">{titre}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="px-6 py-16 max-w-5xl mx-auto scroll-mt-8">
        <h3 className="text-2xl font-bold text-center mb-2">Des offres pour chaque agence</h3>
        <p className="text-muted-foreground text-center mb-10">
          Débloquez plus de fonctionnalités quand votre agence grandit.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {offres.map((offre) => (
            <Card
              key={offre.nom}
              className={
                offre.misEnAvant
                  ? 'relative border-2 border-primary shadow-lg md:-translate-y-3'
                  : 'border-border'
              }
            >
              {offre.misEnAvant && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Le plus populaire</Badge>
              )}
              <CardContent className="p-6 flex flex-col h-full">
                <h4 className="text-lg font-bold">{offre.nom}</h4>
                <p className="text-3xl font-bold mt-2">
                  {offre.prix}
                  <span className="text-sm font-normal text-muted-foreground">{offre.periode}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2 mb-6">{offre.description}</p>

                <ul className="space-y-2.5 text-sm mb-6 flex-1">
                  {offre.fonctionnalites.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:contact@locacar.com?subject=Demande d'accès LocaCar"
                  className={buttonVariants({ variant: offre.misEnAvant ? 'default' : 'outline' })}
                >
                  {offre.nom === 'Entreprise' ? 'Nous contacter' : 'Demander un accès'}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto bg-primary text-primary-foreground rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold mb-3">Prêt à simplifier la gestion de votre agence ?</h3>
          <p className="mb-6 opacity-90">Rejoignez les agences qui gèrent déjà leur flotte avec LocaCar.</p>
          <a
            href="mailto:contact@locacar.com?subject=Demande d'accès LocaCar"
            className="inline-flex items-center gap-2 bg-background text-foreground rounded-full px-6 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Demander un accès <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <footer className="text-center text-sm text-muted-foreground py-8 border-t">
        © {new Date().getFullYear()} LocaCar. Gestion de flotte pour agences de location.
      </footer>
    </div>
  );
}