import { Button } from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { stripeSecretKey } from "../../config";

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
        `https://api.stripe.com/v1/customers?email=${props.inputValues.email}&payment_method=${result.paymentMethod.id}&invoice_settings[default_payment_method]=${result.paymentMethod.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("CUSTOMER FETCHED");
          console.log(data);
          fetch(
            `https://api.stripe.com/v1/subscriptions?customer=${data.id}&items[0][price]=${props.lastSegment}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${stripeSecretKey}`,
              },
            }
          )
            .then((res) => res.json())
            .then((final) => {
              console.log("SUBSCRIPTION FETCHED");
              console.log(final);

              var signupData = JSON.stringify({
                username: props.inputValues.email,
                email: props.inputValues.email,
                password: props.inputValues.password,
                connection: "Username-Password-Authentication",
                user_metadata: {
                  stripe: final,
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
                  Cookie:
                    "did=s%3Av0%3A9fdd5ad0-8862-11ed-809d-05818795b0f9.4wNPEJ7Ces%2F9WiEiv2lUgkEb0MTes1KF3AZ%2BLGvfH3I; did_compat=s%3Av0%3A9fdd5ad0-8862-11ed-809d-05818795b0f9.4wNPEJ7Ces%2F9WiEiv2lUgkEb0MTes1KF3AZ%2BLGvfH3I",
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
        Pay {props.price}
      </Button>
    </>
  );
};

export default CheckoutForm;
