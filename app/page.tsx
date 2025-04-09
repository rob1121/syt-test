import Authenticating from "@/components/authenticating";
import YachtList from "@/components/yacht-list";
import { SearchParams } from "next/dist/server/request/search-params";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const cookieStore = await cookies();
  const {code} = await searchParams;


  if(code) {
    return <Authenticating code={code as string} />
  }

  if (!cookieStore.get("access_token")) {
    return redirect("/login");
  }

  return (
    <div className="flex items-center justify-center w-full my-24">
    <YachtList/>
    </div>
  );
}
