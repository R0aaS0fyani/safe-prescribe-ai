import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Rocket, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent p-8 lg:p-12">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
          
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-primary-foreground">
                <Rocket className="h-4 w-4" />
                Get Started Today
              </div>
            </div>
            
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
              Ready to Enhance Patient Safety?
            </h2>
            
            <p className="mb-8 text-lg text-primary-foreground/90">
              Join thousands of healthcare professionals using our AI-powered system to reduce medication errors and improve clinical outcomes.
            </p>
            
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Enter your email"
                type="email"
                className="bg-white"
              />
              <Button size="lg" variant="secondary" className="sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Request Demo
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-primary-foreground/75">
              Free 30-day trial • No credit card required • HIPAA compliant
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
