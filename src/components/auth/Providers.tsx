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

//I've just moved this outside the Provider because of this youtube comment:
//Just one change expected is to not use const queryClient = new QueryClient()Inside providers component, instead either declare it outside or use state or ref instead, this ensures that data is not shared between different users and requests, while still only creating the QueryClient once per component lifecycle as per tanstack query docs

const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
