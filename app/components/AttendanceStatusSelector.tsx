import {green, red, yellow} from "@mui/material/colors";
import {Box, BoxProps, Menu, MenuItem, SxProps, Tooltip} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React, {useState} from "react";
import {AttendanceStatus} from "@/lib/features/courses/types";

interface AttendanceStatusSelectorProps extends BoxProps {
  status?: AttendanceStatus|null;
  onStatusChange?: (newStatus: AttendanceStatus|null) => void;
}

export const AttendanceStatusSelector: React.FC<AttendanceStatusSelectorProps> = ({status, onStatusChange, ...props}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newStatus: AttendanceStatus|null) => {
    onStatusChange?.(newStatus);
    handleClose();
  };

  let statusProps: SxProps = {
    backgroundColor: '#fff',
    border: '1px solid rgba(224, 224, 224, 1)',
    color: green[800],
  };
  let icon = null;

  if (status == AttendanceStatus.NORMAL) {
    statusProps = {
      backgroundColor: green[50],
      border: '1px solid ' + green[100],
      color: green[800],
    };
    icon = <CheckIcon></CheckIcon>;
  } else if (status == AttendanceStatus.FULL_PASS) {
    statusProps = {
      backgroundColor: red[50],
      border: '1px solid ' + red[100],
      color: red[800],
    }
    icon = <CheckIcon></CheckIcon>;
  } else if (status == AttendanceStatus.RESCHEDULED) {
    statusProps = {
      backgroundColor: yellow[50],
      border: '1px solid ' + yellow[100],
      color: yellow[800],
    }
    icon = <CheckIcon></CheckIcon>;
  }


  return (
    <>
      <Tooltip title={status}>
        <Box sx={{
          ...props,
          borderRadius: 3,
          cursor: 'pointer',
          width: 32,
          height: 32,
          margin: '0 auto',
          ...statusProps,
        }}
         onClick={handleOpen}
        >
          {icon}
        </Box>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSelect(AttendanceStatus.NORMAL)}>Normal</MenuItem>
        <MenuItem onClick={() => handleSelect(AttendanceStatus.FULL_PASS)}>Full pass</MenuItem>
        <MenuItem onClick={() => handleSelect(AttendanceStatus.RESCHEDULED)}>Rescheduled</MenuItem>
        <MenuItem onClick={() => handleSelect(null)}>Reset</MenuItem>
      </Menu>
    </>
  );
};
