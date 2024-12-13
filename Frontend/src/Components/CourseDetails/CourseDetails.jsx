import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Chip,
  Divider,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";

export default function CourseDetails() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const translate = useSelector((state) => state.Localization.translation);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course details:", err));
  }, [id]);

  if (!course) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            {course.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {course.headline}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Chip
              label={course.rating?.toFixed(1)}
              icon={<StarIcon sx={{ color: "gold" }} />}
              sx={{ mr: 1, fontWeight: "bold" }}
            />
            <Typography variant="body2" color="text.secondary">
              ({course.num_reviews} ratings) • {course.num_subscribers} students
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Created by{" "}
            {course.visible_instructors
              ?.map((instructor) => instructor.display_name)
              .join(", ")}
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {translate.whatYouWillLearn}
            </Typography>
            {course.what_you_will_learn_data?.map((learn, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <CheckIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="body1">{learn}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {translate.description}
            </Typography>
            {/* {course.description} */}
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {translate.requirements}
            </Typography>
            {course.requirements_data?.map((require, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 2 }}>
                • {require}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{ position: "sticky", top: 20, boxShadow: 3, borderRadius: 2 }}
          >
            <CardMedia
              component="img"
              height="200"
              image={course.image}
              alt={course.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                {course.price_detail?.price_string}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                {translate.addToCart}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                {translate.buyNow}
              </Button>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, textAlign: "center" }}
              >
                {translate.dayMoneyBackGuarantee}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {translate.thisCourseInclude}
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PlayCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${course.content_info_short} on-demand video`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
