import {createSelector} from "@reduxjs/toolkit";
import {selectCourse} from "@/lib/features/courses/coursesApiSlice";
import {selectUsers} from "@/lib/features/users/usersApiSlice";

export const selectAvailableParticipantsForCourse = createSelector(
  [selectUsers, selectCourse],
  (users, course) => {
    return users.filter(user => !course?.participants.find(participant => participant.userId == user.id));
  }
);