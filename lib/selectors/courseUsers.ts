import {createSelector} from "@reduxjs/toolkit";
import {selectCourse} from "@/lib/features/courses/coursesApiSlice";
import {selectUsers} from "@/lib/features/users/usersApiSlice";
import {Attendance} from "@/lib/features/courses/types";

export const selectCourseWithUsers = createSelector(
  [selectCourse, selectUsers],
  (course, users) => {
    if (!course) return null;

    const participantsWithUsers = course.participants.map((participant) => {
      const user = users.find((u) => u.id === participant.userId);

      const lessonAttendances = course.lessons.map(lesson => {
        const attendance = lesson.attendances.find(attendance => attendance.userId == user?.id)
          || {userId: user?.id, lessonId: lesson.id} as Attendance;
        return {lesson, attendance};
      })

      return { ...participant, user, lessonAttendances };
    });

    return {
      ...course,
      participants: participantsWithUsers,
    };
  }
);