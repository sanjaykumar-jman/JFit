
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar - Fixed width */}
      <div className="hidden lg:flex w-80">
        <Sidebar />
      </div>

      {/* Main Content - Takes full remaining space */}
      <div className="flex-1 p-6 md:p-8 w-full max-w-[calc(100%-80px)] mx-auto animate-fade-in">
        {children}
      </div>

      <Toaster />
    </div>
  );
};


