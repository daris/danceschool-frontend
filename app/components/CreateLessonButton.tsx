"use client";

import React, {FormEvent} from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";
import {DateTimePicker} from "@mui/x-date-pickers";
import Modal from '@mui/material/Modal';
import {Dayjs} from "dayjs";
import {createLesson} from "@/lib/features/courses/coursesApiSlice";
import {CreateLesson} from "@/lib/features/courses/types";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface CreateLessonButtonProps {
  courseId: string;
}

export const CreateLessonButton: React.FC<CreateLessonButtonProps> = ({courseId})=> {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDateTime, setSelectedDateTime] = React.useState<Dayjs | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // const course: Course = {name: name} as Course;
    await dispatch(createLesson({
      startTime: selectedDateTime?.toISOString(),
      endTime: selectedDateTime?.toISOString(), // todo: fixme
      courseId: courseId
    } as CreateLesson));

    setLoading(false);
    setSelectedDateTime(null);
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AddIcon></AddIcon>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <DateTimePicker
              label="Start time"
              // sx={{ flexGrow: 1 }}
              value={selectedDateTime}
              onChange={(dateTime) => setSelectedDateTime(dateTime)}
            />
            <Button variant="contained" size="medium" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Create"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}