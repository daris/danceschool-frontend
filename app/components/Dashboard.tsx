"use client";

import React from "react";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import Link from "next/link";


export default function DashboardPage() {
  return (
    <Box paddingTop={3}>
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Manage your courses, lessons, participants and attendance.
          </Typography>
          <Button variant="contained" component={Link} href="/courses">View Courses</Button>
        </CardContent>
      </Card>
    </Box>
  );
}