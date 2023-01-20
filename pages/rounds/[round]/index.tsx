import { useQuery } from "@tanstack/react-query";
import {
  queryBeaconHandle,
  queryBeaconsHandle,
  VerifiedBeacon,
} from "../../../hooks/noisBeacon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { CoinFlip } from "../../../components/Tools/CoinFlip";
import { Dice } from "../../../components/Tools/Dice";
import { IntsRange } from "../../../components/Tools/IntsRange";
import { Shuffle } from "../../../components/Tools/Shuffle";
import { Decimal } from "../../../components/Tools/Decimal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";
import { NoisTooltip } from "../../../styles/mui";
import { Pick } from "../../../components/Tools/Pick";

export enum Tool {
  CoinFlip,
  Dice,
  IntRange,
  Decimal,
  SubRand,
  Shuffle,
  Pick,
}

export default function GetRound() {
  const [tool, setTool] = useState<Tool>(Tool.CoinFlip);

  const [round, setRound] = useState<number>(0);

  const [verifiedRound, setVerifiedRound] = useState<VerifiedBeacon>();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (round === 0) {
      const id = router.query.round as string;
      setRound(parseInt(id));
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const {
    // isLoading,
    // isError,
    // error,
    data: latestRound,
    // isFetching,
    // isPreviousData,
  } = useQuery(["latest_round"], () => queryBeaconsHandle(), {
    staleTime: 0,
    refetchOnMount: true,
    refetchInterval: 30000,
    select: (beacons) => beacons[0].round,
  });

  const { status } = useQuery(
    ["getRound", round],
    () => queryBeaconHandle(round),
    {
      staleTime: 0,
      refetchOnMount: false,
      refetchOnReconnect: "always",
      enabled: !!(round && latestRound),
      onSuccess: (data) => {
        router.push({
          pathname: "/rounds/[round]",
          query: { round: data.round },
        });
        setVerifiedRound(data);
      },
      onError: () => {
        setRound(latestRound!);
        toast.error("Round unavailable | Navigating to current latest round");
      },
      retry: false,
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
              <div className="col-span-1 justify-self-end text-white/30">
                <ArrowBackIcon
                  sx={{ color: "#dd6e78" }}
                  fontSize="medium"
                  className="hover:drop-shadow-red hover:cursor-pointer"
                  onClick={() => setRound(round - 1)}
                />
                <ArrowForwardIcon
                  sx={{ color: "#dd6e78" }}
                  fontSize="medium"
                  className="hover:drop-shadow-red hover:cursor-pointer"
                  onClick={() => setRound(round + 1)}
                />
              </div>
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

          <div className="row-span-4 grid grid-rows-6 gap-4 p-1 w-11/12 mx-auto">
            <div className="row-span-1 grid grid-cols-6 gap-4 justify-start w-full">
              {/* <div className="flex justify-self-start self-center w-11/12 font-orbitron text-accent/70 border-r border-accent/70">
                Tool Select
              </div> */}
              <NoisTooltip
                title={
                  <>
                    <div className="font-bold border-b border-accent">
                      Use Nois randomness to flip a coin
                    </div>
                    <div className="py-1">
                      {" "}
                      50% chance of Heads, 50% chance of Tails
                    </div>
                  </>
                }
                placement="top"
              >
                <button
                  className={`${
                    tool == Tool.CoinFlip
                      ? "nois-button-selected"
                      : "nois-button"
                  }`}
                  onClick={() => setTool(Tool.CoinFlip)}
                >
                  Coin Flip
                </button>
              </NoisTooltip>
              <NoisTooltip
                title={
                  <>
                    <div className="font-bold border-b border-accent">
                      Use Nois randomness to roll a 6 sided Die
                    </div>
                    <div className="py-1">Even chances for all 6 sides</div>
                  </>
                }
                placement="top"
              >
                <button
                  className={`${
                    tool == Tool.Dice ? "nois-button-selected" : "nois-button"
                  }`}
                  onClick={() => setTool(Tool.Dice)}
                >
                  Dice
                </button>
              </NoisTooltip>
              <NoisTooltip
                title={
                  <>
                    <div className="font-bold border-b border-accent">
                      Generate a random integer within a range
                    </div>
                    <div className="py-1">Negative integers supported</div>
                    <div>{`Bounds of range included (1 - 10 can be 1 or 10)`}</div>
                  </>
                }
                placement="top"
              >
                <button
                  className={`${
                    tool == Tool.IntRange
                      ? "nois-button-selected"
                      : "nois-button"
                  }`}
                  onClick={() => setTool(Tool.IntRange)}
                >
                  Int Range
                </button>
              </NoisTooltip>
              <NoisTooltip
                title={
                  <>
                    <div className="font-bold border-b border-accent">
                      Randomly shuffle a list of items
                    </div>
                    <div className="py-1">
                      Supports Copy/Paste from CSV for large datasets
                    </div>
                  </>
                }
                placement="top"
              >
                <button
                  className={`${
                    tool == Tool.Shuffle
                      ? "nois-button-selected"
                      : "nois-button"
                  }`}
                  onClick={() => setTool(Tool.Shuffle)}
                >
                  Shuffle
                </button>
              </NoisTooltip>
              <NoisTooltip
                title={
                  <>
                    <div className="font-bold border-b border-accent">
                      Generate a random decimal
                    </div>
                    <div className="py-1">{`0 <= D < 1`}</div>
                    <div>Supports up to the 18th decimal point</div>
                  </>
                }
                placement="top"
              >
                <button
                  className={`${
                    tool == Tool.Decimal
                      ? "nois-button-selected"
                      : "nois-button"
                  }`}
                  onClick={() => setTool(Tool.Decimal)}
                >
                  Decimal
                </button>
              </NoisTooltip>
              <NoisTooltip
                title={
                  <>
                    <div className="font-bold">
                      Pick N random items from a list
                    </div>
                  </>
                }
                placement="top"
              >
                <button
                  className={`${
                    tool == Tool.Pick ? "nois-button-selected" : "nois-button"
                  } text-sm`}
                  onClick={() => setTool(Tool.Pick)}
                >
                  Pick
                </button>
              </NoisTooltip>
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
              {tool === Tool.Pick && verifiedRound && (
                <Pick randomness={verifiedRound.randomness} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
