import Image from "next/image";
import { coinflip_js } from "nois";
import { useEffect, useState } from "react";
import { useDashboardContext } from "../../contexts/dashboard";
import heads_gif from "../../public/heads.gif";
import tails_gif from "../../public/tails.gif";

export const CoinFlip = ({randomness}:{randomness: string}) => {

  //const { noisWasm } = useDashboardContext();

  const [sideVisible, setSideVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSideVisible(true);
    }, 1770);
  }, []);

  const coinflipOutput = coinflip_js(randomness);

  return (
      <>
      <div className="grid grid-rows-6 justify-between h-full">
        <div className="row-span-5 ">
        {coinflipOutput.includes("head") && (
          <Image 
          src={heads_gif}
          alt="heads gif"
          unoptimized
          height={200}
          width={200}
          />
        )}
        {coinflipOutput.includes("tail") && (
          <Image 
          src={tails_gif}
          alt="tails gif"
          unoptimized
          height={200}
          width={200}
          />
        )}
        </div>

        {sideVisible && (
          <div className="row-span-1 mx-auto self-end py-1 px-5 border rounded-xl border-accent/70 bg-gradient-to-br from-accent/20 to-accent/10">
            <span className="text-3xl font-orbitron text-accent drop-shadow-redsoft">
            {coinflipOutput[0].toUpperCase() + coinflipOutput.slice(1)}
            </span>
          </div>
        )}
      </div>


      </>
    )
}