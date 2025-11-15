"use client";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  addParticipantForCourse,
  createAttendance,
  loadCourses,
  selectCourse,
  selectStatus,
  updateAttendance
} from "@/lib/features/courses/coursesApiSlice";
import {selectCourseWithUsers} from "@/lib/selectors/courseUsers";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
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
import {Attendance, AttendanceStatus,} from "@/lib/features/courses/courseAPI";
import {Avatar, Box, LinearProgress, Typography} from "@mui/material";
import {stringAvatar} from "@/lib/avatar";
import dayjs from "dayjs";
import {AttendanceStatusSelector} from "@/app/components/AttendanceStatusSelector";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollLeftRef = useRef(0); // store horizontal scroll position

  const handleAttendanceStatusChange = (attendance: Attendance|undefined, lessonId: string, userId: string, newStatus: AttendanceStatus|null) => {
    if (containerRef.current) {
      scrollLeftRef.current = containerRef.current.scrollLeft;
    }

    if (!course) return;

    if (!attendance) {
      dispatch(createAttendance({attendance: {lessonId: lessonId, userId: userId, status: newStatus} as Attendance, courseId: course.id}));
    } else {
      dispatch(updateAttendance({attendance: {...attendance, status: newStatus}, courseId: course.id}));
    }
  }

  // Restore scroll position after render
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeftRef.current;
    }
  }, [course]); // run whenever table data changes


  if (status == 'failed') {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  return (
    <div style={{position: 'relative'}}>
      {status == 'loading' &&
        <Box sx={{ width: '100%', position: 'absolute', zIndex: 100 }}>
          <LinearProgress />
        </Box>
      }
      <TableContainer component={Paper} ref={containerRef}>
        <Table sx={{

          minWidth: 650,
          borderCollapse: 'collapse',
          '& th, & td': {
            border: '1px solid rgba(224, 224, 224, 1)',
          },
        }} stickyHeader aria-label="simple table">
          {courseWithUsers &&
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    position: 'sticky',
                    left: 0,
                    background: '#fff',
                    zIndex: 3,
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  {courseWithUsers.name} {courseWithUsers.level}
                </TableCell>
                {courseWithUsers.lessons.map(lesson => (
                  <TableCell key={lesson.id} align="center">
                    <Box>
                      <Typography variant="caption">{dayjs(lesson.startTime).format("D.MM")}</Typography>
                      <Typography>{dayjs(lesson.startTime).format("HH:mm")}</Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          }
          <TableBody>
            {courseWithUsers && courseWithUsers.participants.map(participant => {
              const user = participant.user;
              const lastPass = user?.passes ? user?.passes[user.passes.length - 1] : null;

              return (
                <TableRow
                  key={participant.id}
                >
                  <TableCell component="th" scope="row" sx={{
                    position: 'sticky',
                    left: 0,
                    background: '#fff',
                    zIndex: 2,
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                  }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& > div': {mr: 1, flexShrink: 0}
                    }}>
                      <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`)} />&nbsp;
                      <Box>
                        <Typography
                          variant="body1">{user?.firstName} {user?.lastName}</Typography>
                        {lastPass &&
                          <Typography variant="caption" color="text.secondary">Karnet: {dayjs(lastPass.startTime).format("DD.MM")} - {dayjs(lastPass.endTime).format("DD.MM")}</Typography>
                        }
                      </Box>
                    </Box>
                  </TableCell>
                  {participant.lessonAttendances.map(lessonAttendance => (
                    <TableCell key={lessonAttendance.lesson.id} align="center"
                               sx={{
                                 backgroundColor: user?.passes?.find(p => course && dayjs(p.startTime).isBefore(lessonAttendance.lesson.startTime) && dayjs(p.endTime).isAfter(lessonAttendance.lesson.startTime) && p.courseIds.includes(course.id)) ? '#f0f0f0' : '#fff'
                               }}>
                      <AttendanceStatusSelector
                        status={lessonAttendance.attendance?.status}
                        onStatusChange={(newStatus) => handleAttendanceStatusChange(lessonAttendance.attendance, lessonAttendance.lesson.id, participant.userId, newStatus)}
                      ></AttendanceStatusSelector>
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell component="th" scope="row" sx={{
                position: 'sticky',
                left: 0,
                background: '#fff',
                zIndex: 2,
                borderRight: '1px solid rgba(224, 224, 224, 1)',
              }}>
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
    </div>
  );
};
