/* eslint-disable prettier/prettier */
import React from "react";
import styled from "@emotion/styled";
import { Grid, Typography, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { THEMES } from "../../constants";
import useTheme from "../../hooks/useTheme";

const Footer = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.background} !important;
  padding: ${(props) => props.theme.spacing(0)}
    ${(props) => props.theme.spacing(0)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  min-height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;


const Box = styled.div`
  &.logo{
    background: #000;
    transform: rotate(-90deg);
    background-color: ${(props) => props.theme.sidebar.background};
    .vert-logo {
      font-size:20px;
      font-weight:900;
      display: inline-flex;
      color: #fff;
      margin: 5px 0 0 8px;
    }
  }
`;

function Demo({ title, themeVariant }) {
  const { theme, setTheme } = useTheme();

  return (
    <Grid item xs={6}>
      <IconButton sx={{ mt: 5, ml: 3, }}
      onClick={() => setTheme(themeVariant)}
        color="inherit">
        {themeVariant === theme ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Grid>
  );
}
const SidebarFooter = ({ ...rest }) => {
  const theme = useTheme();
  return (
    <Footer {...rest}>
      <Box className="logo" sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="body2" component="span">
              <em className="vert-logo">
                <strong>Optionize </strong>
              </em>
            </Typography>
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
          {theme.theme === 'DARK' &&
            <Demo title="Light" themeVariant={THEMES.LIGHT}></Demo>
          }
          {theme.theme !== 'DARK' &&
            <Demo title="Dark" themeVariant={THEMES.DARK}></Demo>
          }
          </Box>
    </Footer>
  );
};

export default SidebarFooter;
