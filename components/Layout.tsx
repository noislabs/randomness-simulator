import { ReactNode } from "react";
import Head from "next/head";
import Nav from "./Nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-6 w-[calc(100%)] h-screen bg-dice-pattern bg-black">
      <Head>
        <meta property="og:url" content="na" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="none" />
        <meta
          property="og:title"
          content="Nois Network | Get randomness on the fly"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Brings random beacons to Cosmos blockchains without compromising security or usability by leveraging drand and IBC"
        />
        {/* <meta property="og:image" content={"na"} /> */}
      </Head>

      <div className="col-span-1 max-h-screen h-screen rounded-3xl border-r border-white/50 bg-primary/50 ">
        <Nav />
      </div>

      <div className="col-span-5 max-h-screen">{children}</div>
    </div>
  );
}
