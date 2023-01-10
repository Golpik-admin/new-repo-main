import {
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
  Box as MuiBox,
  Link,
} from "@mui/material";
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
      .CardField-child{
        background:#000;
      }
      .InputContainer {
        .InputElement {
          backgroung
          border-bottom: 1px solid #000;
        }
      }
    }
    .pay-btn {
      width: 170px;
      background: #2b75fd;
      font-size: 18px;
      height:44px;
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
                    product: "",
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
                        // price: true,
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
      <div
        style={{
          margin: "30px 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
          padding: "10px 0 5px",
        }}
      >
        <CardElement className="stripe-cus" />
      </div>
      <Box>
        {/* <Autocomplete
          fullWidth
          id="combo-box-demo"
          options={["Monthly", "Yearly"]}
          renderInput={(params) => (
            <TextField {...params} label="Pro+ " variant="standard" />
          )}
        />
        <TextField
          type="text"
          name="username"
          label="Full Name"
          value={props.inputValues.firstName + " " + props.inputValues.lastName}
          //error={Boolean(touched.username && errors.username)}
          fullWidth
          //helperText={touched.username && errors.username}
          //onBlur={handleBlur}
          //onChange={handleChange}
          sx={{ my: "15px" }}
          variant="standard"
        /> */}
        <Box mt={12} display="flex" justifyContent="space-between">
          {/* <Link href="#" underline="none" className="back-btn">
            Back
          </Link> */}
          <Button variant="contained" onClick={handleSubmitSub} fullWidth>
            Pay {props.price ?? "0.00"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];
export default CheckoutForm;
