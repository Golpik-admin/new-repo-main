import merge from "deepmerge";
import { green, grey, indigo } from "@mui/material/colors";
import { THEMES } from "../constants";

const customBlue = {
  1: "#0058FF",
  2: "#2B75FD",
  3: "#91B7FF",
  4: "#E5EEFF",
  50: "#e9f0fb",
  100: "#c8daf4",
  200: "#a3c1ed",
  300: "#7ea8e5",
  400: "#6395e0",
  500: "#4782da",
  600: "#407ad6",
  700: "#376fd0",
  800: "#2f65cb",
  900: "#2052c2 ",
};

const defaultVariant = {
  name: THEMES.DEFAULT,
  palette: {
    mode: "light",
    primary: {
      main: "#0058FF",
      contrastText: "#FFF",
    },
    secondary: {
      main: customBlue[3],
      contrastText: "#FFF",
    },
    background: {
      default: "#F5F6FA",
      paper: "#FFF",
    },
    toolbarbtn: {
      color: "#131523",
      background: "#fff",
      border: "1px solid #D7DBEC",
    },
    tableTh: {
      background: customBlue[4],
    },
    filterTh: {
      color: "#91B7FF",
      background: "#F2F7FF",
    },
    proCard: {
      color: "#FFFFFF",
      background: "#131523",
      beforeColor: "rgba(255,255,255,0.08)",
    },
  },
  header: {
    color: "#171725",
    background: "#F7F9FC",
    date: "#7E84A3",
    search: {
      color: grey[800],
    },
    indicator: {
      background: "#F0142F",
    },
  },
  footer: {
    color: grey[500],
    background: "#FFF",
  },
  sidebar: {
    color: "#fff",
    background: customBlue[2],
    icon: {
      background: "#051A43",
    },
    header: {
      color: "#fff",
      background: "#233044",
      brand: {
        color: customBlue[500],
      },
    },
    footer: {
      color: grey[200],
      background: "#1E2A38",
      online: {
        background: green[500],
      },
    },
    badge: {
      color: "#FFF",
      background: customBlue[500],
    },
  },
};

const darkVariant = merge(defaultVariant, {
  name: THEMES.DARK,
  palette: {
    mode: "dark",
    primary: {
      main: customBlue[600],
      contrastText: "#FFF",
    },
    background: {
      // default: "#1B2635",
      // paper: "#233044",
      default: "#1B202A",
      paper: "#1B202A",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.95)",
      secondary: "rgba(255, 255, 255, 0.5)",
    },
    toolbarbtn: {
      color: "#7E84A3",
      background: "#252B3B",
    },
    tableTh: {
      background: "#252B3B",
    },
    filterTh: {
      color: "#5A607F",
      background: "#1B202A",
    },
    proCard: {
      color: "#FFFFFF",
      background: "#2B75FD",
      beforeColor: "rgba(255,255,255,0.08)",
    },
  },
  header: {
    color: grey[300],
    background: "#1B2635",
    search: {
      color: grey[200],
    },
  },
  footer: {
    color: grey[300],
    background: "#233044",
  },
});

const lightVariant = merge(defaultVariant, {
  name: THEMES.LIGHT,
  palette: {
    mode: "light",
  },
  header: {
    background: "#F7F9FC",
    search: {
      color: grey[100],
    },
  },
  sidebar: {
    color: "#fff",
    background: customBlue[2],
    header: {
      color: "#FFF",
      background: customBlue[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: grey[800],
      background: "#F7F7F7",
      online: {
        background: green[500],
      },
    },
  },
});

const blueVariant = merge(defaultVariant, {
  name: THEMES.BLUE,
  palette: {
    mode: "light",
  },
  sidebar: {
    color: "#FFF",
    background: customBlue[700],
    header: {
      color: "#FFF",
      background: customBlue[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: customBlue[800],
      online: {
        background: "#FFF",
      },
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
});

const greenVariant = merge(defaultVariant, {
  name: THEMES.GREEN,
  palette: {
    primary: {
      main: green[800],
      contrastText: "#FFF",
    },
    secondary: {
      main: green[500],
      contrastText: "#FFF",
    },
  },
  header: {
    indicator: {
      background: green[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: green[700],
    header: {
      color: "#FFF",
      background: green[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: green[800],
      online: {
        background: "#FFF",
      },
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
});

const indigoVariant = merge(defaultVariant, {
  name: THEMES.INDIGO,
  palette: {
    primary: {
      main: indigo[600],
      contrastText: "#FFF",
    },
    secondary: {
      main: indigo[400],
      contrastText: "#FFF",
    },
  },
  header: {
    indicator: {
      background: indigo[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: indigo[700],
    header: {
      color: "#FFF",
      background: indigo[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: indigo[800],
      online: {
        background: "#FFF",
      },
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
});

const variants = [
  defaultVariant,
  darkVariant,
  lightVariant,
  blueVariant,
  greenVariant,
  indigoVariant,
];

export default variants;
