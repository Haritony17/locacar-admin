import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { fetchClients, createAccountForClient } from '@/services/clientsApi';
import type { Client } from '@/types/Client';
import NouveauClientDialog from '@/components/clients/NouveauClientDialog';

export default function ListeClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [creationEnCours, setCreationEnCours] = useState<string | null>(null);
  const [messageConfirmation, setMessageConfirmation] = useState('');

  useEffect(() => {
    chargerClients();
  }, []);

  function chargerClients() {
    setLoading(true);
    fetchClients()
      .then(setClients)
      .catch((err) => {
        if (err?.response?.status === 403) {
          setErreur("Accès réservé — ton compte n'a pas encore les droits pour voir les clients.");
        } else {
          setErreur('Impossible de charger la liste des clients.');
        }
      })
      .finally(() => setLoading(false));
  }

  async function handleCreerCompte(client: Client) {
    setCreationEnCours(client.id);
    setMessageConfirmation('');
    try {
      const res = await createAccountForClient(client.id);
      setMessageConfirmation(`Compte créé pour ${client.firstName} ${client.lastName} — identifiants envoyés à ${res.email}.`);
      setClients((prev) =>
        prev.map((c) =>
          c.id === client.id ? { ...c, userAccount: { id: res.userId, email: res.email } } : c
        )
      );
    } catch (err: any) {
      setMessageConfirmation(err?.response?.data?.error || 'Impossible de créer le compte.');
    } finally {
      setCreationEnCours(null);
    }
  }

  if (loading) return <p className="text-muted-foreground">Chargement...</p>;

  if (erreur) return <p className="text-red-600">{erreur}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground text-sm">Fiches clients créées en agence.</p>
        </div>
        <Button onClick={() => setDialogOuvert(true)}>+ Nouveau client</Button>
      </div>

      {messageConfirmation && (
        <p className="text-sm mb-4 p-3 rounded-md bg-muted">{messageConfirmation}</p>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Permis</TableHead>
            <TableHead>Compte</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                Aucun client pour l'instant.
              </TableCell>
            </TableRow>
          )}

          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.firstName} {client.lastName}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.email || '—'}</TableCell>
              <TableCell>{client.drivingLicenseNumber || '—'}</TableCell>
              <TableCell>
                {client.userAccount ? (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Avec compte</Badge>
                ) : (
                  <Badge variant="outline">Sans compte</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                {!client.userAccount && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!client.email || creationEnCours === client.id}
                    title={!client.email ? 'Email requis pour créer un compte' : undefined}
                    onClick={() => handleCreerCompte(client)}
                  >
                    {creationEnCours === client.id ? 'Création...' : 'Créer un compte'}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NouveauClientDialog
        open={dialogOuvert}
        onOpenChange={setDialogOuvert}
        onCreated={(client) => setClients((prev) => [client, ...prev])}
      />
    </div>
  );
}