import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Typography, Link } from "@mui/material";

// import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignInComponent from "../../components/auth/SignIn";

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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  a {
    color: #1b202a;
  }
`;
function SignIn() {
  return (
    <React.Fragment>
      {/* <Brand /> */}
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
        Welcome back! Please login to your account.
      </Typography>
      <Wrapper>
        <Helmet title="Sign In" />
        {/* <Typography component="h2" variant="h4" align="center" gutterBottom>
          Welcome back, Lucy!
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Sign in to your account to continue
        </Typography> */}

        <SignInComponent />
      </Wrapper>
      <Div className="footer-wrap">
        <Link href="#" underline="none" paddingRight={2}>
          Term of use.
        </Link>
        <Link href="#" underline="none">
          Privacy Policy
        </Link>
      </Div>
    </React.Fragment>
  );
}

export default SignIn;
