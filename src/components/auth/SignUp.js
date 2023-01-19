import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Alert as MuiAlert,
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CircularProgress,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

import CheckoutForm from "./CheckoutForm";
import {
  stripePublishKey,
  stripeSecretKey,
  stripeapiEndpoint,
} from "../../config";
import { useDispatch } from "react-redux";
import { setMesssage } from "../../redux/slices/messageSlice";
import { useSelector } from "react-redux";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Card = styled(MuiCard)`
  margin-top: 40px;
  .heading {
    background: #a52c65;
    text-align: center;
    padding: 10px 0;
    color: #fff;
  }
  .price {
    color: #7e84a3;
    font-size: 28px;
  }
`;

const stripePromise = loadStripe(`${stripePublishKey}`);
function SignUp(props) {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const messages = useSelector((state) => state.messageState);

  const [priceMetaData, setPriceMetaData] = useState();
  const [productMetaData, setProductMetaData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
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
        await fetch(`${stripeapiEndpoint}/prices/${lastSegment}`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error && data.error.code) {
              setIsLoading(true);
              dispatch(
                setMesssage({
                  message: data.error.message,
                  type: "error",
                  code: 404,
                  price: false,
                })
              );
              return;
            }
            if (data.recurring !== null) {
              setIsLoading(false);
              setPriceMetaData({
                billing_scheme: data.billing_scheme,
                created: data.created,
                currency: data.currency,
                id: data.id,
                product: data.product,
                recurring: data.recurring,
                unit_amount: data.unit_amount,
              });
              setPrice(currencyFormat(data.unit_amount / 100));
              fetch(`${stripeapiEndpoint}/products/${data.product}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${stripeSecretKey}`,
                },
              })
                .then((res) => res.json())
                .then((product) => {
                  setProductMetaData({
                    created: product.created,
                    default_price: product.default_price,
                    description: product.description,
                    id: product.id,
                    metadata: product.metadata,
                    name: product.name,
                    type: product.type,
                    updated: product.updated,
                  });
                  dispatch(
                    setMesssage({
                      type: "",
                      message: "",
                      code: "",
                      price: currencyFormat(data.unit_amount / 100),
                      product: product,
                      recurringInterval: data.recurring.interval,
                      recurringIntervalCount: data.recurring.interval_count,
                    })
                  );
                });
            } else {
              setIsLoading(true);
              dispatch(
                setMesssage({
                  message: "Price type is not recurring",
                  type: "error",
                  code: 404,
                  price: false,
                })
              );
              return;
            }
          })
          .catch((err) => {
            console.log(err.error.error);
          });
      } catch (error) {
        console.log("here", error);
      }
    }

    verifyPriceId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && (
        <div align="center">
          <CircularProgress color="secondary" />
        </div>
      )}
      {!isLoading && (
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            submit: false,
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(255).required("First name is required"),
            lastName: Yup.string().max(255).required("Last name is required"),
            username: Yup.string().max(255).required("Username is required"),
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string()
              .min(8, "Must be at least 8 characters")
              .max(255)
              .required("Required"),
            confirmPassword: Yup.string()
              .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref("password")],
                  "Both password need to be the same"
                ),
              })
              .required("Required"),
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
              {true && (
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
                    sx={{ width: "46%", mr: "8%" }}
                    variant="standard"
                    className="f-name"
                  />
                  <TextField
                    sx={{ width: "46%" }}
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
                    className="l-name"
                  />
                  <TextField
                    type="text"
                    name="username"
                    label="Username"
                    value={values.username}
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={touched.username && errors.username}
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
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={3}
                    variant="standard"
                  />

                  <Card variant="outlined">
                    {/* <CardActionArea> */}
                    <Typography gutterBottom variant="h3" className="heading">
                      {messages?.product?.name}
                    </Typography>
                    <CardContent>
                      <Typography
                        align="center"
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        <span className="price">{messages?.price} /</span>
                        {messages?.recurringInterval === "month"
                          ? " Monthly"
                          : " Annually"}{" "}
                      </Typography>
                      <Elements stripe={stripePromise}>
                        <CheckoutForm
                          handleSubmit={handleSubmit}
                          inputValues={values}
                          lastSegment={lastSegment}
                          price={price}
                          priceMetaData={priceMetaData}
                          productMetaData={productMetaData}
                        ></CheckoutForm>
                      </Elements>
                    </CardContent>
                    {/* </CardActionArea> */}
                  </Card>
                </>
              )}
            </form>
          )}
        </Formik>
      )}
    </>
  );
}

export default SignUp;
