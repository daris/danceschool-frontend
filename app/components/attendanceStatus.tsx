import {green, red} from "@mui/material/colors";
import {Box, Tooltip} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {AttendanceStatus} from "@/lib/features/courses/courseAPI";

export const AttendanceStatusSelector = (props: {status: AttendanceStatus|undefined}) => {
  const status = props.status;

  const commonBoxStyles = {
    borderRadius: 3,
    cursor: 'pointer',
    width: 32,
    height: 32,
    margin: '0 auto',
  }

  if (status == AttendanceStatus.NORMAL) {
    return (
      <Tooltip title={status}>
        <Box sx={{
          ...commonBoxStyles,
          backgroundColor: green[50],
          border: '1px solid ' + green[100],
          color: green[800],
        }}>
          <CheckIcon></CheckIcon>
        </Box>
      </Tooltip>
    );
  }


  if (status == AttendanceStatus.FULL_PASS) {
    return (
      <Tooltip title={status}>
        <Box sx={{
          ...commonBoxStyles,
          backgroundColor: red[50],
          border: '1px solid ' + red[100],
          color: red[800],
        }}>
            <CheckIcon></CheckIcon>
        </Box>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="Click to select status">
      <Box sx={{
        ...commonBoxStyles,
        backgroundColor: '#fff',
        border: '1px solid rgba(224, 224, 224, 1)',
        color: green[800],
      }}>
      </Box>
    </Tooltip>

  );
};
