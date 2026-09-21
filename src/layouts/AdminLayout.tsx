import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { useAuth } from '@/context/AuthContext';

const liens = [
  { to: '/clients', label: 'Clients' },
  // { to: '/reservations', label: 'Réservations' },   // à activer une fois la page faite
  // { to: '/vehicules', label: 'Véhicules' },          // idem
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 border-r flex flex-col p-4 gap-1">
        <h2 className="font-bold text-lg mb-4">LocaCar</h2>

        {liens.map((lien) => (
          <NavLink
            key={lien.to}
            to={lien.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${isActive ? 'bg-muted font-medium' : 'text-muted-foreground hover:bg-muted'}`
            }
          >
            {lien.label}
          </NavLink>
        ))}

        <div className="mt-auto flex flex-col gap-2">
          <ThemeToggle />
          {user && <p className="text-xs text-muted-foreground px-1">{user.firstName} {user.lastName}</p>}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}