import Logo from '@/components/logo';
import ThemeSwitcher from '@/components/theme-switcher';
import { UserButton } from '@clerk/nextjs';
import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex items-center justify-between border-b border-muted-foreground/20 h-[60px] px-4 py-2 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
