import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ReactPerfectScrollbar from "react-perfect-scrollbar";
import { List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import SidebarNavSection from "./SidebarNavSection";

import "../../vendor/perfect-scrollbar.css";

const baseScrollbar = (props) => css`
  background-color: ${props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Scrollbar = styled.div`
  ${baseScrollbar}
`;

const PerfectScrollbar = styled(ReactPerfectScrollbar)`
  ${baseScrollbar}
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)};
  padding-bottom: ${(props) => props.theme.spacing(2.5)};
`;

// const Box = styled.div`
//   transform: rotate(-90deg);
//   background-color: ${(props) => props.theme.sidebar.background};
//   //position: absolute;
//   // bottom: 0;
//   // left: 0;
//   // right: 0;
//   .vert-logo {
//     // position: absolute;
//     display: inline-flex;
//     // bottom: -8px;
//     // left: -90px;
//     color: #fff;
//     margin: 16px 0 0 8px;
//   }
// `;

const SidebarNav = ({ items }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const ScrollbarComponent = matches ? PerfectScrollbar : Scrollbar;

  return (
    <ScrollbarComponent>
      <List disablePadding>
        <Items>
          {items &&
            items.map((item) => (
              <SidebarNavSection
                component="div"
                key={item.toString()}
                pages={item.pages}
                title={item.title}
              />
            ))}
        </Items>
      </List>
    </ScrollbarComponent>
  );
};

export default SidebarNav;
