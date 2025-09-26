import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const CTASection = ({
  setOpenModal,
  setMode,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  return (
    <section id="free" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Ready to organize your photos for free?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Join thousands of users who have already freed up space on their
            phones and organized their photo collections with Photoverse.{" "}
            <span className="text-secondary font-semibold">
              No hidden costs, no subscriptions.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500"
              onClick={() => {
                setOpenModal(true);
                setMode("register");
              }}
            >
              Sign Up Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-blue-600 bg-transparent hover:text-blue-500"
              onClick={() => {
                setOpenModal(true);
                setMode("login");
              }}
            >
              Try Now
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Unlimited free storage</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free forever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
