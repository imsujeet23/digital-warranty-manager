/**
 * Header Component
 * 
 * Application header with navigation and branding.
 */

import { Link, useLocation } from 'react-router-dom';
import { Shield, FileText, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ to, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}

/**
 * Header provides the main navigation for the application.
 */
export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">
                WarrantyVault
              </h1>
              <p className="text-xs text-muted-foreground">
                Digital Warranty Manager
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <NavItem
              to="/warranties"
              icon={<FileText className="h-4 w-4" />}
              label="Warranties"
              isActive={location.pathname === '/warranties' || location.pathname === '/'}
            />
            <NavItem
              to="/register"
              icon={<UserPlus className="h-4 w-4" />}
              label="Register"
              isActive={location.pathname === '/register'}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
