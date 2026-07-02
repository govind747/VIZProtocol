import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layout
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CrtOverlay } from "@/components/effects/CrtOverlay";

// Pages
import { Home } from "@/pages/home";
import { About } from "@/pages/about";
import { Vigilante } from "@/pages/vigilante";
import { FanFiles } from "@/pages/fan-files";
import { Terminal } from "@/pages/terminal";
import { Gallery } from "@/pages/gallery";
import { Support } from "@/pages/support";
import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { ForgotPassword } from "@/pages/forgot-password";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/vigilante" component={Vigilante} />
      <Route path="/fan-files" component={FanFiles} />
      <Route path="/terminal" component={Terminal} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/support" component={Support} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-screen flex flex-col relative text-foreground">
            <CrtOverlay />
            <Header />
            <main className="flex-1 flex flex-col pt-16 z-10">
              <Router />
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
