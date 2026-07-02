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

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid clearance format." }),
  username: z.string().min(3, { message: "Alias must be at least 3 characters." }),
  password: z.string().min(6, { message: "Passphrase too weak." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passphrases do not match.",
  path: ["confirmPassword"],
});

export function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    toast({
      title: "ENROLLMENT COMPLETE",
      description: "Welcome to the resistance.",
      className: "bg-primary text-black border-primary font-mono",
    });
    setTimeout(() => setLocation('/login'), 1500);
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-[#070707] relative py-12">
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#111] border border-primary/30 p-8 shadow-[0_0_30px_rgba(0,255,102,0.1)] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white uppercase tracking-widest mb-2">NEW AGENT REGISTRATION</h1>
            <p className="text-primary font-mono text-xs uppercase tracking-widest">CLASSIFIED ENROLLMENT</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-mono uppercase text-xs">Communication Node (Email)</FormLabel>
                    <FormControl>
                      <Input placeholder="agent@secure.net" {...field} className="terminal-input bg-black" />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-mono uppercase text-xs">Operative Alias (Username)</FormLabel>
                    <FormControl>
                      <Input placeholder="VIG_AGENT_007" {...field} className="terminal-input bg-black" />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-destructive" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-mono uppercase text-xs">Encryption Key (Passphrase)</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="terminal-input bg-black" />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-mono uppercase text-xs">Verify Encryption Key</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="terminal-input bg-black" />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <button type="submit" className="w-full bg-primary text-black font-display font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors mt-8">
                ENLIST NOW
              </button>
            </form>
          </Form>

          <div className="mt-8 text-center font-mono text-xs text-gray-500 uppercase border-t border-white/10 pt-6">
            EXISTING OPERATIVE? <Link href="/login" className="text-primary hover:text-white transition-colors">AUTHENTICATE</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
