import React from "react";
export default function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-auto w-full">
      <ul className="grid h-auto w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
        {children}
      </ul>
    </div>
  );
}
