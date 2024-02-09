export default async function page({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex w-full flex-col items-start justify-start gap-4 rounded p-2 md:w-5/6 md:gap-8 md:p-4">
      {children}
    </section>
  );
}
