"use client";

import { Loading } from "@/components/loaders/Loading";
import { authApi } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const OAuthPage = () => {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();

  async function AuthenticateUser() {
    if (code) {
      try {
        const response = await authApi.oauth(code);
        if (response.message) {
          router.push("/folders");
        }
      } catch (error) {
        console.error(error);
        router.push("/");
      }
    }
  }

  useEffect(() => {
    AuthenticateUser();
  }, []);

  return <Loading />;
};

export default OAuthPage;
