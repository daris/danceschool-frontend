"use client";
import styles from "./Courses.module.css";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loadCourses, selectCourse, selectStatus} from "@/lib/features/courses/coursesApiSlice";
import {selectCourseWithUsers} from "@/lib/selectors/courseUsers";
import {useEffect} from "react";
import {loadUsers} from "@/lib/features/users/usersApiSlice";

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
        <table>
          <thead>
            <tr>
              <th>{course.name} {course.level}</th>
              {course.lessons.map(lesson => (
                <th key={lesson.id}>{lesson.startTime}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {course.participants.map(participant => (
              <tr key={participant.id}>
                <td>{participant.user?.firstName} {participant.user?.lastName}</td>
                {participant.lessonAttendances.map(lessonAttendance => (
                  <td key={lessonAttendance.lesson.id}>{lessonAttendance.status}</td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );
  }

  return null;
};
