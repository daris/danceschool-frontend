"use client";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectStatus} from "@/lib/features/courses/coursesApiSlice";
import {loadUsers, selectUser} from "@/lib/features/users/usersApiSlice";
import {Alert, Avatar, Box, LinearProgress} from "@mui/material";
import {stringAvatar} from "@/lib/avatar";

export const UserDetails = (props: {id: string}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const user = useAppSelector(state => selectUser(state, props.id));

  useEffect(() => {
    if (status == 'initial' || status == 'failed') {
      dispatch(loadUsers());
    }
  }, [dispatch]);

  if (status == 'failed') {
    return (
      <Alert severity="error">Failed to load user.</Alert>
    );
  }

  return (
    <div style={{position: 'relative'}}>
      {status == 'loading' &&
        <Box sx={{ width: '100%', position: 'absolute', zIndex: 100 }}>
          <LinearProgress />
        </Box>
      }

      {user &&
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
          <h1>{user.firstName} {user.lastName}</h1>
        </Box>
      }
    </div>
  );
};
