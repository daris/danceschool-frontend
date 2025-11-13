"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/lib/features/auth/authSlice";
import { RootState, AppDispatch } from "@/lib/store";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4, border: "1px solid #ccc", borderRadius: 2 }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
      <TextField
        label="Username"
        fullWidth
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Sign In"}
      </Button>
    </Box>
  );
};