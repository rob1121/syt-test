"use client";

import React, { useEffect } from "react";
import { useAuthContext } from "@/context/auth-provider";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

export default function LoginButton({ code }: { code?: string }) {
  const { oAuthLogin } = useAuthContext();
  useEffect(() => {
    if (code) {
      oAuthLogin();
    }
  }, [code, oAuthLogin]);

  return <div className="flex items-center justify-center h-screen w-screen">
    <Button onClick={oAuthLogin} variant="outline">
    <LogIn className="size-4" />
    Login with SuperYachtTimes
  </Button>
  </div>;
}
