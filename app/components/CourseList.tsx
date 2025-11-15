"use client";
import React, {useEffect} from "react";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loadCourses, selectCourses, selectStatus} from "@/lib/features/courses/coursesApiSlice";
import {loadUsers} from "@/lib/features/users/usersApiSlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, LinearProgress} from "@mui/material";

export const CourseList = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const courses = useAppSelector(selectCourses);

  useEffect(() => {
    if (status == "initial") {
      dispatch(loadCourses());
      dispatch(loadUsers());
    }
  }, [dispatch]);

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {courses && courses.map((course) => (
              <TableRow
                key={course.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link key={course.id} href={"/courses/" + course.id}>{course.name} {course.level}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
