import Hero from "@/components/Hero";
import DrugChecker from "@/components/DrugChecker";
import Dashboard from "@/components/Dashboard";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DrugChecker />
      <Dashboard />
      <Features />
      <UseCases />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
