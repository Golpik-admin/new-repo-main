import * as React from "react";
import styled from "@emotion/styled";

import {
  Popover as MuiPopover,
  Typography,
  Button as MuiButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import SortIcon from "@mui/icons-material/Sort";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SearchIcon from "@mui/icons-material/Search";

import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Popover = styled(MuiPopover)`
  height: 300px;
  .MuiPaper-root {
    padding: 10px;
    border: 0;
    background-color: ${(props) => props.theme.palette.tableTh.background};
    .field {
      .MuiInputBase-root {
        border: 0;
        background: #fff;
        padding-left: 8px;
        margin-bottom: 10px;
      }
      input {
        border: 0;
        border-radius: 4px;
        padding-left: 0;
      }
    }
    .poper-check {
      // padding: 4px 10px 4px 10px;
      // color: #a1a7c4;
      // &.mui-checked {
      //   color: red;
      // }
      svg {
        // border: 2px solid #a1a7c4;
        // border-radius: 4px;
        // background: #1b202a;
        // path {
          //color: ${(props) => props.theme.palette.tableTh.background};
        }
      }
    }
  }
`;

const Button = styled(MuiButton)`
  padding: 0 6px;
  justify-content: start;
  &:hover {
    background: transparent;
  }
`;

export default function FilterPop() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div>
      <Button
        open
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
        startIcon={<SortIcon />}
      ></Button>
      <Popover
        className="multi-select"
        variant="popover"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {/* <Autocomplete
          freeSolo
          multiple
          id="checkboxes-tags-demo"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li className="li-item" {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          className="multi-select"
          renderInput={(params) => (
            <TextField
              className="field"
              {...params}
              placeholder="search"
              open
            />
          )}
        /> */}
        {/* <TextField className="field" placeholder="search" open size="small" /> */}
        <TextField
          className="field"
          size="small"
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox className="poper-check" />}
            label="Label"
          />
          <FormControlLabel
            control={<Checkbox className="poper-check" />}
            label="Label"
          />
          <FormControlLabel
            control={<Checkbox className="poper-check" />}
            label="Label"
          />
          <FormControlLabel
            control={<Checkbox className="poper-check" />}
            label="Label"
          />
          <FormControlLabel
            control={<Checkbox className="poper-check" />}
            label="Label"
          />
        </FormGroup>
      </Popover>
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];
