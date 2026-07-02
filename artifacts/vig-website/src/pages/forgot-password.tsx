import React from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const recoverySchema = z.object({
  email: z.string().email({ message: "Invalid clearance credentials." }),
});

export function ForgotPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recoverySchema>>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof recoverySchema>) {
    toast({
      title: "PROTOCOL INITIATED",
      description: "Recovery instructions dispatched to secure channel.",
      className: "bg-primary text-black border-primary font-mono",
    });
    setTimeout(() => setLocation('/login'), 2000);
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-[#070707] relative overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none"></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Document style styling instead of terminal style for this one */}
        <div className="bg-[#f3f3f3] border-4 border-black p-8 text-black relative transform -rotate-1 shadow-[10px_10px_0px_rgba(0,0,0,0.5)]">
          <div className="absolute top-2 right-2 border-2 border-black px-2 py-1 font-mono text-[10px] font-bold uppercase">
            FORM 8-VIG
          </div>
          
          <div className="text-center mb-8 border-b-2 border-black pb-4 mt-6">
            <h1 className="text-2xl font-display font-black uppercase tracking-widest mb-1">ACCESS RECOVERY</h1>
            <p className="text-gray-600 font-mono text-xs uppercase font-bold">IDENTITY VERIFICATION REQUIRED</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-mono font-bold uppercase text-xs border-l-4 border-black pl-2">Registered Identifier</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="agent@vig.io" 
                        {...field} 
                        className="bg-transparent border-0 border-b-2 border-black border-dashed rounded-none px-0 focus-visible:ring-0 text-black font-mono" 
                      />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-destructive font-bold" />
                  </FormItem>
                )}
              />

              <button type="submit" className="w-full bg-black text-white font-display font-bold py-4 uppercase tracking-widest hover:bg-destructive transition-colors mt-8">
                INITIATE RECOVERY PROTOCOL
              </button>
            </form>
          </Form>

          <div className="mt-8 text-center font-mono text-xs text-gray-500 font-bold uppercase">
            <Link href="/login" className="text-black hover:text-destructive underline decoration-2 transition-colors">RETURN TO LOGIN TERMINAL</Link>
          </div>
          
          <div className="absolute -bottom-4 -right-4 border-4 border-destructive text-destructive font-display font-bold text-xl p-2 transform -rotate-12 opacity-80 pointer-events-none">
            PRIORITY
          </div>
        </div>
      </div>
    </div>
  );
}
