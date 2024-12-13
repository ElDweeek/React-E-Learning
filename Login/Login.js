
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the credentials match any user
    const user = users.find(user => user.email === values.email && user.password === values.password);

    if (user) {
      console.log('Login successful');
      sessionStorage.setItem('isLoggedIn', 'true'); // Set logged in status
      onLogin(); // Notify App of successful login
      navigate('/'); // Redirect to the home page
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center mb-4">Login</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center mb-3">
            {errorMessage}
          </div>
        )}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <Field type={showPassword ? 'text' : 'password'} name="password" className="form-control" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-outline-secondary"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={() => navigate('/register')}>
            Don't have an account? Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;



