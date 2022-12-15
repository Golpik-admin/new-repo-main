import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid as MuiGrid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  LinearProgress as MuiLinearProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";
import Stats from "./Stats";
import { spacing } from "@mui/system";
import { useEffect } from "react";
import { fetchPositions, fetchPNL } from "../../redux/slices/possitions";
import {
  fetchPositionsPrevious,
  fetchPNLPrevious,
} from "../../redux/slices/positionsPreviousMonth";
import Moment from "react-moment";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./cus-style.css";
import moment from "moment-timezone";
import FilterPop from "./Filter";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.shipped && green[500]};
  background: ${(props) => props.processing && orange[700]};
  background: ${(props) => props.cancelled && red[500]};
  color: ${(props) => props.theme.palette.common.white};
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

function createData(id, product, date, total, status, method) {
  return { id, product, date, total, status, method };
}

const rows = [
  createData(
    "000253",
    "Salt & Pepper Grinder",
    "2021-01-02",
    "$32,00",
    0,
    "Visa"
  ),
  createData("000254", "Backpack", "2021-01-04", "$130,00", 0, "PayPal"),
  createData(
    "000255",
    "Pocket Speaker",
    "2021-01-04",
    "$80,00",
    2,
    "Mastercard"
  ),
  createData("000256", "Glass Teapot", "2021-01-08", "$45,00", 0, "Visa"),
  createData(
    "000257",
    "Unbreakable Water Bottle",
    "2021-01-09",
    "$40,00",
    0,
    "PayPal"
  ),
  createData("000258", "Spoon Saver", "2021-01-14", "$15,00", 0, "Mastercard"),
  createData("000259", "Hip Flash", "2021-01-16", "$25,00", 1, "Visa"),
  createData("000260", "Woven Slippers", "2021-01-22", "$20,00", 0, "PayPal"),
  createData("000261", "Womens Watch", "2021-01-22", "$65,00", 2, "Visa"),
  createData(
    "000262",
    "Over-Ear Headphones",
    "2021-01-23",
    "$210,00",
    0,
    "Mastercard"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

const headCells = [
  // { id: "id", alignment: "right", label: "ID" },
  { id: "ticker", alignment: "left", label: "TICKER" },
  { id: "option_Symbol", alignment: "left", label: "OPTION SYMBOL" },
  { id: "option_type", alignment: "left", label: "OPTION TYPE" },
  { id: "price_excuted", alignment: "right", label: "PRICE EXECUTED" },
  {
    id: "qty",
    alignment: "left",
    label: "QTY",
  },
  { id: "alert_description", alignment: "left", label: "ALERT DESCRIPTION" },
  { id: "capital_commited", alignment: "right", label: "CAPITAL COMMITED" },
  { id: "status", alignment: "right", label: "STATUS" },
  { id: "time_bought", alignment: "right", label: "TIME BOUGHT" },
  { id: "time_sold", alignment: "right", label: "TIME SOLD" },
  { id: "price_now", alignment: "right", label: "PRICE NOW" },
  { id: "p_l", alignment: "right", label: "P & L" },
  { id: "description", alignment: "right", label: "Description" },
];

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className="table-th"
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="filter-th"
          >
            <Box className="filter-box">
              <FilterPop />
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              ></TableSortLabel>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const Table = styled(MuiTable)`
  th.table-th {
    background: ${(props) => props.theme.palette.tableTh.background};
    padding: 10px;
  }
  th.filter-th {
    background: ${(props) => props.theme.palette.filterTh.background};
    padding: 10px;
    .filter-box {
      display: flex;
      width: 50px;
      color: ${(props) => props.theme.palette.filterTh.color};
    }
  }
`;

const Box = styled.div`
  &.radio-parent {
    flex: 1 1 100%;
    text-align: right;
    div {
      display: inline-flex;
      flex-direction: row;
      justify-content: end;
      display: inline-flex;
      padding: 2px;
      border-radius: 4px;
      label {
        position: relative;
        margin: 0;
        .MuiRadio-root {
          position: absolute;
          z-index: 1;
          background: #eee;
          border-radius: 4px;
          left: 0;
          right: 0;
          padding: 18px 22px;
          margin: 1px;
          background: ${(props) => props.theme.palette.toolbarbtn.background};
          border: ${(props) => props.theme.palette.toolbarbtn.border};
          &.Mui-checked {
            background: ${(props) => props.theme.sidebar.background};
            + .MuiTypography-root {
              color: #fff;
            }
          }
          svg {
            display: none;
          }
        }
      }
      .MuiFormControlLabel-label {
        position: relative;
        z-index: 9;
        padding: 8px 22px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
        color: ${(props) => props.theme.palette.toolbarbtn.color};
        line-height: 1.7;
      }
    }
  }
`;

const Button = styled(MuiButton)`
  color: ${(props) => props.theme.sidebar.color};
  background: ${(props) => props.theme.sidebar.background};
  padding: 8px 22px;
  margin: 0 19px 0 17px;
  ${(props) => props.theme.palette.toolbarbtn.border};
  &:hover{
    background: ${(props) => props.theme.sidebar.background};
  }
} 
`;

const EnhancedTableToolbar = (props) => {
  // Here was 'let'
  const { numSelected } = props;
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(fetchPositions({ status: event.target.value, count: null }));
  };
  const [value, setValue] = React.useState([null, null]);
  const today = moment().format("YYYY-MM-DD");
  return (
    <Toolbar>
      {/* <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Positions
          </Typography>
        )}
      </ToolbarTitle> */}
      <Box className="radio-parent">
        <RadioGroup
          aria-label="Filters"
          name="positionsFilters"
          onChange={handleChange}
          defaultValue="all"
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="open" control={<Radio />} label="Open" />
          <FormControlLabel value="closed" control={<Radio />} label="Closed" />
          <FormControlLabel value="failed" control={<Radio />} label="Failed" />
          <FormControlLabel
            value="riskmanaged"
            control={<Radio />}
            label="Risk Managed"
          />
        </RadioGroup>
      </Box>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: today, end: today }}
        >
          <DateRangePicker
            className="picker-range"
            value={value}
            onChange={(newValue) => {
              let startDate =
                newValue[0] !== null
                  ? moment(newValue[0].$d).format("YYYY-MM-DD")
                  : null;
              let endDate =
                newValue[1] !== null
                  ? moment(newValue[1].$d).format("YYYY-MM-DD")
                  : null;
              if (startDate !== null && endDate !== null) {
                dispatch(
                  fetchPositions({ startDate: startDate, endDate: endDate })
                );
              }
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField className="date-1" {...startProps} />
                <Box> - </Box>
                <TextField className="date-2" {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </StyledEngineProvider>
    </Toolbar>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = positionsList.positions.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const positionsList = useSelector((state) => state.positionsList);
  const LinearProgress = styled(MuiLinearProgress)(spacing);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, positionsList.positions.length - page * rowsPerPage);
  return (
    <div>
      {positionsList.loading && <LinearProgress />}
      {!positionsList.loading && positionsList.positions.length ? (
        <Paper>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={positionsList.positions.length}
              />
              <TableBody>
                {stableSort(
                  positionsList.positions,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${row.id}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`${row.id}`}
                        selected={isItemSelected}
                      >
                        <TableCell align="left">{row.ticker}</TableCell>
                        <TableCell align="left">{row.option_Symbol}</TableCell>
                        <TableCell align="left">{row.option_Type}</TableCell>
                        <TableCell align="left">
                          {row.buy_Price_Executed}
                        </TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">
                          {row.buy_Order_Reason}
                        </TableCell>
                        <TableCell align="left">
                          {row.capital_Committed !== null
                            ? parseFloat(row.capital_Committed).toFixed(2)
                            : ""}
                        </TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">
                          {row.buy_Time_Executed !== null ? (
                            <Moment format="YYYY-MM-DD hh:mm:ss">
                              {row.buy_Time_Executed}
                            </Moment>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {row.sell_Time_Executed !== null ? (
                            <Moment format="YYYY-MM-DD hh:mm:ss">
                              {row.sell_Time_Executed}
                            </Moment>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {row.sell_Price_Executed}
                        </TableCell>
                        <TableCell align="right">
                          {row.pnL !== null
                            ? parseFloat(row.pnL).toFixed(2)
                            : ""}
                        </TableCell>
                        <TableCell align="right">
                          {row.sell_Order_Reason}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {/* {emptyRows > 0 && (
                  //  style={{ height: 53 * emptyRows }}
                  <TableRow>
                    <TableCell colSpan={12} />
                  </TableRow>
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={positionsList.positions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Paper>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={positionsList.positions.length}
              />
              <TableBody>
                <TableCell colSpan={12}>{"Record not found"}</TableCell>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={positionsList.positions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}

function OrderList() {
  function calculatePercentage(previous, current) {
    let prevCalProcessed = 0;

    if (parseInt(current) < parseInt(previous) && parseInt(previous) > 0) {
      prevCalProcessed = (
        ((parseInt(current) - parseInt(previous)) / parseInt(previous)) *
        100
      ).toFixed(2);
    } else if (
      parseInt(current) > parseInt(previous) &&
      parseInt(current) > 0
    ) {
      prevCalProcessed = (
        ((parseInt(current) - parseInt(previous)) / parseInt(current)) *
        100
      ).toFixed(2);
    }

    return prevCalProcessed;
  }

  function percentageStatusDisplay(previous, current) {
    var percentageColorProcessed;
    if (parseInt(current) < parseInt(previous)) {
      percentageColorProcessed = red[500];
    } else {
      percentageColorProcessed = green[500];
    }

    return percentageColorProcessed;
  }

  const dispatch = useDispatch();

  let date = new Date();

  const today = moment().format("YYYY-MM-DD");

  const currentMonthFirstDay = moment(date)
    .startOf("month")
    .format("YYYY-MM-DD");
  const currentMonthLastDay = moment(date).endOf("month").format("YYYY-MM-DD");

  const previousMonthFirstDay = moment(date)
    .subtract(1, "months")
    .startOf("month")
    .format("YYYY-MM-DD");
  const previousMonthLastDay = moment(date)
    .subtract(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");

  const totalCurrentHours = moment
    .duration(
      moment(currentMonthLastDay, "YYYY/MM/DD").diff(
        moment(currentMonthFirstDay, "YYYY/MM/DD")
      )
    )
    .asHours();

  useEffect(() => {
    dispatch(fetchPositions());
    dispatch(
      fetchPositions({
        startDate: currentMonthFirstDay,
        endDate: currentMonthLastDay,
        status: "open",
        count: true,
      })
    );

    dispatch(
      fetchPositionsPrevious({
        startDate: previousMonthFirstDay,
        endDate: previousMonthLastDay,
        status: "open",
        count: true,
      })
    );

    dispatch(
      fetchPNL({
        startDate: currentMonthFirstDay,
        endDate: currentMonthLastDay,
        apiCall: "totalPnl",
        count: true,
      })
    );
    dispatch(
      fetchPNLPrevious({
        startDate: previousMonthFirstDay,
        endDate: previousMonthLastDay,
        apiCall: "totalPnl",
        count: true,
      })
    );

    dispatch(
      fetchPNL({
        startDate: today,
        endDate: today,
        apiCall: "today",
        count: true,
      })
    );
  }, []);

  const positionsList = useSelector((state) => state.positionsList);
  const positionsListPrevious = useSelector(
    (state) => state.positionsListPrevious
  );

  return (
    <React.Fragment>
      <Helmet title="Orders" />
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Positions Open"
            amount={positionsList.positionsOpen}
            // chip="Today"
            percentagetext={
              calculatePercentage(
                positionsListPrevious.positionsOpenPrevious,
                positionsList.positionsOpen
              ) + "%"
            }
            percentagecolor={percentageStatusDisplay(
              positionsListPrevious.positionsOpenPrevious,
              positionsList.positionsOpen
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg>
          <Stats
            title="Today P & L"
            amount={parseFloat(positionsList.todayPnl).toFixed(2)}
            // chip="Annual"
            percentagetext={
              calculatePercentage(
                positionsListPrevious.todayPnlPrevious,
                positionsList.todayPnl
              ) + "%"
            }
            percentagecolor={percentageStatusDisplay(
              positionsListPrevious.todayPnlPrevious,
              positionsList.todayPnl
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg>
          <Stats
            title="P & L"
            amount={parseFloat(positionsList.pnl).toFixed(2)}
            // chip="Monthly"
            percentagetext={
              calculatePercentage(
                positionsListPrevious.pnlPrevious,
                positionsList.pnl
              ) + "%"
            }
            percentagecolor={percentageStatusDisplay(
              positionsListPrevious.pnlPrevious,
              positionsList.pnl
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg>
          <Stats
            title="Recent Positions"
            amount="45"
            // chip="Yearly"
            percentagetext="-9%"
            percentagecolor={red[500]}
            // illustration="/static/img/illustrations/waiting.png"
          />
        </Grid>
        <Grid className="pro-card" item xs={12} sm={6} md={4} lg={2}>
          <Stats
            title="Pro +"
            amount="Subscription"
            chip=""
            percentagetext="Details"
            percentagecolor={red[500]}
            // illustration="/static/img/illustrations/waiting.png"
          />
          {/* <Typography variant="h4">Pro+</Typography> */}
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const Grid = styled(MuiGrid)`
  &.pro-card {
    .MuiPaper-root {
      color: ${(props) => props.theme.palette.proCard.color};
      background-color: ${(props) => props.theme.palette.proCard.background};
      &:before {
        content: "PRO+";
        font-size: 70px;
        position: absolute;
        padding: 0 0 0 12px;
        font-weight: 700;
        color: ${(props) => props.theme.palette.proCard.beforeColor};
      }
    }
  }
`;

export default OrderList;
