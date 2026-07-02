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

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid clearance credentials." }),
  password: z.string().min(1, { message: "Passphrase required." }),
});

export function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Fake login
    toast({
      title: "ACCESS GRANTED",
      description: "Welcome back, Agent.",
      className: "bg-primary text-black border-primary font-mono",
    });
    setTimeout(() => setLocation('/terminal'), 1000);
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-[#070707] relative overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#111] border border-primary/30 p-8 shadow-[0_0_30px_rgba(0,255,102,0.1)] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white uppercase tracking-widest mb-2">AGENT LOGIN</h1>
            <p className="text-destructive font-mono text-xs uppercase tracking-widest">CLEARANCE REQUIRED</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-mono uppercase text-xs">Clearance ID (Email)</FormLabel>
                    <FormControl>
                      <Input placeholder="agent@vig.io" {...field} className="terminal-input bg-black" />
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
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-primary font-mono uppercase text-xs">Passphrase</FormLabel>
                      <Link href="/forgot-password" className="text-xs font-mono text-gray-500 hover:text-primary transition-colors">
                        LOST CLEARANCE?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="terminal-input bg-black" />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <button type="submit" className="w-full bg-primary text-black font-display font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors mt-8">
                AUTHENTICATE
              </button>
            </form>
          </Form>

          <div className="mt-8 text-center font-mono text-xs text-gray-500 uppercase">
            UNAUTHORIZED AGENT? <Link href="/signup" className="text-primary hover:text-white transition-colors">ENLIST NOW</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
