import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Slider, Typography, Box, Paper } from "@mui/material";
import CardComponent from "../Card/CardComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export default function FilteringByPrice() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/courses")
      .then((res) => {
        setCourses(res.data);
        filterCoursesByPrice(res.data, priceRange);
      })
      .catch((err) => console.error("Error", err));
  }, [priceRange]);

  const filterCoursesByPrice = (courses, range) => {
    const filtered = courses.filter(
      (course) => course.price >= range[0] && course.price <= range[1]
    );
    setFilteredCourses(filtered);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Filter by Price</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={200}
          step={10}
        />
        <Typography variant="body2">
          Price: ${priceRange[0]} - ${priceRange[1]}
        </Typography>
      </Paper>

      <Box>
        <Grid container spacing={2}>
          {filteredCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                instPic={course.visible_instructors[0].image_50x50}
                instName={course.visible_instructors[0].display_name}
                media={course.image}
                courseTitle={course.title}
                actions={[
                  { label: "add to favorites", icon: <FavoriteIcon /> },
                  { label: "share", icon: <ShareIcon /> },
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
