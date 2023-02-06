import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
//import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Button,
  // TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";
import { auth0Config, stripeapiEndpoint, stripeSecretKey } from "../../config";
import axios from "axios";

const Alert = styled(MuiAlert)(spacing);

// const TextField = styled(MuiTextField)(spacing);

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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { signIn, signOut, getUserInfo, getApiToken, getUserMeta } = useAuth();

  const queryParameters = new URLSearchParams(window.location.search);
  const checkout_session_id = queryParameters.get("session");
  const subscription = queryParameters.get("subscription");
  useEffect(() => {
    if (checkout_session_id) {
      console.log(checkout_session_id);
      fetch(`${stripeapiEndpoint}/checkout/sessions/${checkout_session_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
      })
        .then((res) => res.json())
        .then((final) => {
          console.log(final);
          getApiToken()
            .then(async (token) => {
              await getUserInfo().then(async (_user) => {
                const userId1 = _user.sub;
                await getUserMeta(token, userId1).then((response) => {
                  if (response.user_metadata && response.user_metadata.stripe) {
                    navigate("/dashboard");
                  } else {
                    console.log(token);
                    var data = JSON.stringify({
                      user_metadata: {
                        stripe: final,
                      },
                    });

                    var config = {
                      method: "patch",
                      url: `${auth0Config.domain}/api/v2/users/${userId1}`,
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                      data: data,
                    };

                    axios(config)
                      .then(function (response) {
                        console.log(JSON.stringify(response.data));

                        navigate("/dashboard");
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } else {
      setIsLoading(false);
    }
    // signIn();
    // if (!subscription) {
    //   setIsLoading(true);
    // }
  }, []);

  return (
    <>
      {isLoading && (
        <div align="center">
          <CircularProgress color="secondary" />
          {/* {!subscription && !checkout_session_id && (
            <>
              <Alert severity="error">
                <span>No Subscription Found</span>
              </Alert>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                href="https://optionize.webflow.io/pricing/price-plan"
              >
                Return to website
              </Button>
            </>
          )} */}
        </div>
      )}
      {!isLoading && (
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
                  console.log(token);
                  await getUserInfo()
                    .then(async (_user) => {
                      const userId1 = _user.sub;
                      await getUserMeta(token, userId1)
                        .then((response) => {
                          if (
                            response.user_metadata &&
                            response.user_metadata.stripe
                          ) {
                            navigate("/dashboard");
                          } else {
                            if (subscription) {
                              // signOut(false);
                              window.location.replace(
                                `${subscription}?prefilled_email=${_user.email}&client_reference_id=${userId1}`
                              );
                            } else {
                              signOut(false);
                              // window.location.replace(
                              //   "https://optionize.webflow.io/pricing/price-plan"
                              // );
                            }
                          }
                        })
                        .catch((error) => {
                          signOut(false);
                          const message =
                            error.message || "Something went wrong";
                          setStatus({ success: false });
                          setErrors({ submit: message });
                          setSubmitting(false);
                          console.log(error);
                        });
                    })
                    .catch((error) => {
                      signOut(false);
                      const message = error.message || "Something went wrong";
                      setStatus({ success: false });
                      setErrors({ submit: message });
                      setSubmitting(false);
                      console.log(error);
                    });
                })
                .catch((error) => {
                  signOut(false);
                  const message = error.message || "Something went wrong";
                  setStatus({ success: false });
                  setErrors({ submit: message });
                  setSubmitting(false);
                  console.log(error);
                });
            } catch (error) {
              signOut(false);
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
              {/* <TextField
                type="text"
                name="email"
                label="Username"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
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
                my={2}
                variant="standard"
              /> */}
              {/* <Div className="forgot-pas-wrap">
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Link href="#" underline="none">
                  Forgot Password
                </Link>
              </Div> */}
              <Div className="btn-wrap">
                <CircularProgress />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <div>
                      Please Wait{" "}
                      <CircularProgress color="secondary" size="18px" />
                    </div>
                  )}
                  {!isSubmitting && "Login"}
                </Button>
                {/* <Link
                  href="/auth/sign-up"
                  underline="none"
                  className="signup-btn"
                >
                  Sign up
                </Link> */}
              </Div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
}

export default SignIn;
