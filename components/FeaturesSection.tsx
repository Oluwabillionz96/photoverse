import { Card, CardContent } from "@/components/ui/card";
import { Cloud, FolderOpen, Smartphone, Shield } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Upload & Access Anywhere",
    description:
      "Upload photos from any device and access them anywhere with an internet connection. Your memories are always within reach.",
  },
  {
    icon: FolderOpen,
    title: "Organize with Folders",
    description:
      "Create custom folders and albums to organize your photos just like on your phone. Keep everything neat and easy to find.",
  },
  {
    icon: Shield,
    title: "Secure Cloud Storage",
    description:
      "Your photos are encrypted and stored securely in the cloud. We use enterprise-grade security to protect your memories.",
  },
  {
    icon: Smartphone,
    title: "Free Up Phone Storage",
    description:
      "Stop worrying about running out of space. Upload your photos to free up valuable storage on your phone.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-balance">
            Everything you need for your photos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Photoverse gives you all the tools you need to manage, organize, and
            access your photo collection from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 hover:border-border transition-colors"
            >
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-balance">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
