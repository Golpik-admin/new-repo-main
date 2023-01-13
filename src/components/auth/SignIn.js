import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
//import { Link } from "react-router-dom";
import { Link } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.forgot-pas-wrap {
    padding: ${(props) => props.theme.spacing(7, 0, 10, 0)};
  }
  .MuiFormControlLabel-label {
    font-size: 15px;
    color: #43425d;
  }
  a {
    color: #43425d;
    font-size: 15px;
  }
  button {
    width: 170px;
    background: #2b75fd;
    font-size: 18px;
  }
  .signup-btn {
    width: 170px;
    border: 1px solid #1b202a;
    border-radius: 4px;
    font-size: 18px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function SignIn() {
  const navigate = useNavigate();
  const {
    signIn,
    isAuthenticated,
    user,
    signOut,
    getUserInfo,
    getApiToken,
    getUserMeta,
  } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "demo@bootlab.io",
        password: "unsafepassword",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password);
          await getApiToken()
            .then(async (token) => {
              await getUserInfo().then(async (_user) => {
                const userId1 = _user.sub;
                await getUserMeta(token, userId1).then((response) => {
                  if (JSON.parse(response.user_metadata.stripe)) {
                    navigate("/dashboard");
                  } else {
                    signOut(true);
                    // console.log("logout");
                  }
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
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
          {/* <Alert mt={3} mb={3} severity="info">
            Use <strong>demo@golpik.com</strong> and{" "}
            <strong>safepassword</strong> to sign in
          </Alert> */}
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="text"
            name="email"
            label="Username"
            //value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            //helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
            variant="standard"
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            //value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            //helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
            variant="standard"
          />
          <Div className="forgot-pas-wrap">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link href="#" underline="none">
              Forgot Password
            </Link>
          </Div>
          <Div className="btn-wrap">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Login
            </Button>
            <Link href="/auth/sign-up" underline="none" className="signup-btn">
              Sign up
            </Link>
          </Div>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
