import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen items-center gap-8 justify-center">
      <Image
        src="/logo.webp"
        className="rounded-full"
        height={140}
        width={140}
        alt="Page Form"
      />
      <h1
        className="font-bold text-4xl bg-gradient-to-r from-indigo-400 to-cyan-400
       text-transparent bg-clip-text"
      >
        PageForm
      </h1>
      <SignIn />
    </div>
  );
}
