import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="relative flex min-h-16 w-full items-center justify-center gap-4 backdrop-blur-3xl">
      <div>
        <p>&copy; {new Date().getFullYear()} HappiMind All rights reserved.</p>
      </div>

      <ul className="flex-center absolute left-0 top-0 h-full">
        <ol>
          <Button variant="link">
            <Link target="_blank" href="https://meharjeet.com">
              Made By
            </Link>
          </Button>
        </ol>
      </ul>
    </footer>
  );
};

export default Footer;
