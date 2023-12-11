"use client";

import { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { MapkitProvider } from "react-mapkit";
// import { Session } from "next-auth";

interface ProvidersProps {
  children: React.ReactNode;
  // session: Session;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const token = process.env.MAPKIT_TOKEN as string;
  const queryClient = new QueryClient();
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
