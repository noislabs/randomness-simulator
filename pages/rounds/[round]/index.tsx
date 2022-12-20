import { useQuery } from "@tanstack/react-query";
import { queryBeaconHandle } from "../../../hooks/noisBeacon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { CoinFlip } from "../../../components/Tools/CoinFlip";
import { Dice } from "../../../components/Tools/Dice";
import { IntsRange } from "../../../components/Tools/IntsRange";
import { Shuffle } from "../../../components/Tools/Shuffle";
import { Decimal } from "../../../components/Tools/Decimal";

export enum Tool {
  CoinFlip,
  Dice,
  IntRange,
  Decimal,
  SubRand,
  Shuffle,
}

export default function GetRound() {
  const [tool, setTool] = useState<Tool>(Tool.CoinFlip);

  const [round, setRound] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.round as string;
    setRound(parseInt(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const { data: verifiedRound, status } = useQuery(
    ["getRound", round],
    () => queryBeaconHandle(round),
    {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: "always",
      enabled: !!round,
    }
  );

  return (
    <>
      {status === "loading" ? (
        <div className="mx-auto flex justify-center items-center h-[98vh] w-[98vh]">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-rows-6 gap-2 h-[90vh] w-11/12 mx-auto my-[5vh]">
          <div
            className=" row-span-2
            grid grid-rows-3 gap-2 p-4 
            overflow-y-scroll w-11/12 mx-auto
            border border-white/50 rounded-2xl bg-gradient-to-br from-primary to-primary/10
            "
          >
            <div className="row-span-1 grid grid-cols-2 justify-between text-2xl">
              <div className="col-span-1 justify-self-start drop-shadow-black font-semibold">
                {"Round #" + verifiedRound?.round ?? "No Round"}
              </div>
              {/* <div className="col-span-1 justify-self-end text-white/30">
                Toolbox // <> buttons
              </div> */}
            </div>
            <div className="row-span-2 grid grid-cols-4 justify-between pl-4">
              <div className="col-span-1 grid grid-rows-3">
                <div className="row-span-1 my-auto text-white/60">
                  {"Published"}
                </div>

                <div className="row-span-1 my-auto text-white/60">
                  {"Verified"}
                </div>

                <div className="row-span-1 my-auto text-white/60">
                  {"Randomness"}
                </div>
              </div>
              <div className="col-span-3 grid grid-rows-3">
                <div className="row-span-1 my-auto text-white/90">
                  {verifiedRound &&
                    verifiedRound.published.toLocaleDateString() +
                      " " +
                      verifiedRound.published.toLocaleTimeString()}
                </div>

                <div className="row-span-1 my-auto text-white/90">
                  {verifiedRound &&
                    verifiedRound.verified.toLocaleDateString() +
                      " " +
                      verifiedRound.verified.toLocaleTimeString()}
                </div>

                <div className="row-span-1 my-auto text-white font-mono">
                  {verifiedRound && verifiedRound.randomness.toString()}
                </div>
              </div>
            </div>
          </div>

          <div className="row-span-4 grid grid-rows-6 gap-4 p-4 w-11/12 mx-auto ">
            <div className="row-span-1 grid grid-cols-6 gap-4 justify-start">
              <div className="flex justify-self-start self-center w-11/12 font-orbitron text-accent/70 border-r border-accent/70">
                Tool Select
              </div>
              <button
                className={`${
                  tool == Tool.CoinFlip ? "nois-button-selected" : "nois-button"
                }`}
                onClick={() => setTool(Tool.CoinFlip)}
              >
                Coin Flip
              </button>
              <button
                className={`${
                  tool == Tool.Dice ? "nois-button-selected" : "nois-button"
                }`}
                onClick={() => setTool(Tool.Dice)}
              >
                Dice
              </button>
              <button
                className={`${
                  tool == Tool.IntRange ? "nois-button-selected" : "nois-button"
                }`}
                onClick={() => setTool(Tool.IntRange)}
              >
                Int Range
              </button>
              <button
                className={`${
                  tool == Tool.Shuffle ? "nois-button-selected" : "nois-button"
                }`}
                onClick={() => setTool(Tool.Shuffle)}
              >
                Shuffle
              </button>
              <button
                className={`${
                  tool == Tool.Decimal ? "nois-button-selected" : "nois-button"
                }`}
                onClick={() => setTool(Tool.Decimal)}
              >
                Decimal
              </button>
              {/* <button className={`nois-button-disabled`}>Sub-rand</button> */}
            </div>
            <div className="row-span-5 mx-auto">
              {tool === Tool.CoinFlip && verifiedRound && (
                <CoinFlip randomness={verifiedRound.randomness} />
              )}
              {tool === Tool.Dice && verifiedRound && (
                <Dice randomness={verifiedRound.randomness} />
              )}
              {tool === Tool.IntRange && verifiedRound && (
                <IntsRange randomness={verifiedRound.randomness} />
              )}
              {tool === Tool.Shuffle && verifiedRound && (
                <Shuffle randomness={verifiedRound.randomness} />
              )}
              {tool === Tool.Decimal && verifiedRound && (
                <Decimal randomness={verifiedRound.randomness} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
