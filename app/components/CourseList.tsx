"use client";
import React, {useEffect} from "react";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loadCourses, selectCourses, selectStatus} from "@/lib/features/courses/coursesApiSlice";
import {loadUsers} from "@/lib/features/users/usersApiSlice";
import {Box, LinearProgress, List, ListItem, ListItemButton} from "@mui/material";

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

      <List>
        {courses && courses.map((course) => (
          <ListItem key={course.id} disablePadding>
            <ListItemButton component={Link} href={"/courses/" + course.id}>
              {course.name} {course.level}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
