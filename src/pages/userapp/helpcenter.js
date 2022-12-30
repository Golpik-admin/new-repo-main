import React from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Typography } from "@mui/material";
function HelpCenter() {
  return (
    <React.Fragment>
      <Helmet title="Orders" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            HelpCenter
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default HelpCenter;
