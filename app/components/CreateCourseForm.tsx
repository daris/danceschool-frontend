"use client";

import React, {FormEvent, useState} from "react";
import {Box, TextField, Button, CircularProgress} from "@mui/material";
import {createCourse, loadCourses} from "@/lib/features/courses/coursesApiSlice";
import {Course} from "@/lib/features/courses/types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";

export default function CreateCourseForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    const course: Course = {name: name} as Course;
    await dispatch(createCourse(course));
    await dispatch(loadCourses());

    setLoading(false);
    setName("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        width: "100%",
      }}
    >
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
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Create"}
      </Button>
    </Box>
  );
}