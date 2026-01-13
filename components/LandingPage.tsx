import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./Hero";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
