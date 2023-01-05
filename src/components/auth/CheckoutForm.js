import { Button } from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

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
            `https://api.stripe.com/v1/subscriptions?customer=${data.id}&items[0][price]=${props.lastSegment}`,
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
              console.log("SUBSCRIPTION FETCHED");
              console.log(data);
            });
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
