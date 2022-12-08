/* eslint-disable prettier/prettier */
import React from "react";
import styled from "@emotion/styled";
import { Badge, Grid, Avatar, Typography, useTheme, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import useAuth from "../../hooks/useAuth";

const Footer = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.background} !important;
  padding: ${(props) => props.theme.spacing(0)}
    ${(props) => props.theme.spacing(0)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  min-height: 120px
`;

const FooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const FooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
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

const Box = styled.div`
  &.logo{
    background: #000;
    transform: rotate(-90deg);
    background-color: ${(props) => props.theme.sidebar.background};
    //position: absolute;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // transform: rotate(-90deg);
    .vert-logo {
      // position: absolute;
      display: inline-flex;
      // bottom: -8px;
      // left: -90px;
      color: #fff;
      margin: 5px 0 0 8px;
    }
  }
`;

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const SidebarFooter = ({ ...rest }) => {
  const { user } = useAuth();
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const [mode, setMode] = React.useState('light');
  // const colorMode = React.useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  //     },
  //   }),
  //   [],
  // );

  return (
    <Footer {...rest}>
      <Box className="logo" sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="body2" component="span">
              <em className="vert-logo">
                <strong>Consilience </strong> Trading
              </em>
            </Typography>
            {/* <Button></Button> */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              color: 'text.primary',
              borderRadius: 1,
            }}
          >
            <IconButton sx={{ mt:5, ml:3, }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
      <Grid container spacing={2}>
          {/* <FooterBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            {!!user && <Avatar alt={user.displayName} src={user.avatar} />}
            {!user && (
              <Avatar
                alt="Lucy Lavender"
                src="/static/img/avatars/avatar-1.jpg"
              />
            )}
          </FooterBadge> */}
        <Grid item>
        </Grid>
        {/* <Grid item>
          {!!user && (
            <FooterText variant="body2">{user.displayName}</FooterText>
          )}
          {!user && <FooterText variant="body2">Lucy Lavender</FooterText>}
          <FooterSubText variant="caption">UX Designer</FooterSubText>
        </Grid> */}
      </Grid>
    </Footer>
  );
};

export default SidebarFooter;
