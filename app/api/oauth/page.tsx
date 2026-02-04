"use client";

import { Loading } from "@/components/loaders/Loading";
import { authApi } from "@/services/auth";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.error || error.message
            : "An unexpected error occurred.";
        toast.error(errorMessage);
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
