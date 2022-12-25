import styled from "@emotion/styled";
import {
  TextField,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

export const NoisTextField = styled(TextField)({
  "&:disabled": {
    background: "#FF0000",
  },
  "& label.Mui-focused": {
    color: "#dd6e78",
  },
  "& label.Mui-root": {
    color: "#dd6e78",
  },
  "& MuiInputLabel-root": {
    color: "#dd6e78",
    fontColor: "#dd6e78",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "#dd6e78",
      borderColor: "#dd6e7850",
      borderWidth: "1px",
      borderRadius: "8px",
      //background: 'linear-gradient(to right bottom, #10101330, #10101330)'
      backgroundColor: "#10101330",
    },
    "&:hover fieldset": {
      borderColor: "#dd6e7880",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#dd6e78",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-root.Mui-disabled": {
    "& fieldset": {
      borderColor: "#545454",
    },
  },
});

export const NoisTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip leaveDelay={0} {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "#dd6e78",
    border: "1px solid #dd6e78",
    fontSize: "small",
    borderRadius: 0,
  },
}));
