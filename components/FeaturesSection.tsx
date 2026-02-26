import { Card, CardContent } from "@/components/ui/card";
import { Cloud, FolderOpen, Smartphone, Shield } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Upload & Access",
    description:
      "Upload from any device and access your photos anywhere with an internet connection.",
  },
  {
    icon: FolderOpen,
    title: "Organize",
    description:
      "Create folders to organize your photos. Keep everything neat and easy to find.",
  },
  {
    icon: Shield,
    title: "Secure Storage",
    description:
      "Your photos are encrypted and stored securely in the cloud with enterprise-grade security.",
  },
  {
    icon: Smartphone,
    title: "Free Up Space",
    description:
      "Stop worrying about running out of space. Upload photos to free up storage on your device.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-12 sm:py-16 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to store and organize your photos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border hover:border-foreground/50 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center transition-transform hover:scale-110 duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
