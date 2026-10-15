import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface InscriptionAbonnementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planNom: string;
}

interface FormState {
  prenom: string;
  nom: string;
  email: string;
  contact: string;
  adresse: string;
}

const champsVides: FormState = {
  prenom: '',
  nom: '',
  email: '',
  contact: '',
  adresse: '',
};

export default function InscriptionAbonnementDialog({
  open,
  onOpenChange,
  planNom,
}: InscriptionAbonnementDialogProps) {
  const [form, setForm] = useState<FormState>(champsVides);
  const [erreur, setErreur] = useState('');

  function champ(cle: keyof FormState) {
    return {
      value: form[cle],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [cle]: e.target.value })),
    };
  }

  function fermer(open: boolean) {
    if (!open) {
      setForm(champsVides);
      setErreur('');
    }
    onOpenChange(open);
  }

  function handleSubmit() {
    if (!form.prenom.trim() || !form.nom.trim() || !form.email.trim() || !form.contact.trim()) {
      setErreur('Merci de renseigner au moins le prénom, le nom, l\'email et le contact.');
      return;
    }
    setErreur('');

    const sujet = `Demande d'abonnement ${planNom} - LocaCar`;
    const corps = [
      `Plan souhaité : ${planNom}`,
      '',
      `Prénom : ${form.prenom}`,
      `Nom : ${form.nom}`,
      `Email : ${form.email}`,
      `Contact : ${form.contact}`,
      `Adresse : ${form.adresse || 'Non précisée'}`,
    ].join('\n');

    window.location.href = `mailto:contact@locacar.com?subject=${encodeURIComponent(
      sujet
    )}&body=${encodeURIComponent(corps)}`;

    fermer(false);
  }

  return (
    <Dialog open={open} onOpenChange={fermer}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demande d'abonnement — {planNom}</DialogTitle>
          <DialogDescription>
            Laissez-nous vos coordonnées, nous revenons vers vous pour finaliser votre inscription.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
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

          {erreur && <p className="text-sm text-red-600">{erreur}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => fermer(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>Envoyer ma demande</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}