import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setErreur('Merci de renseigner votre email et votre mot de passe.');
      return;
    }

    setErreur('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/reservations');
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setErreur('Email ou mot de passe incorrect.');
      } else {
        setErreur(err?.message || 'Connexion impossible.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <h1 className="text-xl font-bold mb-1">LocaCar — Back-office</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Réservé au personnel de l'agence.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Mot de passe</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-1"
              />
            </div>

            {erreur && <p className="text-sm text-red-600">{erreur}</p>}

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}