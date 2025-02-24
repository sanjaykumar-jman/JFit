
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 pt-6 max-w-7xl mx-auto w-full animate-fade-in lg:pl-80">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
};
