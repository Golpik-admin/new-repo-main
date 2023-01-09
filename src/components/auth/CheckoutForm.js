import { Button, CircularProgress } from "@mui/material";
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

  const handleSubmitSub = async (event) => {
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
          price: true,
        })
      );
      setIsLoading(false);
      console.log(result.error.message);
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
                price: true,
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
                        price: true,
                      })
                    );
                    setIsLoading(false);
                    console.log(JSON.stringify(response.data));
                  })
                  .catch(function (error) {
                    dispatch(
                      setMesssage({
                        message:
                          error.response.data.description +
                          ". Contact your administrator please.",
                        type: "error",
                        code: error.response.data.statusCode,
                        price: true,
                      })
                    );
                    setIsLoading(false);
                    console.log(error.response.data.description);
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
      <CardElement />
      <Button variant="contained" color="primary" onClick={handleSubmitSub}>
        Pay {props.price ?? "0.00"}
      </Button>
    </>
  );
};

export default CheckoutForm;
