// show all the Events of the user

import Events from "@/components/lists/Events";
import AddEvent from "@/components/forms/AddEvent";
import Title from "@/components/ui/Title";

export default async function page() {
  return (
    <>
      <div className="flex-center relative h-fit w-full gap-2">
        <Title size="lg" variant="underline">
          Your Life Events
        </Title>
        <AddEvent />
      </div>

      <Events />
    </>
  );
}
