import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion() {
  const faqs = [
    {
      q: "WHAT IS PROJECT VIG?",
      a: "Citizen Vigilante ($VIG) is a decentralized memetic asset born from institutional censorship. We represent the un-censorable internet."
    },
    {
      q: "WHY WAS THE CONTENT BANNED?",
      a: "Mainstream entities deemed the narrative 'too volatile' for public consumption. They attempted to suppress the signal. They failed."
    },
    {
      q: "HOW CAN I BECOME AN AGENT?",
      a: "Acquire $VIG. Hold $VIG. Spread the dossier. Do not comply."
    },
    {
      q: "IS THIS FINANCIAL ADVICE?",
      a: "Negative. This is a memetic warfare operation. Act accordingly."
    }
  ];

  return (
    <section className="py-20 border-b border-white/10 bg-[#111]">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-display font-bold text-white mb-12 uppercase tracking-widest border-b border-white/10 pb-4">
          INTERROGATION LOGS
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-white/20 bg-[#0a0a0a] px-6">
              <AccordionTrigger className="font-mono hover:no-underline text-left text-white hover:text-primary transition-colors">
                <span className="text-destructive mr-2">CLASSIFIED QUESTION:</span> {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-mono text-gray-400 border-t border-white/10 pt-4 pb-6 leading-relaxed">
                <span className="text-primary font-bold mr-2">ACCESS GRANTED:</span> {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
