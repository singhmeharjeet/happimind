// show all the Events of the user

import Events from "@/components/lists/Events";
import FormAddEvent from "@/components/forms/AddEvent";

export default async function page() {
  return (
    <>
      <div className="flex-center relative h-fit w-full gap-2">
        <span className="text-balanced text-center text-4xl font-semibold tracking-tighter underline decoration-4 underline-offset-2">
          Your Life Events!
        </span>
        <FormAddEvent />
      </div>

      <Events />
    </>
  );
}
