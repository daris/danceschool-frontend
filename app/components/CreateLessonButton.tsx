"use client";

import React, {FormEvent, useState} from "react";
import {Alert, Box, Button, CircularProgress, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";
import {DateTimePicker} from "@mui/x-date-pickers";
import Modal from '@mui/material/Modal';
import {Dayjs} from "dayjs";
import {createCourse, createLesson} from "@/lib/features/courses/coursesApiSlice";
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
  const [error, setError] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const result = await dispatch(createLesson({
      startTime: selectedDateTime?.toISOString(),
      endTime: selectedDateTime?.toISOString(), // todo: fixme
      courseId: courseId
    } as CreateLesson));

    if (createLesson.rejected.match(result)) {
      setError(result.payload as string);
      console.error("Error creating lesson:", result.payload);

      setLoading(false);
      return;
    }

    setLoading(false);
    setSelectedDateTime(null);
    setOpen(false);
    setError('');
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
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ mb: 2 }}>Create new lesson</Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <DateTimePicker
              label="Start time"
              sx={{ width: '100%', mb: 2 }}
              value={selectedDateTime}
              onChange={(dateTime) => setSelectedDateTime(dateTime)}
            />
            <Button variant="contained" size="medium" type="submit" fullWidth disabled={loading || !selectedDateTime}>
              {loading ? <CircularProgress size={24} /> : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}