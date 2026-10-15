import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ThemeToggle from '@/components/shared/ThemeToggle';
import {
  Car,
  Building2,
  Gauge,
  Headphones,
  Plug,
  FileText,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const avantages = [
  {
    icone: Building2,
    titre: 'Multi-agences sans limite',
    description: "Pilotez un réseau de 5, 20 ou 100 agences depuis un seul compte, avec des quotas taillés pour votre volume réel.",
  },
  {
    icone: Gauge,
    titre: 'Quotas personnalisés',
    description: 'Nombre de véhicules, d\'employés et de réservations ajusté à votre croissance — pas un palier figé.',
  },
  {
    icone: FileText,
    titre: 'Facturation détaillée',
    description: 'Export comptable par agence, consolidation de groupe, et historique complet de vos opérations.',
  },
  {
    icone: Headphones,
    titre: 'Support prioritaire',
    description: 'Un interlocuteur dédié et des délais de réponse garantis pour votre équipe.',
  },
  {
    icone: Plug,
    titre: 'Intégrations sur mesure',
    description: 'Connectez LocaCar à vos outils existants (comptabilité, CRM, GPS tiers) selon vos besoins.',
  },
  {
    icone: Sparkles,
    titre: 'Accompagnement au démarrage',
    description: 'Mise en place guidée et import de vos données existantes pour un lancement sans friction.',
  },
];

interface FormState {
  prenom: string;
  nom: string;
  email: string;
  contact: string;
  adresse: string;
  besoins: string;
}

const champsVides: FormState = {
  prenom: '',
  nom: '',
  email: '',
  contact: '',
  adresse: '',
  besoins: '',
};

export default function OffreCustom() {
  const [form, setForm] = useState<FormState>(champsVides);
  const [erreur, setErreur] = useState('');
  const [envoye, setEnvoye] = useState(false);

  function champ(cle: keyof FormState) {
    return {
      value: form[cle],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [cle]: e.target.value })),
    };
  }

  function handleSubmit() {
    if (!form.prenom.trim() || !form.nom.trim() || !form.email.trim() || !form.contact.trim()) {
      setErreur('Merci de renseigner au moins le prénom, le nom, l\'email et le contact.');
      return;
    }
    setErreur('');

    const sujet = "Demande d'abonnement Custom - LocaCar";
    const corps = [
      'Plan souhaité : Custom (sur mesure)',
      '',
      `Prénom : ${form.prenom}`,
      `Nom : ${form.nom}`,
      `Email : ${form.email}`,
      `Contact : ${form.contact}`,
      `Adresse : ${form.adresse || 'Non précisée'}`,
      '',
      `Besoins spécifiques : ${form.besoins || 'Non précisés'}`,
    ].join('\n');

    window.location.href = `mailto:contact@locacar.com?subject=${encodeURIComponent(
      sujet
    )}&body=${encodeURIComponent(corps)}`;

    setEnvoye(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-xl p-2">
            <Car className="size-5" />
          </div>
          <h1 className="text-xl font-bold">LocaCar</h1>
        </Link>
        <ThemeToggle />
      </header>

      {/* HERO CUSTOM */}
      <section className="px-6 pt-10 pb-16 max-w-4xl mx-auto text-center">
        <Link
          to="/#tarifs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          Retour aux offres
        </Link>
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          Offre Custom
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
          Une solution taillée pour
          <br />
          votre réseau d'agences
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Au-delà d'un certain nombre d'agences ou de véhicules, vos besoins deviennent uniques.
          Discutons de ce qu'il vous faut vraiment, et construisons votre plan ensemble.
        </p>
      </section>

      {/* AVANTAGES */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {avantages.map(({ icone: Icone, titre, description }) => (
            <Card key={titre} className="border-border">
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
      </section>

      {/* FORMULAIRE D'INSCRIPTION */}
      <section className="px-6 pb-20 max-w-xl mx-auto">
        <Card className="border-2 border-primary/30 shadow-lg">
          <CardContent className="p-8">
            {envoye ? (
              <div className="text-center py-6">
                <div className="bg-primary/10 text-primary rounded-full size-14 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="size-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Demande envoyée</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Votre client mail s'est ouvert avec les détails pré-remplis. Si rien ne s'est ouvert,
                  écrivez-nous directement à contact@locacar.com.
                </p>
                <Button variant="outline" onClick={() => { setForm(champsVides); setEnvoye(false); }}>
                  Envoyer une autre demande
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1">Parlons de votre projet</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Laissez-nous vos coordonnées et vos besoins, un conseiller LocaCar revient vers vous.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Prénom</Label>
                      <Input className="mt-1" placeholder="Jean" {...champ('prenom')} />
                    </div>
                    <div>
                      <Label>Nom</Label>
                      <Input className="mt-1" placeholder="Dupont" {...champ('nom')} />
                    </div>
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input className="mt-1" type="email" placeholder="jean.dupont@email.com" {...champ('email')} />
                  </div>

                  <div>
                    <Label>Contact (téléphone)</Label>
                    <Input className="mt-1" placeholder="034 00 000 00" {...champ('contact')} />
                  </div>

                  <div>
                    <Label>Adresse</Label>
                    <Input className="mt-1" placeholder="Antananarivo, Madagascar" {...champ('adresse')} />
                  </div>

                  <div>
                    <Label>Vos besoins (nombre d'agences, véhicules, intégrations...)</Label>
                    <Textarea
                      className="mt-1"
                      placeholder="Ex : 8 agences, environ 150 véhicules, besoin d'une intégration avec notre logiciel de comptabilité."
                      {...champ('besoins')}
                    />
                  </div>

                  {erreur && <p className="text-sm text-red-600">{erreur}</p>}

                  <Button onClick={handleSubmit} className="mt-2">
                    Envoyer ma demande
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <footer className="text-center text-sm text-muted-foreground py-8 border-t">
        © {new Date().getFullYear()} LocaCar. Gestion de flotte pour agences de location.
      </footer>
    </div>
  );
}