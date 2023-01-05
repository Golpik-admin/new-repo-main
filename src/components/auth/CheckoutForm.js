import { Button } from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { stripeapiEndpoint, stripeSecretKey } from "../../config";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
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
                url: "https://dev-c37ss4t71trscecz.us.auth0.com/dbconnections/signup",
                headers: {
                  "Content-Type": "application/json",
                },
                data: signupData,
              };

              axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <CardElement />
      <Button variant="contained" color="primary" onClick={handleSubmitSub}>
        Pay {props.price ?? "0.00"}
      </Button>
    </>
  );
};

export default CheckoutForm;
