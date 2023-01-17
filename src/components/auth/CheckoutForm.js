import { Button, CircularProgress, Box as MuiBox } from "@mui/material";
import styled from "@emotion/styled";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth0Config, stripeapiEndpoint, stripeSecretKey } from "../../config";
import { setMesssage } from "../../redux/slices/messageSlice";

const CheckoutForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const Box = styled(MuiBox)`
    .stripe-cus {
      padding: 10px 0 5px;
      //border-radius: 4px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      margin: 10px 0;
      .CardField-child {
        background: #000;
      }
      .InputContainer {
        .InputElement {
          border-bottom: 1px solid #000;
        }
      }
    }
    .pay-btn {
      //width: 170px;
      background: #2b75fd;
      font-size: 16px;
      height: 35px;
    }
    .back-btn {
      width: 170px;
      border: 1px solid #1b202a;
      border-radius: 4px;
      font-size: 18px;
      height: 44px;
      display: flex;
      flex-grow: 0;
      align-items: center;
      justify-content: center;
      color: #43425d;
    }
  `;

  const handleSubmitSub = async (event) => {
    if (props.inputValues.email === "") {
      props.handleSubmit();
      return false;
    }
    setIsLoading(true);
    if (!stripe || !elements) {
      setIsLoading(false);
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: props.inputValues.email,
      },
    });

    if (result.error) {
      dispatch(
        setMesssage({
          message: result.error.message,
          type: "error",
          code: 404,
          // price: true,
        })
      );
      setIsLoading(false);
    } else {
      fetch(
        `${stripeapiEndpoint}/customers?email=${props.inputValues.email}&payment_method=${result.paymentMethod.id}&invoice_settings[default_payment_method]=${result.paymentMethod.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error && data.error.code) {
            dispatch(
              setMesssage({
                message: data.error.message,
                type: "error",
                code: 402,
                // price: true,
              })
            );
            setIsLoading(false);
            return;
          } else {
            fetch(
              `${stripeapiEndpoint}/subscriptions?customer=${data.id}&items[0][price]=${props.lastSegment}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${stripeSecretKey}`,
                },
              }
            )
              .then((res) => res.json())
              .then((final) => {
                var signupData = JSON.stringify({
                  username: props.inputValues.username,
                  email: props.inputValues.email,
                  password: props.inputValues.password,
                  connection: "Username-Password-Authentication",
                  user_metadata: {
                    stripe: JSON.stringify(final.plan),
                    priceMetaData: JSON.stringify(props.priceMetaData),
                    productMetaData: JSON.stringify(props.productMetaData),
                  },
                  app_metadata: {
                    plan: "full",
                  },
                });

                var config = {
                  method: "post",
                  url: `${auth0Config.domain}/dbconnections/signup`,
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: signupData,
                };

                axios(config)
                  .then(function (response) {
                    dispatch(
                      setMesssage({
                        message: "Registered Successfully",
                        type: "success",
                        code: 200,
                        // price: true,
                      })
                    );
                    setIsLoading(false);
                    if (response.code !== "invalid_signup") {
                      setTimeout(() => {
                        window.location.replace("/auth/sign-in");
                      }, 5000);
                    }
                  })
                  .catch(function (error) {
                    dispatch(
                      setMesssage({
                        message:
                          error.response.data.description +
                          ". Contact your administrator please.",
                        type: "error",
                        code: error.response.data.statusCode,
                        // price: true,
                      })
                    );
                    setIsLoading(false);
                  });
              });
          }
        });
    }
  };

  return (
    <>
      {isLoading && (
        <div align="center">
          <CircularProgress color="secondary" />
        </div>
      )}
      <div
        style={{
          margin: "20px 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
          padding: "10px 0 5px",
        }}
      >
        <CardElement
          className="stripe-cus"
          options={{ hidePostalCode: true }}
        />
      </div>
      <Box>
        {props.children}
        <Box mt={7} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            onClick={handleSubmitSub}
            fullWidth
            className="pay-btn"
          >
            Signup
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutForm;
