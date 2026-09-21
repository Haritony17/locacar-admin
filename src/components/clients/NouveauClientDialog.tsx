import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createClient } from '@/services/clientsApi';
import type { Client } from '@/types/Client';

interface NouveauClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (client: Client) => void;
}

export default function NouveauClientDialog({ open, onOpenChange, onCreated }: NouveauClientDialogProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');

  function reset() {
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setDrivingLicenseNumber('');
    setPassword('');
    setErreur('');
  }

  async function handleSubmit() {
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      setErreur('Prénom, nom et téléphone sont obligatoires.');
      return;
    }
    if (password.trim() && !email.trim()) {
      setErreur('Un email est nécessaire pour définir un mot de passe.');
      return;
    }

    setErreur('');
    setLoading(true);
    try {
      const client = await createClient({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        address: address.trim() || undefined,
        drivingLicenseNumber: drivingLicenseNumber.trim() || undefined,
        password: password.trim() || undefined,
      });
      onCreated(client);
      reset();
      onOpenChange(false);
    } catch (err: any) {
      setErreur(err?.response?.data?.error || 'Impossible de créer ce client.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau client</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-2">
          <div>
            <Label>Prénom *</Label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Nom *</Label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Téléphone *</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div className="col-span-2">
            <Label>Adresse</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1" />
          </div>
          <div className="col-span-2">
            <Label>N° permis de conduire</Label>
            <Input value={drivingLicenseNumber} onChange={(e) => setDrivingLicenseNumber(e.target.value)} className="mt-1" />
          </div>
          <div className="col-span-2">
            <Label>Mot de passe (optionnel)</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            <p className="text-xs text-muted-foreground mt-1">
              Si renseigné (avec un email), un compte est créé immédiatement. Sinon, tu pourras générer un compte plus tard.
            </p>
          </div>
        </div>

        {erreur && <p className="text-sm text-red-600">{erreur}</p>}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Création...' : 'Créer le client'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}