"use client";
import {useEffect, useState} from "react";
import styles from "./Courses.module.css";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loadCourses, selectCourses, selectStatus} from "@/lib/features/courses/coursesApiSlice";
import {loadUsers} from "@/lib/features/users/usersApiSlice";

const options = [5, 10, 20, 30];

export const Courses = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const courses = useAppSelector(selectCourses);

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

  if (status == 'idle' && courses) {
    return (
      <div className={styles.container}>
        {courses.map((course) => (
          <Link key={course.id} href={"courses/" + course.id}>{course.name} {course.level}</Link>
        ))}
      </div>
    );
  }

  return null;
};
