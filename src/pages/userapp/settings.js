import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Paper as MuiPaper,
  Button,
  TextField as MuiTextField,
  Alert as MuiAlert,
  Checkbox,
  Switch,
  Radio,
  RadioGroup,
  FormControlLabel,
  Input,
  LinearProgress as MuiLinearProgress,
  Typography,
} from "@mui/material";
import { fetchSettings } from "../../redux/slices/getSettings";
import { updateFetchedSettings } from "../../redux/slices/updateSettings";
import * as Yup from "yup";
import { Formik } from "formik";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth0Config } from "../../config";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)`
  input {
    padding: 10px;
  }
`;

const Box = styled.div`
  margin: 0 0 20px 0;
`;

const Paper = styled(MuiPaper)`
  padding: 24px;
  min-height: 440px;
  &.bot-paper {
    margin-top: 24px;
    min-height: 40px;
    .bold {
      font-weight: 900;
    }
  }
`;

function Settings() {
  const { user, getApiToken, getUserMeta, getUserInfo } = useAuth();
  const [stripe, setStripe] = useState(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const dispatch = useDispatch();
  var User_Id = user.id;
  useEffect(() => {
    if (User_Id) {
      dispatch(fetchSettings({ User_Id }));
      getApiToken()
        .then(async (token) => {
          await getUserInfo().then(async (_user) => {
            const userId1 = _user.sub;
            await getUserMeta(token, userId1).then((response) => {
              if (response.user_metadata && response.user_metadata.stripe) {
                setStripe(JSON.parse(response.user_metadata.stripe));
                setStripeLoading(false);
              } else {
                setStripeLoading(false);
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [User_Id]);

  const getSettings_val = useSelector((state) => state.fetchSettingsList);
  const updateSettings_val = useSelector(
    (state) => state.updateFetchedSettingsList
  );
  const navigate = useNavigate();
  const LinearProgress = styled(MuiLinearProgress)(spacing);

  const updateUserHandler = async (values) => {
    try {
      await fetch(`${auth0Config.domain}/api/v2/users/${user.id}`, {
        method: "patch",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: values.firstName,
          email: values.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("here", error);
    }
  };
  return (
    <React.Fragment>
      <Helmet title="Settings" />
      {getSettings_val.loading && <LinearProgress />}

      {updateSettings_val.message && (
        <Alert severity="success">{updateSettings_val.message}</Alert>
      )}
      {!getSettings_val.loading ? (
        <div>
          <Grid justifyContent="space-between" container spacing={6}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="cus-paper">
                <Box className="top-head">
                  <Typography variant="h5" fontWeight={700}>
                    Personal information
                  </Typography>
                  <Typography>
                    This information is private and never shared with anynone
                  </Typography>
                </Box>
                <Formik
                  initialValues={{
                    firstName: user.displayName,
                    email: user.email,
                    password: "",
                    submit: false,
                  }}
                  validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                      .max(255)
                      .required("First name is required"),
                    lastName: Yup.string()
                      .max(255)
                      .required("Last name is required"),
                    email: Yup.string()
                      .email("Must be a valid email")
                      .max(255)
                      .required("Email is required"),
                    password: Yup.string()
                      .min(12, "Must be at least 12 characters")
                      .max(255)
                      .required("Required"),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
                    try {
                      // submit api key
                      // signUp(values.email, values.password, values.firstName);
                      navigate("/auth/sign-in");
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
                      <Grid
                        justifyContent="space-between"
                        alignItems="center"
                        container
                        spacing={6}
                      >
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          Full Name
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} lg={8}>
                          <TextField
                            fullWidth
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            error={touched.firstName && errors.firstName}
                            helpertext={touched.firstName && errors.firstName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={3}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          Email
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} lg={8}>
                          <TextField
                            fullWidth
                            type="email"
                            name="email"
                            value={values.email}
                            error={touched.email && errors.email}
                            helpertext={touched.email && errors.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={3}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          Password
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} lg={8}>
                          <TextField
                            fullWidth
                            type="password"
                            name="password"
                            value={values.password}
                            error={!!(touched.password && errors.password)}
                            helpertext={touched.password && errors.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={3}
                          />
                        </Grid>
                        <Grid item xs={12} textAlign="end">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={() => updateUserHandler(values)}
                          >
                            Update
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={8} lg={8}>
              <Paper className="cus-paper">
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    Trading Options
                  </Typography>
                </Box>
                <Formik
                  initialValues={{
                    User_Meta_Id: getSettings_val.User_Meta_Id,
                    DefaultExpiry: getSettings_val.DefaultExpiry,
                    DefaultStrike: getSettings_val.DefaultStrike,
                    ExpiryCalculation: getSettings_val.ExpiryCalculation,
                    RiskManagementActive: getSettings_val.RiskManagementActive,
                    Scope: getSettings_val.Scope,
                    StrikeCalculation: getSettings_val.StrikeCalculation,
                    TestMode: getSettings_val.TestMode,
                    submit: false,
                  }}
                  validationSchema={Yup.object().shape({
                    DefaultExpiry: Yup.string().required(
                      "DefaultExpiry is required"
                    ),
                    DefaultStrike: Yup.string().required(
                      "DefaultStrike is required"
                    ),
                    ExpiryCalculation: Yup.string().required(
                      "ExpiryCalculation is required"
                    ),
                    RiskManagementActive: Yup.string().required(
                      "RiskManagementActive is required"
                    ),
                    Scope: Yup.string().required("Scope is required"),
                    StrikeCalculation: Yup.string().required(
                      "StrikeCalculation is required"
                    ),
                    TestMode: Yup.string().required("TestMode is required"),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
                    try {
                      // submit api key
                      // signUp(values.email, values.password, values.firstName);
                      dispatch(updateFetchedSettings({ User_Id, values }));
                      // navigate("settings");
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
                      <Grid
                        justifyContent="space-between"
                        container
                        sx={{ my: 3 }}
                        spacing={4}
                      >
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          <Input
                            type="hidden"
                            name="User_Meta_Id"
                            placeholder="HIDDEN VALUE"
                            value={values.User_Meta_Id}
                            error={touched.User_Meta_Id && errors.User_Meta_Id}
                            helpertext={
                              touched.User_Meta_Id && errors.User_Meta_Id
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={3}
                          />
                          <Checkbox
                            name="DefaultExpiry"
                            label="DefaultExpiry"
                            checked={
                              values.DefaultExpiry !== "undefined" &&
                              values.DefaultExpiry
                                ? true
                                : false
                            }
                            error={
                              touched.DefaultExpiry && errors.DefaultExpiry
                            }
                            helpertext={
                              touched.DefaultExpiry && errors.DefaultExpiry
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={3}
                          />
                          Expiry will be least 7 days out (default)
                          <Grid
                            spacing={6}
                            container
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                              Set expiry days to this many days in the future
                            </Grid>

                            <Grid item xs={12} sm={6} md={7} lg={8}>
                              <TextField
                                fullWidth
                                type="text"
                                name="ExpiryCalculation"
                                placeholder="Expiry Calculation"
                                value={values.ExpiryCalculation}
                                error={
                                  touched.ExpiryCalculation &&
                                  errors.ExpiryCalculation
                                }
                                helpertext={
                                  touched.ExpiryCalculation &&
                                  errors.ExpiryCalculation
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                                my={3}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          <Checkbox
                            name="DefaultStrike"
                            label="DefaultStrike"
                            checked={
                              values.DefaultStrike !== "undefined" &&
                              values.DefaultStrike
                                ? true
                                : false
                            }
                            error={
                              touched.DefaultStrike && errors.DefaultStrike
                            }
                            helpertext={
                              touched.DefaultStrike && errors.DefaultStrike
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={3}
                          />
                          Strike price will be near the money(default)
                          <Grid
                            spacing={6}
                            container
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                              Set strike price +/- percentage points from
                              current ticker price
                            </Grid>

                            <Grid item xs={12} sm={6} md={7} lg={8}>
                              <TextField
                                fullWidth
                                type="text"
                                name="StrikeCalculation"
                                placeholder="Strike Calculation"
                                value={values.StrikeCalculation}
                                error={
                                  touched.StrikeCalculation &&
                                  errors.StrikeCalculation
                                }
                                helpertext={
                                  touched.StrikeCalculation &&
                                  errors.StrikeCalculation
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                                my={3}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        sx={{ my: 3 }}
                        spacing={6}
                        container
                        justifyContent="space-between"
                      >
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          <Grid
                            spacing={10}
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                              Risk Management Scope:
                            </Grid>

                            <Grid item xs={12} sm={6} md={7} lg={8}>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="1"
                                name="Scope"
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  value="1"
                                  control={<Radio />}
                                  checked={
                                    values.Scope != null && values.Scope === 1
                                      ? true
                                      : false
                                  }
                                  label="All positions on my account"
                                />
                                <FormControlLabel
                                  value="0"
                                  control={<Radio />}
                                  checked={
                                    values.Scope != null && values.Scope === 0
                                      ? true
                                      : false
                                  }
                                  label="Only positions traded via optionize"
                                />
                              </RadioGroup>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          <Checkbox
                            onChange={handleChange}
                            name="RiskManagementActive"
                            checked={values.RiskManagementActive ? true : false}
                          />
                          Enable Risk-Manager (require subscription)
                        </Grid>
                      </Grid>

                      <Grid>
                        <Grid>
                          Alerts test mode
                          <Switch
                            onChange={handleChange}
                            name="TestMode"
                            checked={
                              values.TestMode !== "undefined" && values.TestMode
                                ? true
                                : false
                            }
                          />
                        </Grid>
                        <Grid textAlign="end">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                          >
                            Update
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Paper>
            </Grid>
          </Grid>

          {stripeLoading && <LinearProgress />}

          <Grid justifyContent="space-between" container spacing={6}>
            <Grid item xs={12}>
              <Paper className="bot-paper">
                <Box className="bot-head">
                  <Typography variant="h5" fontWeight={700}>
                    Subscripions
                  </Typography>
                </Box>
                {!stripe && (
                  <Grid justifyContent="space-between" container spacing={6}>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                      <span className="bold">No Subscripions Found</span>
                    </Grid>
                  </Grid>
                )}
                {stripe && (
                  <Grid justifyContent="space-between" container spacing={6}>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                      Plan: &nbsp; &nbsp;{" "}
                      <span className="bold">{stripe.interval}</span>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                      Amount: &nbsp; &nbsp; ${stripe.amount / 100}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={6}>
                      Subscripion ID: &nbsp; &nbsp; {stripe.id}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} textAlign="end">
                      <Button variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default Settings;
