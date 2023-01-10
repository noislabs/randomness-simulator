import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { queryBeaconHandle, VerifiedBeacon } from "../hooks/noisBeacon";
import { NoisTextField } from "../styles/mui";
import { useState } from "react";
import toast from "react-hot-toast";

export const RandomnessGrid = ({
  rands,
  timer,
}: {
  rands: VerifiedBeacon[];
  timer: JSX.Element;
}) => {
  const [roundSearchId, setRoundSearchId] = useState("");

  const [searchedBeacon, setSearchedBeacon] = useState<VerifiedBeacon>();

  const handleSearchRound = async (roundid: string) => {
    if (isNaN(Number(roundid)) || roundid == "") {
      toast.error("Please input a valid round ID number");
      return;
    }

    if (Number(roundid) <= 0) {
      toast.error("Round ID must be greater than 0");
      return;
    }

    if (Number(roundid) > rands[0].round) {
      toast.error(
        `The round ID you searched for: ${roundid} is greater than the most recently published round: ${rands[0].round}`
      );
      return;
    }

    const beaconResponse = await queryBeaconHandle(Number(roundid));

    if (!beaconResponse) {
      toast.error("Could not find this Round");
    } else {
      setSearchedBeacon(beaconResponse);
    }
  };

  return (
    <>
      <div className="my-[10vh] flex flex-col gap-y-5">
        <div className="grid grid-cols-2 w-11/12 mx-auto justify-between items-center">
          <div className="col-span-1 flex items-center gap-2 justify-self-start">
            <div className="basis-1/4 flex items-center">
              <div className="text-2xl text-accent/80 ">Search:</div>
            </div>
            <div className="basis-3/4">
              <NoisTextField
                hiddenLabel
                id="ROUND_ID"
                aria-label="round_id"
                placeholder="Round ID"
                variant="outlined"
                type="tel"
                InputLabelProps={{
                  style: { color: "#dd6e78" },
                }}
                inputProps={{
                  step: "1",
                  min: "1",
                }}
                InputProps={{
                  autoComplete: "off",
                  style: { color: "#dd6e78" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon
                        sx={{ color: "#dd6e78" }}
                        className="hover:cursor-pointer"
                        onClick={() => {
                          handleSearchRound(roundSearchId);
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => setRoundSearchId(event.target.value)}
              />
            </div>
          </div>
          <div className="col-span-1 inline-flex gap-2 justify-end">
            <div className="text-accent text-xl font-orbitron drop-shadow-redsoft">
              {timer}
            </div>
            <div className="text-accent/60">- Round Update</div>
          </div>
        </div>

        <div className="grid grid-rows-20 gap-y-1 bg-black/80 border border-white/20 rounded-l-2xl overflow-y-scroll p-1 h-[70vh] w-11/12 mx-auto">
          {searchedBeacon && (
            <div
              className="row-span-1 p-8 grid grid-rows-3 rounded-xl
                        border border-accent/60 hover:border-accent/90 text-white/90
                        bg-gradient-to-br from-accent/20 via-accent/10 hover:drop-shadow-redsoft
                        "
              key={searchedBeacon.round}
            >
              <div className="row-span-2 grid grid-cols-2 justify-between drop-shadow-blacksoft">
                <Link
                  href={`/rounds/${searchedBeacon.round}`}
                  className="w-5/6"
                >
                  <div className="flex col-span-1 text-lg text-white drop-shadow-redsoft font-semibold">
                    {"Round #" + searchedBeacon.round}&nbsp;
                    <div className="text-white/70 font-thin">
                      {"| " +
                        searchedBeacon.verified.toLocaleDateString() +
                        " " +
                        searchedBeacon.verified.toLocaleTimeString()}
                    </div>
                  </div>
                </Link>
                <div className="col-span-1 justify-self-end align-middle hover:drop-shadow-red text-accent hover:text-white hover:cursor-pointer">
                  <CloseIcon onClick={() => setSearchedBeacon(undefined)} />
                </div>
              </div>
              <div className="row-span-1">
                <div className="flex text-sm text-white/50">
                  <div className="text-white drop-shadow-redsoft">
                    {searchedBeacon.randomness}&nbsp;
                  </div>
                  {`| Randomness`}
                </div>
              </div>
            </div>
          )}

          {rands &&
            rands.map((ran) => (
              <div
                className="row-span-1 p-8 grid grid-rows-3 rounded-xl
              border-b border-accent/30 text-white/90
              hover:bg-gradient-to-br from-accent/10 hover:drop-shadow-redsoft
              "
                key={ran.round}
              >
                <Link href={`/rounds/${ran.round}`}>
                  <div className="row-span-2 drop-shadow-blacksoft">
                    <div className="flex text-lg text-white drop-shadow-redsoft font-semibold">
                      {"Round #" + ran.round}&nbsp;
                      <div className="text-white/70 font-thin">
                        {"| " +
                          ran.verified.toLocaleDateString() +
                          " " +
                          ran.verified.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="row-span-1">
                    <div className="flex text-sm text-white/50">
                      <div className=" text-white drop-shadow-redsoft">
                        {ran.randomness}&nbsp;
                      </div>
                      {`| Randomness`}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
