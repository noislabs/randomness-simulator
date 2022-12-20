import { InputAdornment, Chip } from "@mui/material";
import { useState } from "react";
import { NoisTextField } from "../../styles/mui";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";
import { common } from "@mui/material/colors";

export const AddItemTextBox = ({ add }: { add: any }) => {
  const [text, setText] = useState<string>("");

  const addClear = (txt: string) => {
    add(txt);

    setTimeout(() => {
      setText("");
    }, 99);
  };

  const parsePasted = (txt: string) => {
    txt
      .split("\n")
      ?.map((item) => {
        return item.replace("\t", "");
      })
      .forEach((tx) => add(tx));

    setTimeout(() => {
      setText("");
    }, 99);
  };

  return (
    <NoisTextField
      hiddenLabel
      id="ADD"
      aria-label="Add Item"
      placeholder="Add Item"
      variant="outlined"
      type="text"
      size="small"
      InputLabelProps={{
        style: { color: "#dd6e7820" },
      }}
      InputProps={{
        autoComplete: "off",
        style: { color: "#dd6e78" },
        endAdornment: (
          <InputAdornment position="end">
            <AddIcon
              sx={{ color: "#dd6e78" }}
              onClick={() => addClear(text)}
              className="hover:cursor-pointer"
            />
          </InputAdornment>
        ),
      }}
      onChange={(event) => setText(event.target.value)}
      onKeyDown={(e) => (e.key === "Enter" ? addClear(text) : null)}
      onPasteCapture={(event) =>
        parsePasted(event.clipboardData.getData("text"))
      }
      value={text}
    />
  );
};

export const ItemTab = ({
  parentDelete,
  selfText,
  index,
}: {
  parentDelete: Function;
  selfText: string;
  index: number;
}) => {
  return (
    <Chip
      label={<div className="px-2">{selfText}</div>}
      onDelete={() => parentDelete(selfText)}
      deleteIcon={<ClearIcon />}
      avatar={<Avatar sx={{ bgcolor: common.black }}>{index + 1}</Avatar>}
      color="primary"
      variant="outlined"
      sx={{
        "&.MuiChip-colorPrimary": {
          color: "#dd6e78",
          borderRadius: 0,
          border: "1px solid #dd6e7850",
          background: "#dd6e7810",
        },
        ".MuiChip-deleteIcon": {
          color: "#dd6e7850",
          ":hover": {
            color: "#dd6e78",
          },
        },
        ".MuiChip-avatar": {
          bgcolor: "#dd6e7820",
          borderRadius: 0,
          color: "#dd6e78",
        },
      }}
    />
  );
};

export const OutputTab = ({
  selfText,
  index,
}: {
  selfText: string;
  index: number;
}) => {
  return (
    <Chip
      label={<div className="px-2">{selfText}</div>}
      avatar={<Avatar sx={{ bgcolor: common.black }}>{index + 1}</Avatar>}
      color="primary"
      variant="outlined"
      sx={{
        "&.MuiChip-colorPrimary": {
          color: "#dd6e78",
          borderRadius: 0,
          border: "1px solid #dd6e7850",
          background: "#dd6e7810",
        },
        ".MuiChip-avatar": {
          bgcolor: "#dd6e7820",
          borderRadius: 0,
          color: "#dd6e78",
        },
      }}
    />
  );
};
