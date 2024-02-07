import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blur flex min-h-16 w-full items-center justify-center gap-4 shadow backdrop-blur-3xl">
      <div className="w-30 relative flex h-full w-auto items-center justify-center">
        <Image
          src="/assets/logo.png"
          alt="logo"
          height={200}
          width={200}
          className="aspect-auto rounded object-fill"
        />
      </div>
      <div>
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
