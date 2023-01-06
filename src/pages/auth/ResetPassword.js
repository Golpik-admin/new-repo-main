import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Typography } from "@mui/material";

// import { ReactComponent as Logo } from "../../vendor/logo.svg";
import ResetPasswordComponent from "../../components/auth/ResetPassword";

// const Brand = styled(Logo)`
//   fill: ${(props) => props.theme.palette.primary.main};
//   width: 64px;
//   height: 64px;
//   margin-bottom: 32px;
// `;

const Wrapper = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(5)};
  }
`;

function ResetPassword() {
  return (
    <React.Fragment>
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
        Enter your email and we send you a password reset link.
      </Typography>
      <Wrapper>
        <Helmet title="Reset Password" />

        <ResetPasswordComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default ResetPassword;
