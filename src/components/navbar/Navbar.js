/* eslint-disable prettier/prettier */
import * as React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";

import {
  Grid,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

import NavbarNotificationsDropdown from "./NavbarNotificationsDropdown";
import NavbarUserDropdown from "./NavbarUserDropdown";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.palette.background.default};
  color: ${(props) => props.theme.header.color};
  .date{
    color: ${(props) => props.theme.header.date};
    font-size: 14px;
    margin-left: 22px;
  }
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;



const ToolbarTitle = styled.div`
  min-width: 150px;
  margin-left: 15px;
`;


const date = new Date();
const [day, year] = [
  date.getDate(),
  date.getFullYear(),
];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthIndex = (new Date().getMonth());
let monthName = monthNames[monthIndex];

const Navbar = ({ onDrawerToggle }) => {
  const pathName = window.location.pathname.substr(1);
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <ToolbarTitle>
                <Typography
                  variant="h2"
                  sx={{
                    textTransform: 'capitalize',
                  }}
                >
                  {pathName }
                  <span className="date">
                    {monthName }&nbsp;
                    {day },&nbsp;
                    {year }
                  </span>
                </Typography>
              </ToolbarTitle>
            </Grid>
            <Grid item xs />
            <Grid item>
              <NavbarNotificationsDropdown />
              <NavbarUserDropdown />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(Navbar);
