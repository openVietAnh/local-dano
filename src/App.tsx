import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Send from "./pages/Send";
import CreateWallet from "./pages/CreateWallet";
import Tokens from "./pages/Tokens";
import TransactionHistory from "./pages/TransactionHistory";
import TransactionDetail from "./pages/TransactionDetail";
import Faucet from "./pages/Faucet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/send" element={<Send />} />
          <Route path="/create" element={<CreateWallet />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/transaction/:transactionId" element={<TransactionDetail />} />
          <Route path="/faucet" element={<Faucet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
