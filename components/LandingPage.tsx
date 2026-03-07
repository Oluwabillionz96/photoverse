"use client";

import { useRouter } from "next/navigation";
import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./Hero";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { useEffect } from "react";

const LandingPage = () => {
  const router = useRouter();

  const { user } = useSelector((state: Rootstate) => state.auth);

  useEffect(() => {
    if (!user.isAuthenticated) return;

    router.push("/folders");
  });
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
