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
        <table>
          <thead>
            <tr>
              <th>{course.name} {course.level}</th>
              {course.lessons.map(lesson => (
                <th>{lesson.startTime}</th>
              ))}
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>{course.name} {course.level}</td>
              {course.lessons.map(lesson => (
                <td>{lesson.startTime}</td>
              ))}
            </tr>
          </tbody>

        </table>
      </div>
    );
  }

  return null;
};
