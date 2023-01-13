import React from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

import { CssBaseline, Grid } from "@mui/material";

import Settings from "../components/Settings";
import GlobalStyle from "../components/GlobalStyle";

const Root = styled.div`
  @media (min-width: 960px) {
    //max-width: 520px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    display: flex;
    min-height: 100%;
    flex-direction: column;
    background: url("/static/img/screenshots/auth-bg.png");
    background-size: 50% 100%;
    background-repeat: no-repeat;
    background-position: left center;
  } ;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Auth = ({ children }) => {
  return (
    <Root>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <div className="auth-bg"></div>
        </Grid>
        <Grid item sm={12} md={6} position="relative">
          <Div className="auth-box-wrap">
            <div>
              <CssBaseline />
              <GlobalStyle />
              {children}
              <Outlet />
              <Settings />
            </div>
          </Div>
        </Grid>
      </Grid>
    </Root>
  );
};

export default Auth;
