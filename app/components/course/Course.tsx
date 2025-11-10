"use client";
import styles from "./Courses.module.css";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectCourse, selectStatus} from "@/lib/features/courses/coursesApiSlice";

export const Course = (props: {id: string}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const course = useAppSelector((state) => selectCourse(state, props.id));

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
        <h3>{course.name} {course.level}</h3>

      </div>
    );
  }

  return null;
};
