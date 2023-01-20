import { InputAdornment } from "@mui/material";
import { NoisTextField } from "../../styles/mui";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";

export const NumberSelect = ({ setNum }: { setNum: any }) => {
  return (
    <NoisTextField
      hiddenLabel
      id="NUMBER_SELECT"
      aria-label="Number Select"
      placeholder="How many to pick?"
      variant="outlined"
      type="number"
      size="small"
      InputLabelProps={{
        style: { color: "#dd6e7820" },
      }}
      InputProps={{
        autoComplete: "off",
        style: { color: "#dd6e78" },
        endAdornment: (
          <InputAdornment position="end">
            <NumbersOutlinedIcon sx={{ color: "#dd6e78" }} />
          </InputAdornment>
        ),
      }}
      onChange={(event) => setNum(parseInt(event.target.value))}
    />
  );
};
