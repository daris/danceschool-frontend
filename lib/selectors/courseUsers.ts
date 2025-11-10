import { createSelector } from "@reduxjs/toolkit";
import {selectCourse} from "@/lib/features/courses/coursesApiSlice";
import {selectUsers} from "@/lib/features/users/usersApiSlice";

export const selectCourseWithUsers = createSelector(
  [selectCourse, selectUsers],
  (course, users) => {
    if (!course) return null;

    const participantsWithUsers = course.participants.map((participant) => {
      const userId = participant._links.user.href.split('/').pop();
      const user = users.find((u) => u.id === userId);

      const lessonAttendances = course.lessons.map(lesson => {
        const attendacne = lesson.attendances.find(attendance => attendance._links.user.href.split('/').pop() == user?.id);
        return {lesson, ...attendacne};
      })

      return { ...participant, user, lessonAttendances };
    });

    return {
      ...course,
      participants: participantsWithUsers,
    };
  }
);