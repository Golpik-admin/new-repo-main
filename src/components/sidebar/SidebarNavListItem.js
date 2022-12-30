import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { rgba } from "polished";

import { Chip, Collapse, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
));

const Item = styled(ListItemButton)`
  justify-content: center;
  z-index: 9;
  padding-top: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-bottom: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-left: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 0 : 0)};
  padding-right: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 0 : 0)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  ${(props) => props.theme.breakpoints.up("md")} {
    svg {
      color: ${(props) => props.theme.sidebar.color};
      font-size: 20px;
      width: 40px;
      height: 40px;
      padding: 0 ${(props) => props.theme.spacing(2)};
      border-radius: 25px;
    }
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    svg {
      width: auto;
      color: ${(props) => props.theme.sidebar.color};
      padding: 0 ${(props) => props.theme.spacing(4)};
    }
  }
  &:hover {
    color: ${(props) => props.theme.sidebar.color};
    background-color: transparent;
    svg {
      background-color: ${(props) => props.theme.sidebar.icon.background};
    }
    .side-title {
      left: 58px;
      opacity: 1;
      background-color: ${(props) => props.theme.sidebar.background};
    }
    ${(props) => props.theme.breakpoints.down("md")} {
      .side-title {
        left: auto;
        background-color: transparent;
      }
    }
  }
  &.${(props) => props.activeclassname} {
    background-color: transparent;
    svg {
      background-color: ${(props) => props.theme.sidebar.icon.background};
    }
    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const Title = styled(ListItemText)`
  padding: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  border-radius: 0 50px 50px 0;
  margin: 0;
  position: fixed;
  left: -58px;
  z-index: -1;
  opacity: 0;
  transition: all ease-in-out 0.3s;
  ${(props) => props.theme.breakpoints.down("md")} {
    position: relative;
    left: auto;
    opacity: 1;
  }
  span {
    z-index: -1;
    color: ${(props) =>
      rgba(
        props.theme.sidebar.color,
        props.depth && props.depth > 0 ? 0.7 : 1
      )};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0;
  }
`;

const Badge = styled(Chip)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 26px;
  top: 12px;
  background: ${(props) => props.theme.sidebar.badge.background};
  z-index: 1;
  span.MuiChip-label,
  span.MuiChip-label:hover {
    font-size: 11px;
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const ExpandLessIcon = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const SidebarNavListItem = (props) => {
  const {
    title,
    href,
    depth = 0,
    children,
    icon: Icon,
    badge,
    open: openProp = false,
  } = props;

  const [open, setOpen] = React.useState(openProp);

  const handleToggle = () => {
    setOpen((state) => !state);
  };

  if (children) {
    return (
      <React.Fragment>
        <Item depth={depth} onClick={handleToggle}>
          {Icon && <Icon />}
          <Title depth={depth}>
            {title}
            {badge && <Badge label={badge} />}
          </Title>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Item>
        <Collapse in={open}>{children}</Collapse>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Item
        depth={depth}
        component={CustomRouterLink}
        to={href}
        activeclassname="active"
      >
        {Icon && <Icon />}
        <Title className="side-title" depth={depth}>
          {title}
          {badge && <Badge label={badge} />}
        </Title>
      </Item>
    </React.Fragment>
  );
};

export default SidebarNavListItem;
