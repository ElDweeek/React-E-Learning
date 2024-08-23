import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import CardComponent from "../../Components/Card/CardComponent";
import { Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Search from "../../Components/Search/Search"
import { useSelector } from "react-redux";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 15;
 const translate = useSelector((state) => state.Localization.translation);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/courses?_page=${page}&_limit=${pageSize}`)
      .then((res) => {
        setCourses(res.data);
        const totalCourses = parseInt(res.headers["x-total-count"], 10);
        setTotalPages(Math.ceil(totalCourses / pageSize));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }, [page]);

  const handlePageChange = (event, page) => {
    // console.log(page)
    setPage(page);
  };

  return (
    <>
      <Search />
      <h4>{translate.coursesHeading}</h4>
      <Box>
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={12} md={6} lg={4}>
              <CardComponent
                instPic={course.visible_instructors[0].image_50x50}
                instName={course.visible_instructors[0].display_name}
                // subheader="September 14, 2016"
                media={course.image}
                courseTitle={course.title}
                // content   --> description
                actions={[
                  { label: "add to favorites", icon: <FavoriteIcon /> },
                  { label: "share", icon: <ShareIcon /> },
                ]}
              />
            </Grid>
          ))}
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
}

export default CourseList;
