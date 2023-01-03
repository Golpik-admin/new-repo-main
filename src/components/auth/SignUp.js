import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .MuiFormControl-root:first-of-type {
    margin-right: 25px;
  }
  // &.forgot-pas-wrap {
  //   padding: ${(props) => props.theme.spacing(7, 0, 10, 0)};
  // }
  // .MuiFormControlLabel-label {
  //   font-size: 15px;
  //   color: #43425d;
  // }
  // a {
  //   color: #43425d;
  //   font-size: 15px;
  // }
  button {
    width: 170px;
    font-size: 18px;
    &.back-btn {
      border-color: #1b202a;
      color: #1b202a;
    }
    &.next-btn {
      background: #2b75fd;
    }
  }
`;

function SignUp(props) {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required("First name is required"),
        lastName: Yup.string().max(255).required("Last name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Must be at least 8 characters")
          .max(255)
          .required("Required"),
        confirmPassword: Yup.string().when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
          ),
        }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          props.handleNextChange();
          // signUp(
          //   values.email,
          //   values.password,
          //   values.firstName,
          //   values.lastName
          // );

          // navigate("/auth/sign-in");
        } catch (error) {
          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={1} severity="warning">
              {errors.submit}
            </Alert>
          )}
          {props.activeStep === 0 && (
            <>
              <Div>
                <TextField
                  type="text"
                  name="firstName"
                  label="First name"
                  value={values.firstName}
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                  variant="standard"
                />
                <TextField
                  type="text"
                  name="lastName"
                  label="Last name"
                  value={values.lastName}
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                  variant="standard"
                />
              </Div>
              <TextField
                type="text"
                name="userName"
                label="Username"
                value={values.userName}
                error={Boolean(touched.userName && errors.userName)}
                fullWidth
                helperText={touched.userName && errors.userName}
                onBlur={handleBlur}
                onChange={handleChange}
                my={3}
                variant="standard"
              />
              <TextField
                type="email"
                name="email"
                label="Email address"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                my={3}
                variant="standard"
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                my={3}
                variant="standard"
              />
              <TextField
                type="password"
                name="confirmPassword"
                label="Confirm password"
                value={values.confirmPassword}
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                fullWidth
                helperText={touched.confirmPassword && errors.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                my={3}
                variant="standard"
              />
              <FormControlLabel
                sx={{ pt: 5, pb: 10 }}
                control={<Checkbox value="remember" color="primary" />}
                label="I agree with terms and conditions"
              />
            </>
          )}
          {props.activeStep === 1 && <>Ymeeen</>}
          <Div className="btn-wrap">
            <Button
              type="submit"
              variant="outlined"
              disabled={isSubmitting}
              size="large"
              className="back-btn"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              size="large"
              className="neck-btn"
            >
              Next
            </Button>
          </Div>
          {/* <div align="right">
            <Button
              align="right"
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              size="large"
            >
              Sign up
            </Button>
          </div> */}
        </form>
      )}
    </Formik>
  );
}

export default SignUp;
