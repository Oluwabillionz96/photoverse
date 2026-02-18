"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Cloud, FolderOpen, Smartphone, Shield } from "lucide-react";
import { motion } from "framer-motion";

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
    <section id="features" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Seamless background - no color changes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/3 right-20 w-96 h-96 bg-accent/6 rounded-full blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/4 rounded-full blur-3xl"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center space-y-4 mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Everything you need for your{" "}
            <span className="text-linear-primary">photos</span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Photoverse gives you all the tools you need to manage, organize, and
            access your photo collection from anywhere in the digital universe.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-border/20 glass hover:border-primary/40 transition-all duration-500 h-full group overflow-hidden">
                <CardContent className="p-6 space-y-4 h-full flex flex-col relative">
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
                  </div>

                  <motion.div
                    className="w-14 h-14 bg-linear-to-br from-primary/30 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="h-7 w-7 text-primary" />
                  </motion.div>

                  <div className="space-y-3 flex-1 relative z-10">
                    <h3 className="font-semibold text-lg text-balance group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Enhanced hover effect */}
                  <motion.div
                    className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional visual elements */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Trusted by thousands of users worldwide</span>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
