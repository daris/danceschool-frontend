"use client";
import styles from "./Courses.module.css";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loadCourses, selectCourse, selectStatus} from "@/lib/features/courses/coursesApiSlice";
import {selectCourseWithUsers} from "@/lib/selectors/courseUsers";
import {useEffect} from "react";
import {loadUsers} from "@/lib/features/users/usersApiSlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export const Course = (props: {id: string}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const course = useAppSelector((state) => selectCourseWithUsers(state, props.id));

  useEffect(() => {
    dispatch(loadCourses());
    dispatch(loadUsers());
  }, [dispatch]);

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

  if (status == 'idle' && course) {
    return (
      <div className={styles.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>{course.name} {course.level}</TableCell>
                {course.lessons.map(lesson => (
                  <TableCell key={lesson.id}>{lesson.startTime}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {course.participants.map(participant => (
                <TableRow
                  key={participant.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {participant.user?.firstName} {participant.user?.lastName}
                  </TableCell>
                  {participant.lessonAttendances.map(lessonAttendance => (
                    <TableCell key={lessonAttendance.lesson.id}>{lessonAttendance.status}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  return null;
};
