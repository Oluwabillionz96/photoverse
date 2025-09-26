import { Dispatch, SetStateAction } from "react";
import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./Hero";

const LandingPage = ({
  setOpenModal,
  setMode,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  return (
    <>
      <Header setOpenModal={setOpenModal} setMode={setMode} />
      <main>
        <HeroSection setOpenModal={setOpenModal} setMode={setMode} />
        <FeaturesSection />
        <CTASection setOpenModal={setOpenModal} setMode={setMode} />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
