"use client";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  addParticipantForCourse,
  createAttendance,
  loadCourses,
  selectCourse,
  selectStatus,
  updateAttendance, updateAttendanceLocally
} from "@/lib/features/courses/coursesApiSlice";
import {selectCourseWithUsers} from "@/lib/selectors/courseUsers";
import React, {FormEvent, useEffect, useLayoutEffect, useRef, useState} from "react";
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
import Button from "@mui/material/Button";
import {Avatar, Box, LinearProgress, Typography} from "@mui/material";
import {stringAvatar} from "@/lib/avatar";
import dayjs from "dayjs";
import {AttendanceStatusSelector} from "@/app/components/AttendanceStatusSelector";
import {Attendance, AttendanceStatus, CourseUpdateAttendances, Lesson} from "@/lib/features/courses/types";
import {User} from "@/lib/features/users/types";
import {CreateLessonButton} from "@/app/components/CreateLessonButton";
import QRCode from "react-qr-code";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useStompSubscription} from "@/app/components/useStompSubscription";

export const CourseEditView = (props: {id: string}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const course = useAppSelector((state) => selectCourse(state, props.id));
  const courseWithUsers = useAppSelector((state) => selectCourseWithUsers(state, props.id));
  const availableParticipants = useAppSelector((state) => selectAvailableParticipantsForCourse(state, props.id));
  const [selectedParticipant, setSelectedParticipant] = useState<User|null>(null);
  const [lessonDialogData, setLessonDialogData] = React.useState<{isOpen: boolean, lesson?: Lesson}>({isOpen: false});

  useEffect(() => {
    if (status == "initial") {
      dispatch(loadCourses());
      dispatch(loadUsers());
    }
  }, [dispatch]);

  const handleAddParticipant = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedParticipant) return;

    dispatch(addParticipantForCourse({
      courseId: props.id,
      userId: selectedParticipant.id
    }));

    setSelectedParticipant(null);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollLeftRef = useRef(0); // store horizontal scroll position

  const handleAttendanceStatusChange = async (attendance: Attendance|undefined, lessonId: string, userId: string, newStatus: AttendanceStatus|null) => {
    if (containerRef.current) {
      scrollLeftRef.current = containerRef.current.scrollLeft;
    }

    if (!course) return;

    // if (!attendance) {
    await dispatch(createAttendance({attendance: {lessonId: lessonId, userId: userId, status: newStatus} as Attendance}));
    // } else {
    //   await dispatch(updateAttendance({attendance: {...attendance, status: newStatus}, courseId: course.id}));
    // }
  }

  // Restore scroll position after render
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeftRef.current;
    }
  }, [course]); // run whenever table data changes

  const handleLessonDialogOpen = (lesson: Lesson) => {
    setLessonDialogData({isOpen: true, lesson});
  };

  const handleLessonDialogClose = () => {
    setLessonDialogData({isOpen: false});
  };

  useStompSubscription<CourseUpdateAttendances>(course ? `/topic/courses/${course.id}/attendances` : '', (update) => {
    console.log("Received attendance update:", update);
    dispatch(updateAttendanceLocally(update));
  });

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
        <Table size="small" sx={{
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
                    <Box onClick={() => handleLessonDialogOpen(lesson)} style={{cursor: 'pointer'}}>
                      <Typography variant="caption">{dayjs(lesson.startTime).format("D.MM")}</Typography>
                      <Typography>{dayjs(lesson.startTime).format("HH:mm")}</Typography>
                    </Box>
                  </TableCell>
                ))}
                <TableCell>
                  {course &&
                    <CreateLessonButton courseId={course.id}></CreateLessonButton>
                  }
                </TableCell>
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
                    }}>
                      <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`)} />&nbsp;
                      <Box sx={{
                        whiteSpace: "nowrap"
                      }}>
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

                  <TableCell></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        component="form"
        onSubmit={handleAddParticipant}
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          width: "100%",
          paddingTop: 3,
        }}>
        <Autocomplete
          disablePortal
          sx={{ flexGrow: 1 }}
          options={availableParticipants}
          getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
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
        <Button variant="text" type="submit">Dodaj</Button>
      </Box>

      <Dialog
        open={lessonDialogData.isOpen}
        onClose={handleLessonDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {lessonDialogData.lesson &&
            <>
              <Typography variant="caption">{dayjs(lessonDialogData.lesson.startTime).format("D.MM")}</Typography>
              <Typography>{dayjs(lessonDialogData.lesson.startTime).format("HH:mm")}</Typography>
            </>
          }
        </DialogTitle>
        <DialogContent>
          {lessonDialogData.lesson &&
            <div style={{ height: "auto", margin: "0 auto", marginTop: 30, maxWidth: 128, width: "100%" }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={JSON.stringify({id: lessonDialogData.lesson.id, type: 'LESSON'})}
                viewBox={`0 0 256 256`}
              />
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLessonDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
