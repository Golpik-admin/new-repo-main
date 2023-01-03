import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { Button } from "@mui/material";

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function HelpCenter() {
  return (
    <React.Fragment>
      <Helmet title="Orders" />

      <Div>
        <div className="wrap">
          <img
            src="/static/img/avatars/user.png"
            className="center w-full bg-cover object-cover"
            alt=""
          />
          <div align="center">
            <Button variant="contained">ADD POSITIONS</Button>
          </div>
        </div>
      </Div>
    </React.Fragment>
  );
}

export default HelpCenter;
