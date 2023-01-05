import { Button } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
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
        email: "email@email.com",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      fetch(
        `https://api.stripe.com/v1/customers?email=email@email.com&payment_method=${result.paymentMethod.id}&invoice_settings[default_payment_method]=${result.paymentMethod.id}`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer sk_test_51MM69wGXz5lpWMAzFMPcUxatATx5B2Al7RUZmPUva4JgrNTBJ5xHfNHdVbstD5XnwIU0K1HyXKkznWaidpCpyoXH00TLZPXnwx",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("CUSTOMER FETCHED");
          console.log(data);
          fetch(
            `https://api.stripe.com/v1/subscriptions?customer=${data.id}&items[0][price]=price_1MMW6VGXz5lpWMAzeAd43OJW`,
            {
              method: "POST",
              headers: {
                Authorization:
                  "Bearer sk_test_51MM69wGXz5lpWMAzFMPcUxatATx5B2Al7RUZmPUva4JgrNTBJ5xHfNHdVbstD5XnwIU0K1HyXKkznWaidpCpyoXH00TLZPXnwx",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // const status =
              //   subscription["latest_invoice"]["payment_intent"]["status"];
              // const client_secret =
              //   subscription["latest_invoice"]["payment_intent"][
              //     "client_secret"
              //   ];
              console.log("SUBSCRIPTION FETCHED");
              console.log(data);
              // console.log(status, client_secret);

              // if (status === "requires_action") {
              //   console.log("condition k andar");
              //   console.log(status);
              //   // stripe.confirmCardPayment(client_secret).then(function (result) {
              //   //   if (result.error) {
              //   //     console.log("There was an issue!");
              //   //     console.log(result.error);
              //   //     // Display error message in your UI.
              //   //     // The card was declined (i.e. insufficient funds, card has expired, etc)
              //   //   } else {
              //   //     console.log("You got the money!");
              //   //     // Show a success message to your customer
              //   //   }
              //   // });
              // } else {
              //   console.log("You got the money!");
              //   // No additional information was needed
              //   // Show a success message to your customer
              // }
            });
        });
    }
  };

  return (
    <>
      <CardElement />
      <Button variant="contained" color="primary" onClick={handleSubmitSub}>
        Subscription
      </Button>
    </>
  );
};

export default CheckoutForm;
