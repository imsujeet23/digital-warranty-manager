/**
 * PageLayout Component
 * 
 * Provides consistent page structure with header and content area.
 */

import { ReactNode } from 'react';
import { Header } from './Header';

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * PageLayout wraps pages with the header and standard content structure.
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        {children}
      </main>
    </div>
  );
}
