"use client";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackgroundPattern from "./background-patterns";

const NotFond = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <BackgroundPattern />
      </div>

      {/* 404 */}
      <div className="relative mb-8">
        <h1 className="text-[120px] sm:text-[180px] font-bold text-foreground">
          404
        </h1>
      </div>

      {/* Message */}
      <div className="mb-8 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Page not found
        </h2>
        <p className="text-muted-foreground text-lg max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex-1 h-12 rounded-xl bg-secondary border-border hover:border-primary transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>

        <Link href="/" className="flex-1">
          <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-12 pt-8 border-t border-border w-full max-w-md">
        <p className="text-sm text-muted-foreground mb-4">Quick links</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/folders">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              Folders
            </Button>
          </Link>
          <Link href="/photos">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              Photos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFond;
