import { baseurl } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="m-auto">
      <SignIn redirectUrl={baseurl() + "/home"} />
    </div>
  );
}
