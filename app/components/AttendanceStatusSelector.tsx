import {green, red, yellow} from "@mui/material/colors";
import {Box, BoxProps, CircularProgress, Menu, MenuItem, Snackbar, SnackbarCloseReason, SxProps, Tooltip} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React, {useState} from "react";
import {Attendance, AttendanceStatus} from "@/lib/features/courses/types";
import {createCourse, setAttendanceStatus} from "@/lib/features/courses/coursesApiSlice";
import {useAppDispatch} from "@/lib/hooks";

interface AttendanceStatusSelectorProps extends BoxProps {
  attendance: Attendance;
  courseId: string;
  beforeStatusChange?: () => Promise<any>;
}

export const AttendanceStatusSelector: React.FC<AttendanceStatusSelectorProps> = ({attendance, courseId, beforeStatusChange, ...props}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarData, setSnackbarData] = useState<{isOpen: boolean, message?: string}>({isOpen: false, message: ''});

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = async (newStatus: AttendanceStatus|null) => {
    await beforeStatusChange?.();
    setLoading(true);

    const result = await dispatch(setAttendanceStatus({attendance: {lessonId: attendance.lessonId, userId: attendance.userId, status: newStatus} as Attendance, courseId: courseId}));
    if (setAttendanceStatus.rejected.match(result)) {
      setSnackbarData({isOpen: true, message: result.payload as string});
      console.error("Error setting status:", result.payload);
    }

    handleClose();
    setLoading(false);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarData({isOpen: false});
  };


  let statusProps: SxProps = {
    backgroundColor: '#fff',
    border: '1px solid rgba(224, 224, 224, 1)',
    color: green[800],
  };
  let icon = null;

  if (attendance.status == AttendanceStatus.NORMAL) {
    statusProps = {
      backgroundColor: green[50],
      border: '1px solid ' + green[100],
      color: green[800],
    };
    icon = <CheckIcon></CheckIcon>;
  } else if (attendance.status == AttendanceStatus.FULL_PASS) {
    statusProps = {
      backgroundColor: red[50],
      border: '1px solid ' + red[100],
      color: red[800],
    }
    icon = <CheckIcon></CheckIcon>;
  } else if (attendance.status == AttendanceStatus.RESCHEDULED) {
    statusProps = {
      backgroundColor: yellow[50],
      border: '1px solid ' + yellow[100],
      color: yellow[800],
    }
    icon = <CheckIcon></CheckIcon>;
  }

  if (loading) {
    return <CircularProgress size={24} />;
  }

  return (
    <>
      {snackbarData &&
        <Snackbar
          open={snackbarData.isOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message={snackbarData.message}
        />
      }
      <Tooltip title={attendance.status}>
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
