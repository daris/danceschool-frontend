"use client";

import React, {FormEvent, useState} from "react";
import {Box, TextField, Button, CircularProgress, Alert} from "@mui/material";
import {createCourse, loadCourses} from "@/lib/features/courses/coursesApiSlice";
import {Course} from "@/lib/features/courses/types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";

export default function CreateCourseForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');

    const course: Course = {name: name} as Course;

    const result = await dispatch(createCourse(course));
    if (createCourse.rejected.match(result)) {
      setError(result.payload as string);
      console.error("Error creating course:", result.payload);

      setLoading(false);
      return;
    }

    await dispatch(loadCourses());

    setLoading(false);
    setName("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        width: "100%",
      }}>
        <TextField
          label="Course Name"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ flexGrow: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          size="medium"
          disabled={loading || !name}
        >
          {loading ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </Box>
    </Box>
  );
}