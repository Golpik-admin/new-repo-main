import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@mui/material";

// import { ReactComponent as Logo } from "../../vendor/logo.svg";

import Stepper from "../../pages/auth/stepper";

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

function SignUp() {
  return (
    <React.Fragment>
      {/* <Brand /> */}
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        <em>
          <strong>Consilience</strong> Trading
        </em>
      </Typography>
      <Wrapper>
        <Helmet title="Sign Up" />
        <Stepper />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignUp;
