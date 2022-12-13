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
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function Settings() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Helmet title="Settings" />

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
              lastName: Yup.string().max(255).required("Last name is required"),
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
              firstName: "",
              email: "",
              password: "",
              submit: false,
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .max(255)
                .required("First name is required"),
              lastName: Yup.string().max(255).required("Last name is required"),
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
                <Grid justifyContent="space-between" container spacing={10}>
                  <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Checkbox
                      name="DefaultExpiry"
                      label="DefaultExpiry"
                      value={values.DefaultExpiry}
                      error={Boolean(
                        touched.DefaultExpiry && errors.DefaultExpiry
                      )}
                      fullWidth
                      helperText={touched.DefaultExpiry && errors.DefaultExpiry}
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
                          label="Expiry Calculation"
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
                      value={values.DefaultStrike}
                      error={Boolean(
                        touched.DefaultStrike && errors.DefaultStrike
                      )}
                      fullWidth
                      helperText={touched.DefaultStrike && errors.DefaultStrike}
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
                          name="strikeCalculation"
                          label="Strike Calculation"
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
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="All positions on my account"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Only positions traded via optionize"
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Checkbox /> Enable Risk-Manager (require subscription)
                  </Grid>
                </Grid>

                <Grid>
                  <Grid>
                    Alerts test mode
                    <Switch />
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
    </React.Fragment>
  );
}

export default Settings;
