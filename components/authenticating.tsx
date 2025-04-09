'use client'

import { useAuthContext } from "@/context/auth-provider";
import { memo, useEffect } from "react";

export default  memo(function Authenticating({code}: {code: string}) {
    const { generateToken } = useAuthContext();
    useEffect(() => {
        const timeout = setTimeout(() => {
            generateToken(code);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [code, generateToken]);
  return <div className="flex items-center justify-center h-screen w-screen">Authenticating...</div>;
})