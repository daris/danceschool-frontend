"use client";
import {useEffect, useState} from "react";
import styles from "./Courses.module.css";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectStatus} from "@/lib/features/counter/counterSlice";
import {loadCourses, selectCourses} from "@/lib/features/courses/coursesApiSlice";

const options = [5, 10, 20, 30];

export const Courses = () => {
  // const [numberOfQuotes, setNumberOfQuotes] = useState(10);
  // Using a query hook automatically fetches data and returns query values
  // const { data, isError, isLoading, isSuccess } =
  //   useGetCoursesQuery(numberOfQuotes);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const courses = useAppSelector(selectCourses);

  // dispatch(loadCourses())
  useEffect(() => {
    // Dispatch only once when the component mounts
    dispatch(loadCourses());
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

  if (status == 'idle') {
    return (
      <div className={styles.container}>
        <h3>Select the Quantity of Quotes to Fetch:</h3>
        {courses.map((course) => (
          <Link key={course.id} href={"courses/" + course.id}>{course.name} {course.level}</Link>
        ))}
      </div>
    );
  }

  return null;
};
