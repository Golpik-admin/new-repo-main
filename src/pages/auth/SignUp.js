import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Alert, Button, Link, Typography } from "@mui/material";

// import { ReactComponent as Logo } from "../../vendor/logo.svg";

import Stepper from "../../pages/auth/stepper";
import { useSelector } from "react-redux";

// const Brand = styled(Logo)`
//   fill: ${(props) => props.theme.palette.primary.main};
//   width: 64px;
//   height: 64px;
//   margin-bottom: 32px;
// `;

const Wrapper = styled.div`
  max-width: 400px;
  margin: auto;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing(5, 0)};
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // right: 0;
  a {
    color: #1b202a;
  }
`;

function SignUp() {
  const messages = useSelector((state) => state.messageState);

  return (
    <React.Fragment>
      {messages.type !== "" && messages.code !== "" && (
        <>
          <Alert severity={messages.type}>
            <span>{messages.message}</span>
          </Alert>
          {messages.type !== "" &&
            messages.code !== "" &&
            messages.price === false && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                href="https://optionize.webflow.io/pricing/price-plan"
              >
                Return to website
              </Button>
            )}
        </>
      )}
      {/* <Brand /> */}
      <>
        <Typography
          component="h1"
          fontSize="39px"
          variant="h1"
          align="center"
          gutterBottom
        >
          <em>
            <strong>Optionize</strong>
          </em>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ fontSize: 18, color: "rgba(77,79,92,0.5)", fontWeight: 300 }}
        >
          Please complete to create your account.
        </Typography>

        <Wrapper>
          <Helmet title="Sign Up" />
          <Stepper />
        </Wrapper>
        <Div className="footer-wrap">
          <Link href="#" underline="none" paddingRight={2}>
            Term of use.
          </Link>
          <Link href="#" underline="none">
            Privacy Policy
          </Link>
        </Div>
      </>
    </React.Fragment>
  );
}

export default SignUp;
