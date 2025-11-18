"use client";
import React, {useEffect} from "react";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loadUsers, selectStatus, selectUsers} from "@/lib/features/users/usersApiSlice";
import {Alert, Avatar, Box, LinearProgress, List, ListItem, ListItemButton} from "@mui/material";
import {stringAvatar} from "@/lib/avatar";

export const UserList = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    if (status == 'initial' || status == 'failed') {
      dispatch(loadUsers());
    }
  }, [dispatch]);

  if (status == 'failed') {
    return (
      <Alert severity="error">Failed to load users.</Alert>
    );
  }

  return (
    <div style={{position: 'relative'}}>
      {status == 'loading' &&
        <Box sx={{ width: '100%', position: 'absolute', zIndex: 100 }}>
          <LinearProgress />
        </Box>
      }

      <List>
        {users && users.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemButton component={Link} href={"/users/" + user.id}>
              <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />&nbsp;
              {user.firstName} {user.lastName}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
