//import * as React from 'react';
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent } from "@mui/material";
import { useDashboardContext } from "../../contexts/dashboard";

export const Disclaimer = () => {
  const [open, setOpen] = useState(true);

  const { switchFirstLoad } = useDashboardContext();

  const handleClose = () => {
    switchFirstLoad(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "0px",
            boxShadow:
              "0 0 70px 50px rgba(0, 255, 208, .99), 0 0 5px 1px rgba(0, 255, 208, .31) ",
            width: "calc(100% - 40%)",
            height: "calc(100% - 10%)",
            //height: 500,
            //width: 1000,
            background: "#FF0000",
            border: "1px solid",
            borderColor: "#dd6e78",
            p: 1,
          },
          "& .MuiDialog-paper": {
            boxShadow:
              "inset 200px 200px 200px 200px #000000, inset -200px -200px 200px 200px #000000",
          },
          bgcolor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <DialogContent>
          <div className="text-white/50 font-orbitron pb-2">DISCLAIMER</div>
          <div className="text-[#FFE8E9] text-sm font-bold">
            The Nois Randomness Simulator gets its data directly from Nois
            Network, but the randomness transformations occur offchain. You may
            find some discrepencies between the data displayed on this tool and
            the actual onchain data. This may be due to slight differences
            between the Javascript wrapped WASM module this tool uses, and the
            native Rust code that runs on-chain.
          </div>
          <br />
          <div className="text-white/50 font-orbitron pb-2">
            What is this for?
          </div>
          <div className="text-[#FFE8E9] text-sm">
            The Nois Randomness Simulator is a tool designed for app users and
            developers to visualize how smart contracts can utilize Nois
            generated randomness. By using the simulator, developers can show
            their users how their application makes use of Nois randomness,
            providing them with a better understanding of how their application
            works. On the other hand, application users can use this tool to
            verify that the applications they interact with are being
            transparent about how they interact with Nois randomness
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="nois-button mx-auto font-orbitron mb-4"
            onClick={() => handleClose()}
          >
            Enter
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};
