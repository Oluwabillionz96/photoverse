import { Camera, Heart, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptyFavourite = () => {
  return (
    <div className=" bg-background">
      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-pink-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground text-balance">
              No favourites yet
            </h2>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              Start building your collection by tapping the heart icon on photos
              you love. Your favourite memories will appear here.
            </p>
          </div>

          {/* Action */}
          <div className="pt-4">
            <Link href={"/photos"}>
              <Button
                className="gap-2 bg-green-500 hover:bg-green-600 hover:cursor-pointer"
                size="lg"
              >
                <Camera className="w-4 h-4" />
                Browse Photos
              </Button>
            </Link>
          </div>

          {/* Tip */}
          {/* <div className="pt-8 text-sm text-muted-foreground">
            <p>Tip: Double-tap any photo to quickly add it to favourites</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmptyFavourite;
