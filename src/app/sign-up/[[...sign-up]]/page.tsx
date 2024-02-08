import { baseurl } from "@/lib/utils";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp redirectUrl={baseurl() + "/"} />;
}
