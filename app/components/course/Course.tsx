"use client";
import {useState} from "react";
import styles from "./Courses.module.css";

const options = [5, 10, 20, 30];

export const Course = (props: {id: string}) => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(10);
  // Using a query hook automatically fetches data and returns query values
  // const { data, isError, isLoading, isSuccess } =
  //   useGetCourseQuery(props.id);

  // if (isError) {
  //   return (
  //     <div>
  //       <h1>There was an error!!!</h1>
  //     </div>
  //   );
  // }
  //
  // if (isLoading) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }
  //
  // if (isSuccess) {
  //   return (
  //     <div className={styles.container}>
  //       <h3>{data.name} {data.level}</h3>
  //
  //     </div>
  //   );
  // }

  return null;
};
