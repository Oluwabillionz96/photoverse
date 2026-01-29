"use client";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingState from "../loading";

const OauthPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const csrfToken = searchParams.get("csrfToken");

  if (csrfToken) {
    sessionStorage.setItem("csrfToken", csrfToken);
  }

  router.push("/folders");
  return <LoadingState />;
};

export default OauthPage;
