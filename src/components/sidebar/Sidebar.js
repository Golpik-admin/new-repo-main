import React from "react";
import styled from "@emotion/styled";

import { Drawer as MuiDrawer } from "@mui/material";

import Footer from "./SidebarFooter";
import SidebarNav from "./SidebarNav";

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Sidebar = ({ items, showFooter = true, ...rest }) => {
  return (
    <Drawer variant="permanent" {...rest}>
      <SidebarNav items={items} />
      {!!showFooter && <Footer />}
    </Drawer>
  );
};

export default Sidebar;
