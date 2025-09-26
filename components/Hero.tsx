import { Button } from "@/components/ui/button";
import { ArrowRight, Image } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const HeroSection = ({
  setOpenModal,
  setMode,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Your photos,
                <span className="text-blue-500"> everywhere</span> you need them
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto lg:mx-0">
                Upload, organize, and access your photos from any device. Free
                up storage on your phone while keeping your memories safe in the
                cloud.{" "}
                <span className="text-blue-500 font-semibold">
                  Completely free, forever.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-base w-full sm:w-auto bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                setOpenModal(true);
                  setMode("login");
                }}
              >
                Try Now - Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href={"/photos"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base bg-transparent w-full sm:w-auto hover:cursor-pointer"
                >
                  <Image className="w-4 h-4" />
                  Upload Photo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Secure storage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Cross-platform</span>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-lg">
              {/* Phone mockup */}
              <div className="relative bg-card border border-border rounded-3xl p-2 shadow-2xl">
                <div className="bg-muted rounded-2xl p-3 sm:p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Gallery</div>
                    <div className="text-xs text-muted-foreground">
                      1,247 photos
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg border border-border/50 ${
                          i % 3 === 0
                            ? "bg-gradient-to-br from-blue-500/20 to-blue-500/5"
                            : i % 3 === 1
                            ? "bg-gradient-to-br from-blue-400/20 to-blue-600/5"
                            : "bg-gradient-to-br from-blue-300/20 to-blue-300/5"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-muted-foreground">
                      Recent uploads
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-blue-500 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium animate-bounce">
                Free Upload!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
