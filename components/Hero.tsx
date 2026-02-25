"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HeroSection = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "What is this?",
      answer: "A cloud photo storage system.",
    },
    {
      question: "Why use it?",
      answer:
        "Free up space on your device, organize your photos, and keep them backed up safely.",
    },
    {
      question: "What does it cost?",
      answer: "100% Free. No hidden fees, no subscriptions.",
    },
  ];

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center py-8 sm:py-12 relative overflow-hidden">
      {/* Subtle net pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              Photo Storage.
              <br />
              Simple & Free.
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Store, organize, and backup your photos. Free up space on your
              device.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="text-base w-full sm:w-auto hover:scale-105 transition-transform duration-200"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="lg"
                className="text-base w-full sm:w-auto hover:scale-105 transition-transform duration-200"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Collapsible Q&A Section */}
          <div className="max-w-2xl mx-auto space-y-4 pt-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openQuestion === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openQuestion === index && (
                  <div className="px-6 pb-6 text-lg text-muted-foreground text-left">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
