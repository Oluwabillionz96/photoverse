"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";

const CTASection = () => {
  const { user } = useSelector((state: Rootstate) => state.auth);
  return (
    <section id="free" className="py-12 sm:py-16 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Start storing your photos for free
          </h2>

          <p className="text-xl text-muted-foreground">
            No credit card required. No hidden costs. No subscriptions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user?.isAuthenticated ? "/folders" : "/auth/register"}>
              <Button size="lg" className="text-base w-full sm:w-auto">
                {user.isAuthenticated ? "Create a folder" : "Sign Up Free"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href={user.isAuthenticated ? "/photos" : "/auth/login"}>
              <Button
                variant="outline"
                size="lg"
                className="text-base w-full sm:w-auto"
              >
                {user.isAuthenticated ? "Upload a photo" : "Sign In"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
