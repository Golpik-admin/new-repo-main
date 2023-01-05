import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";
import CheckoutForm from "./CheckoutForm";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const stripePromise = loadStripe(
  "pk_test_51MM69wGXz5lpWMAzcJNQoiJapngI1csaPZCy3jeF3aAl3BJaHlMEaX0shhDLqb6h9z8dQd6dVB1OAMugZ8LFD38a0093VFqXqR"
);
function SignUp(props) {
  const [price, setPrice] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState(0);
  const location = useLocation();

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const lastSegment = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    async function verifyPriceId() {
      try {
        await fetch(`https://api.stripe.com/v1/prices/${lastSegment}`, {
          method: "get",
          headers: {
            Authorization:
              "Bearer sk_test_51Ko46QD5TFKDpVFgNvqiftob3CuxQwkbJFFO7LOFEu0uYLYEPGQFmIIfs4svqyXx7IuUaGBayEowmBOv0IHlfoLZ00eacu4TyC",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error && data.error.code) {
              console.log("fail");
              return;
            }
            if (data.type === "recurring") {
              setSubscriptionType(data.recurring.interval);
            }
            setPrice(currencyFormat(data.unit_amount / 100));
          })
          .catch((err) => {
            console.log(err.error.error);
          });
      } catch (error) {
        console.log("here", error);
      }
    }

    verifyPriceId();

    // Create setupintent as soon as the page loads
    // fetch("https://api.stripe.com/v1/payment_intents?amount=100&currency=usd", {
    //   method: "POST",
    //   headers: {
    //     Authorization:
    //       "Bearer sk_test_51MM69wGXz5lpWMAzFMPcUxatATx5B2Al7RUZmPUva4JgrNTBJ5xHfNHdVbstD5XnwIU0K1HyXKkznWaidpCpyoXH00TLZPXnwx",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setClientSecret(data.client_secret);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const { signUp } = useAuth();

  return (
    <>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              </>
            )}
            {props.activeStep === 1 && (
              <>
                <Elements stripe={stripePromise}>
                  <CheckoutForm lastSegment={lastSegment} price={price} />
                </Elements>
              </>
            )}
          </form>
        )}
      </Formik>
    </>
  );
}

export default SignUp;
