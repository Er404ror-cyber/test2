import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Challenges from "@/pages/challenges";
import Profile from "@/pages/profile";
import Recycling from "@/pages/recycling";
import Leaderboard from "@/pages/leaderboard";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/profile" component={Profile} />
        <Route path="/recycling" component={Recycling} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster richColors position="top-center" />
    </TooltipProvider>
  );
}

export default App;
