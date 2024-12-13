import './App.css';
import Navbar from './Components/NavBar/NavBar';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Courses from './Pages/Courses/Courses';
import Contact from './Pages/Contact/Contact';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import SignIn from './Pages/SignIn/SignIn';
import Admin from './Pages/Admin/Admin';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import CoursesManagement from './Pages/Admin/CoursesManagement/CoursesManagement';
import CourseForm from './Components/CourseForm/CourseForm';
import UsersManagement from './Pages/Admin/UsersManagement/UsersManagement';
import InstructorsManagement from './Pages/Admin/InstructorsManagement/InstructorsManagement';
import Err404 from './Pages/Err404/Err404';
import FooterBar from './Components/FooterBar/FooterBar';
import CourseDetails from './Components/CourseDetails/CourseDetails';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      bg: '#1976d2',
      navText: '#ffffff',
      contentText: '#000000'
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      bg: '#000000',
      navText: '#ffffff',
      contentText: '#ffffff',
    },
  },
});

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme.palette.mode === 'light' ? darkTheme : lightTheme);
  };

  const directions = useSelector((state) => state.Localization.direction);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        id="APP"
        dir={directions}
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <BrowserRouter>
          <Navbar toggleTheme={toggleTheme} />

          <div id="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Dashboard />} />
                <Route path="courses" element={<CoursesManagement />} />
                <Route path="courses/add" element={<CourseForm />} />
                <Route path="courses/edit/:id" element={<CourseForm />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="instructors" element={<InstructorsManagement />} />

                {/* <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} /> */}
              </Route>

              <Route path="*" element={<Err404 />}></Route>
            </Routes>
          </div>

          <FooterBar />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
