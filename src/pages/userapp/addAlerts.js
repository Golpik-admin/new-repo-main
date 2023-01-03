import React from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Typography } from "@mui/material";
function HelpCenter() {
  return (
    <React.Fragment>
      <Helmet title="Orders" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <img
            style={{ height: `calc(100% - 72px)` }}
            // src={meme.url}
            className="center w-full bg-cover object-cover"
            alt=""
          />
          <Typography variant="h3" gutterBottom display="inline">
            Alerts
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default HelpCenter;
