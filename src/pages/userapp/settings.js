import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Paper as MuiPaper,
  Typography,
  LinearProgress as MuiLinearProgress,
  CircularProgress as MuiCircularProgress,
  Button,
  TextField as MuiTextField,
  Alert as MuiAlert,
  Checkbox,
  Switch,
  Radio,
  RadioGroup,
  FormControlLabel,
  Input,
} from "@mui/material";
import { fetchSettings, filters } from "../../redux/slices/getSettings";
import {
  updateFetchedSettings,
  updateFilters,
} from "../../redux/slices/updateSettings";
import * as Yup from "yup";
import { Formik } from "formik";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function Settings() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  var User_Id = user.id;
  console.log(User_Id);
  useEffect(() => {
    dispatch(fetchSettings({ User_Id }));
  }, []);

  const getSettings_val = useSelector((state) => state.fetchSettingsList);

  const navigate = useNavigate();
  const LinearProgress = styled(MuiLinearProgress)(spacing);
  return (
    <React.Fragment>
      <Helmet title="Settings" />
      {getSettings_val.loading && <LinearProgress />}
      {!getSettings_val.loading ? (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Formik
              initialValues={{
                firstName: "",
                email: "",
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
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              )}
            </Formik>
          </Grid>

          <Grid item xs={12} sm={6} md={8} lg={8}>
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
                  <Grid justifyContent="space-between" container spacing={10}>
                    <Grid item xs={12} sm={6} md={4} lg={6}>
                      <Input
                        type="hidden"
                        name="User_Meta_Id"
                        placeholder="HIDDEN VALUE"
                        value={values.User_Meta_Id}
                        error={Boolean(
                          touched.User_Meta_Id && errors.User_Meta_Id
                        )}
                        helperText={touched.User_Meta_Id && errors.User_Meta_Id}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        my={3}
                      />
                      <Checkbox
                        name="DefaultExpiry"
                        label="DefaultExpiry"
                        checked={
                          values.DefaultExpiry != "undefined" &&
                          values.DefaultExpiry
                            ? true
                            : false
                        }
                        error={Boolean(
                          touched.DefaultExpiry && errors.DefaultExpiry
                        )}
                        fullWidth
                        helperText={
                          touched.DefaultExpiry && errors.DefaultExpiry
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        my={3}
                      />
                      Expiry will be least 7 days out (default)
                      <Grid
                        spacing={10}
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          Set expiry days to this many days in the future
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          <TextField
                            type="text"
                            name="ExpiryCalculation"
                            placeholder="Expiry Calculation"
                            value={values.ExpiryCalculation}
                            error={Boolean(
                              touched.ExpiryCalculation &&
                                errors.ExpiryCalculation
                            )}
                            helperText={
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
                          values.DefaultStrike != "undefined" &&
                          values.DefaultStrike
                            ? true
                            : false
                        }
                        error={Boolean(
                          touched.DefaultStrike && errors.DefaultStrike
                        )}
                        fullWidth
                        helperText={
                          touched.DefaultStrike && errors.DefaultStrike
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        my={3}
                      />
                      Strike price will be near the money(default)
                      <Grid
                        spacing={10}
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          Set strike price +/- percentage points from current
                          ticker price
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          <TextField
                            type="text"
                            name="StrikeCalculation"
                            placeholder="Strike Calculation"
                            value={values.StrikeCalculation}
                            error={Boolean(
                              touched.StrikeCalculation &&
                                errors.StrikeCalculation
                            )}
                            helperText={
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
                  <Grid spacing={10} container justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={4} lg={6}>
                      <Grid
                        spacing={10}
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          Risk Management Scope:
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={6}>
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
                                values.Scope != null && values.Scope == 1
                                  ? true
                                  : false
                              }
                              label="All positions on my account"
                            />
                            <FormControlLabel
                              value="0"
                              control={<Radio />}
                              checked={
                                values.Scope != null && values.Scope == 0
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
                          values.TestMode != "undefined" && values.TestMode
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default Settings;
