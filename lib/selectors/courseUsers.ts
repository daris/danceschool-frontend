import { createSelector } from "@reduxjs/toolkit";
import {selectCourse} from "@/lib/features/courses/coursesApiSlice";
import {selectUsers} from "@/lib/features/users/usersApiSlice";
import {extractIdFromUrl} from "@/lib/utils";

export const selectCourseWithUsers = createSelector(
  [selectCourse, selectUsers],
  (course, users) => {
    if (!course) return null;

    const participantsWithUsers = course.participants.map((participant) => {
      const userId = extractIdFromUrl(participant._links.user.href);
      const user = users.find((u) => u.id === userId);

      const lessonAttendances = course.lessons.map(lesson => {
        const attendacne = lesson.attendances.find(attendance => extractIdFromUrl(attendance._links.user.href) == user?.id);
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