import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Investment from "@/components/landing/Investment";
import Farms from "@/components/landing/Farms";
import Calculator from "@/components/landing/Calculator";
import Risks from "@/components/landing/Risks";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <div id="cashew">
          <Risks />
        </div>
        <div id="farms">
          <Farms />
        </div>
        <div id="investment">
          <Investment />
        </div>
        <div id="calculator">
          <Calculator />
        </div>
        <div id="about">
          <About />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
