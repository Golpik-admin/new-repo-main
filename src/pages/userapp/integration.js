import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Grid as MuiGrid,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { appUrl, authTdameritrade } from "../../config";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  lastPostTDAmeritrade,
  postTDAmeritrade,
} from "../../redux/slices/integration";

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
  const dispatch = useDispatch();
  const isCodeAMTrade = useSelector((state) => state.integrations.TDAmeritrade);
  const lastTDAmeritrade = useSelector(
    (state) => state.integrations.lastTDAmeritrade
  );

  console.log(lastTDAmeritrade);

  if (isCodeAMTrade) {
    // var obj = JSON.stringify({
    // grant_type: "authorization_code",
    // access_type: "offline",
    // code: decode.split("&code=")[1],
    // client_id: decodeClient_id,
    // });
    // dispatch(lastPostTDAmeritrade(obj));
  }

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      const decode = decodeURIComponent(code.replace(/\+/g, " "));
      // console.log(decode);
      const decodeClient_id = decodeURIComponent(authTdameritrade.clientId);
      const obj = new URLSearchParams();
      obj.append("grant_type", "authorization_code");
      obj.append("access_type", "offline");
      obj.append("code", decode);
      obj.append("client_id", decodeClient_id);
      obj.append(
        "redirect_uri",
        "https://consilience.golpik.net/integration?handler=Callback"
      );

      dispatch(postTDAmeritrade(obj));
    }
  }, []);

  const handleNavigate = () => {
    window.location.replace(
      `${authTdameritrade.URL}?response_type=code&redirect_uri=${appUrl}integration?handler=Callback&client_id=${authTdameritrade.clientId}`
    );
  };

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
            {isCodeAMTrade ? (
              <Button
                color="success"
                variant="outlined"
                disableElevation
                fullWidth
              >
                INTEGRATED
              </Button>
            ) : (
              <Button
                className="int-button"
                variant="outlined"
                disableElevation
                fullWidth
                onClick={handleNavigate}
              >
                Authorize access to TDAmeritrade.com
              </Button>
            )}
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
