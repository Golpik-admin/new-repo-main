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
  Typography,
  IconButton,
  LinearProgress as MuiLinearProgress,
  CircularProgress as MuiCircularProgress,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

const Grid = styled(MuiGrid)`
  .MuiBox-root {
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
          <Typography variant="h3" gutterBottom display="inline">
            Integration
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box>
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box>
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box>
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box>
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box>
            <IconButton>
              <AddOutlined />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box>
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
