'use client'

import { useAuthContext } from "@/context/auth-provider";
import { Button } from "./ui/button";

export default function Header() {
    const {logout, access_token} = useAuthContext();
    return (
        <header className="flex w-full py-4 items-center justify-between">
            <h1 className="text-2xl font-bold">Super Yachts</h1>
            {access_token && <Button onClick={logout} className="cursor-pointer">Logout</Button>}
        </header>
    )
}