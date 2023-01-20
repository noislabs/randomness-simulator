import "styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { DashboardContext } from "../contexts/dashboard";
import { Orbitron } from "@next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <main className={`${orbitron.variable} font-sans`}>
      <QueryClientProvider client={queryClient}>
        <DashboardContext>
          <Layout>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  maxWidth: 500,
                },
                success: {
                  duration: 6500,
                  iconTheme: {
                    primary: "#091D04",
                    secondary: "#39FF00",
                  },
                  style: {
                    background: "#091D04",
                    border: "1px dashed #39FF00",
                    padding: "16px",
                    color: "#39FF00",
                  },
                },
                error: {
                  duration: 6500,
                  iconTheme: {
                    primary: "#000000",
                    secondary: "#FF0000",
                  },
                  style: {
                    background: "#0F0303",
                    border: "1px solid #FF000050",
                    padding: "16px",
                    color: "#FF0000",
                  },
                },
                loading: {
                  iconTheme: {
                    primary: "#232207",
                    secondary: "#FFF700",
                  },
                  style: {
                    background: "#232207",
                    border: "1px dashed #FFF700",
                    padding: "16px",
                    color: "#FFF700",
                  },
                },
              }}
            />
            <Component {...pageProps} />
          </Layout>
        </DashboardContext>
      </QueryClientProvider>
    </main>
  );
}
export default MyApp;
