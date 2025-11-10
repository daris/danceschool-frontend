"use client";
import { useGetCoursesQuery } from "@/lib/features/quotes/coursesApiSlice";
import { useState } from "react";
import styles from "./Courses.module.css";

const options = [5, 10, 20, 30];

export const Courses = () => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(10);
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } =
    useGetCoursesQuery(numberOfQuotes);

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <h3>Select the Quantity of Quotes to Fetch:</h3>
        <select
          className={styles.select}
          value={numberOfQuotes}
          onChange={(e) => {
            setNumberOfQuotes(Number(e.target.value));
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {data._embedded.courses.map((course) => (
          <blockquote key={course.id}>
            &ldquo;{course.name}&rdquo;
            <footer>
              <cite>{course.level}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    );
  }

  return null;
};
