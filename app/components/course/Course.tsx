"use client";
import styles from "./Courses.module.css";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  addParticipantForCourse,
  loadCourses,
  saveCourse,
  selectCourse,
  selectStatus
} from "@/lib/features/courses/coursesApiSlice";
import {selectCourseWithUsers} from "@/lib/selectors/courseUsers";
import {useEffect, useState} from "react";
import {loadUsers} from "@/lib/features/users/usersApiSlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {selectAvailableParticipantsForCourse} from "@/lib/selectors/availableParticipantsForCourse";
import TableFooter from "@mui/material/TableFooter";
import Button from "@mui/material/Button";
import {User} from "@/lib/features/users/usersAPI";
import { Course } from "@/lib/features/courses/courseAPI";
import { Avatar, Box } from "@mui/material";
import {stringAvatar} from "@/lib/avatar";

export const CourseEditView = (props: {id: string}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const course = useAppSelector((state) => selectCourse(state, props.id));
  const courseWithUsers = useAppSelector((state) => selectCourseWithUsers(state, props.id));
  const availableParticipants = useAppSelector((state) => selectAvailableParticipantsForCourse(state, props.id));
  const [selectedParticipant, setSelectedParticipant] = useState<User|null>(null);

  useEffect(() => {
    dispatch(loadCourses());
    dispatch(loadUsers());
  }, [dispatch]);

  const handleAddParticipant = () => {
    if (!selectedParticipant) return;

    // Dispatch with parameters
    dispatch(addParticipantForCourse({
      courseId: props.id,
      userId: selectedParticipant.id
    }));

    // Optionally clear selection
    setSelectedParticipant(null);
  };


  const handleSaveCourse = () => {
    dispatch(saveCourse({
      course: course as Course,
    }));

    // Optionally clear selection
    setSelectedParticipant(null);
  };

  if (status == 'failed') {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (status == 'loading') {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (status == 'idle' && courseWithUsers) {
    return (
      <div className={styles.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>{courseWithUsers.name} {courseWithUsers.level}</TableCell>
                {courseWithUsers.lessons.map(lesson => (
                  <TableCell key={lesson.id}>{lesson.startTime}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courseWithUsers.participants.map(participant => (
                <TableRow
                  key={participant.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ '& > div': { mr: 2, flexShrink: 0 } }}>
                      <Avatar {...stringAvatar(`${participant.user?.firstName} ${participant.user?.lastName}`)} />&nbsp;
                      {participant.user?.firstName} {participant.user?.lastName}
                    </Box>
                  </TableCell>
                  {participant.lessonAttendances.map(lessonAttendance => (
                    <TableCell key={lessonAttendance.lesson.id}>{lessonAttendance.status}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Autocomplete
                    disablePortal
                    options={availableParticipants}
                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                    sx={{ width: 300 }}
                    value={selectedParticipant}
                    onChange={(event, newValue) => setSelectedParticipant(newValue)}
                    renderInput={(params) => <TextField {...params} label="Dodaj uczestnika" />}
                    renderOption={(props, option) => {
                      const { key, ...optionProps } = props;
                      return (
                        <Box
                          key={key}
                          component="li"
                          sx={{ '& > Avatar': { mr: 2, flexShrink: 0 } }}
                          {...optionProps}
                        >
                          <Avatar {...stringAvatar(`${option.firstName} ${option.lastName}`)} />&nbsp;
                          {option.firstName} {option.lastName}
                        </Box>
                      );
                    }}
                  />
                  <Button variant="text" onClick={handleAddParticipant}>Dodaj</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Button variant="text"  onClick={handleSaveCourse}>Zapisz</Button>

      </div>
    );
  }

  return null;
};
