import { Layout, Bell, Settings, Sliders, ArrowRight } from "react-feather";

const pagesSection = [
  {
    icon: Sliders,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    href: "/alerts",
    icon: Bell,
    title: "Alerts",
  },
  {
    href: "/positions",
    icon: Layout,
    title: "Positions",
  },
  {
    href: "/integration",
    icon: ArrowRight,
    title: "Integration",
  },
  {
    href: "/settings",
    icon: Settings,
    title: "Settings",
  },
  {
    href: "/help-center",
    icon: Layout,
    title: "Help Center",
  },
];

const navItems = [
  {
    //  title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
