// show all the Events of the user

import Events from "@/components/Events";
import FormAddEvent from "@/components/FormAddEvent";

export default async function page() {
  return (
    <section className="mx-auto flex w-full flex-col items-start justify-start gap-4 rounded p-2 md:w-5/6 md:gap-8 md:p-4">
      <div className="flex-center relative h-fit w-full gap-2">
        <span className="text-balanced text-center text-4xl font-semibold tracking-tighter underline decoration-4 underline-offset-2">
          Your Life Events!
        </span>
        <FormAddEvent />
      </div>

      <Events />
    </section>
  );
}
