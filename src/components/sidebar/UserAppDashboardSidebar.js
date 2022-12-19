import { SignpostOutlined } from "@mui/icons-material";
import { AddAlarmOutlined } from "@mui/icons-material";
import { SettingsOutlined } from "@mui/icons-material";
import { HomeOutlined } from "@mui/icons-material";
import { CompareArrowsOutlined } from "@mui/icons-material";
import { HelpOutlineOutlined } from "@mui/icons-material";

const pagesSection = [
  {
    icon: HomeOutlined,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    href: "/alerts",
    icon: AddAlarmOutlined,
    title: "Alerts",
  },
  {
    href: "/positions",
    icon: SignpostOutlined,
    title: "Positions",
  },
  {
    href: "/integration",
    icon: CompareArrowsOutlined,
    title: "Integration",
  },
  {
    href: "/settings",
    icon: SettingsOutlined,
    title: "Settings",
  },
  {
    href: "/help-center",
    icon: HelpOutlineOutlined,
    title: "Help Center",
  },
  {
    href: "/risk-management",
    icon: HelpOutlineOutlined,
    title: "Risk Management",
  },
];

const navItems = [
  {
    //  title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
