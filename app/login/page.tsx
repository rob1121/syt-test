import LoginButton from "@/components/login-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");

    if (access_token) {
        return redirect("/");
    }

  return <div>
    <LoginButton />
  </div>;
}