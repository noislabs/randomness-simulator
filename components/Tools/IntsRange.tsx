import { int_in_range } from "nois";
import { useState } from "react";
import { NoisTextField } from "../../styles/mui";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toast from "react-hot-toast";

export const IntsRange = ({ randomness }: { randomness: string }) => {
  const [beginRange, setBegin] = useState<string>();
  const [endRange, setEnd] = useState<string>();

  const [int, setInt] = useState<number | undefined>(undefined);

  const handleGetInt = ({
    begin,
    end,
  }: {
    begin: string | any;
    end: string | any;
  }) => {
    if (
      isNaN(Number(begin)) ||
      begin == "" ||
      isNaN(Number(end)) ||
      end == ""
    ) {
      toast.error("Please use valid numbers in range input");
      return;
    }

    if ((Number(begin) || Number(end)) < Number.MIN_SAFE_INTEGER) {
      toast.error("Values must be greater than -9007199254740991");
      return;
    }

    if ((Number(begin) || Number(end)) > Number.MAX_SAFE_INTEGER) {
      toast.error("Values must be less than 9007199254740991");
      return;
    }

    if (Number(begin) > Number(end)) {
      toast.error("Please ensure Range Start is less than Range End");
      return;
    }

    if (Number(begin) == Number(end)) {
      toast.error("Range Start and Range End cannot be the same number");
      return;
    }

    setInt(int_in_range(randomness, Number(begin), Number(end)));
  };

  return (
    <>
      <div className="grid grid-rows-6 h-full pt-2 bg-gradient-to-br from-primary/20">
        <div className="row-span-2 grid grid-cols-2 gap-x-4 mx-auto w-5/6">
          <div className="col-span-1">
            <NoisTextField
              hiddenLabel
              id="START"
              aria-label="Start"
              placeholder="Range Start"
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
                    <ArrowBackIosIcon sx={{ color: "#dd6e78" }} />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setBegin(event.target.value)}
            />
          </div>
          <div className="col-span-1">
            <NoisTextField
              hiddenLabel
              id="END"
              aria-label="End"
              placeholder="Range End"
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
                startAdornment: (
                  <InputAdornment position="start">
                    <ArrowForwardIosIcon sx={{ color: "#dd6e78" }} />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setEnd(event.target.value)}
            />
          </div>
        </div>
        <div className="row-span-1 mx-auto">
          <button
            className="nois-button"
            onClick={() => handleGetInt({ begin: beginRange, end: endRange })}
          >
            Get Integer
          </button>
        </div>

        {!int ? (
          <div className="row-span-3 flex items-center mx-auto">
            <div className="text-lg mx-auto text-accent/50 font-orbitron">
              {"Generate Integer Above"}
            </div>
          </div>
        ) : (
          <div className="row-span-3 mt-2 grid grid-rows-2 p-4 mx-auto gap-y-2 h-full ">
            <div className="row-span-1 flex self-center py-2 px-6 border rounded-xl border-accent/70 bg-gradient-to-br from-accent/20 to-accent/10">
              <span className="text-2xl mx-auto text-accent font-orbitron drop-shadow-redsoft">
                {int}
              </span>
            </div>
            <div className="row-span-1 mx-auto">
              <span className="text-xl mx-auto text-accent/50">
                {"Try another?"}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
