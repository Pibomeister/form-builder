import Logo from '@/components/logo';
import ThemeSwitcher from '@/components/theme-switcher';
import { ReactNode } from 'react';

function FormSubmitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
      <nav className="flex items-center justify-between border-b border-muted-foreground/20 h-[60px] px-4 py-2 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default FormSubmitLayout;
