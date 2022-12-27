import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid as MuiGrid,
  Paper as MuiPaper,
  Button,
  Typography,
  IconButton,
  LinearProgress as MuiLinearProgress,
  CircularProgress as MuiCircularProgress,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

const Grid = styled(MuiGrid)`
  .empty-box {
    border: 1px solid #d5d7e3;
    min-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    button {
      background: #e6e9f4;
      color: ${(props) => props.theme.palette.background.paper};
    }
  }
  .data-box {
    height: 100%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    padding: 10px 25px 25px;
    border-radius: 8px;
    .MuiTypography-subtitle1 {
      line-height: 21px;
      padding-bottom: 25px;
    }
    .int-button {
      border: 1px solid #0058ff;
      font-weight: 500;
    }
  }
  .int-con {
  }
`;

function Integraion() {
  return (
    <React.Fragment>
      <Helmet title="Orders" />

      <Grid
        justifyContent="space-between"
        container
        spacing={10}
        className="int-con"
      >
        <Grid item xs={12}>
          <Typography variant="h4">Add Trading Accounts</Typography>
          <Typography fontWeight="500" color="#A1A7C4" variant="subtitle1">
            You can trade in these accounts
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box className="data-box">
            <div>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  maxWidth: "264px",
                }}
                alt="logo"
                src="/static/img/integration/logo1.png"
              />
              <Typography
                fontWeight="500"
                color="#A1A7C4"
                variant="subtitle1"
                gutterBottom
              >
                Sign-in to eTrade to authorize access to authorize access to
                your brokerage accounts. Please note that you'd need to notify
                eTrade so they don't suspect unauthorized activity on your
                account.
              </Typography>
              <Button
                className="int-button"
                variant="outlined"
                disableElevation
                fullWidth
              >
                Authorize access to eTrade
              </Button>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box className="data-box">
            <Box
              component="img"
              sx={{
                width: "100%",
                maxWidth: "264px",
              }}
              alt="logo"
              src="/static/img/integration/logo2.png"
            />
            <Typography
              fontWeight="500"
              color="#A1A7C4"
              variant="subtitle1"
              flexGrow="1"
              gutterBottom
            >
              Sign-in to TD Ameritrade to authorize access to authorize access
              to your brokerage accounts.
            </Typography>
            <Button
              className="int-button"
              variant="outlined"
              disableElevation
              fullWidth
            >
              Authorize access to TDAmeritrade.com
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box className="empty-box">
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box className="empty-box">
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box className="empty-box">
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box className="empty-box">
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box className="empty-box">
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Integraion;
