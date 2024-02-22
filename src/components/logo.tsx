import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <Link className="flex gap-4" href="/">
      <Image src="/logo.png" alt="Logo" width={32} height={32} />
      <h1
        className="font-bold hidden sm:block text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400
       text-transparent bg-clip-text"
      >
        PageForm
      </h1>
    </Link>
  );
};

export default Logo;
