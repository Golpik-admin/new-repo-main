import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
  Badge,
  Grid,
  Avatar,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";

import useAuth from "../../hooks/useAuth";

const IconButton = styled(MuiIconButton)`
  &:hover {
    background-color: transparent;
  }
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/sign-in");
  };

  const { user } = useAuth();

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <Grid container spacing={2}>
            <Grid item>
              <FooterBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                {!!user && <Avatar alt={user.displayName} src={user.avatar} />}
                {/* Demo data */}
                {!user && <Avatar alt="Lucy Lavender" src={user.avatar} />}
              </FooterBadge>
            </Grid>
            <Grid item alignItems="center" display="flex">
              {!!user && (
                <FooterText variant="body2">
                  {user.displayName}
                  {/* User Account */}
                </FooterText>
              )}
              {/* Demo data */}
              {!user && <FooterText variant="body2">Lucy Lavender</FooterText>}
              <ExpandMore />
            </Grid>
          </Grid>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={closeMenu}
          sx={{
            width: 170,
            justifyContent: "center",
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleSignOut}
          elevation={5}
          sx={{
            width: 170,
            justifyContent: "center",
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;

const FooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const FooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${(props) =>
      props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;
