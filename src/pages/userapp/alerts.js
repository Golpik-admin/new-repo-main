import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
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
import { fetchAlerts } from "../../redux/slices/alerts";
import Moment from "react-moment";

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
  { id: "id", alignment: "right", label: "ID" },
  { id: "ticker", alignment: "left", label: "TICKER" },
  { id: "option_type", alignment: "left", label: "OPTION TYPE" },
  { id: "order_action", alignment: "right", label: "ORDER ACTION" },
  {
    id: "price_fired_alert",
    alignment: "left",
    label: "PRICE WHEN ALERT FIRED",
  },
  { id: "price_now", alignment: "left", label: "PRICE NOW" },
  { id: "status", alignment: "right", label: "STATUS" },
  { id: "alert_comment", alignment: "right", label: "ALERT COMMENT" },
  { id: "time_received", alignment: "right", label: "TIME RECIEVED" },
  { id: "time_executed", alignment: "right", label: "TIME EXCUTED" },
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
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
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
    </TableHead>
  );
};

const EnhancedTableToolbar = (props) => {
  // Here was 'let'
  const { numSelected } = props;
  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Alerts
          </Typography>
        )}
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" size="large">
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" size="large">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
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
      const newSelecteds = alertList.alerts.map((n) => n.id);
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

  const alertList = useSelector((state) => state.alertsList);
  const LinearProgress = styled(MuiLinearProgress)(spacing);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, alertList.alerts.length - page * rowsPerPage);
  return (
    <div>
      {alertList.loading && <LinearProgress />}
      {!alertList.loading && alertList.alerts.length ? (
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
                rowCount={alertList.alerts.length}
              />
              <TableBody>
                {stableSort(alertList.alerts, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${row.id}`;
                    // -${index}
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`${row.id}`}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                            onClick={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>

                        <TableCell align="right">#{row.id}</TableCell>
                        <TableCell align="left">{row.ticker}</TableCell>
                        <TableCell align="left">{row.option_Type}</TableCell>
                        <TableCell align="left">
                          {row.order_Action.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell align="left">{"N/A"}</TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="right">{row.alert_Comment}</TableCell>
                        <TableCell align="right">
                          {row.time_Received !== null ? (
                            <Moment format="YYYY-MM-DD hh:mm:ss">
                              {row.time_Received}
                            </Moment>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {row.time_Executed !== null ? (
                            <Moment format="YYYY-MM-DD hh:mm:ss">
                              {row.time_Executed}
                            </Moment>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        {/* <TableCell>
                          {row.status === 0 && (
                            <Chip
                              size="small"
                              mr={1}
                              mb={1}
                              label="Shipped"
                              shipped={+true}
                            />
                          )}
                          {row.status === 1 && (
                            <Chip
                              size="small"
                              mr={1}
                              mb={1}
                              label="Processing"
                              processing={+true}
                            />
                          )}
                          {row.status === 2 && (
                            <Chip
                              size="small"
                              mr={1}
                              mb={1}
                              label="Cancelled"
                              cancelled={+true}
                            />
                          )}
                        </TableCell> */}
                        {/* <TableCell align="left">{row.method}</TableCell>
                        <TableCell padding="none" align="right">
                          <Box mr={2}>
                            <IconButton aria-label="delete" size="large">
                              <ArchiveIcon />
                            </IconButton>
                            <IconButton aria-label="details" size="large">
                              <RemoveRedEyeIcon />
                            </IconButton>
                          </Box>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={alertList.alerts.length}
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
                rowCount={alertList.alerts.length}
              />
              <TableBody>
                <TableCell colSpan={12}>{"Record not found"}</TableCell>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={alertList.alerts.length}
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAlerts());
  }, []);
  const alertList = useSelector((state) => state.alertsList);
  const processed = alertList.alerts.filter(
    (record) => record.status === "Processed"
  );
  const unprocessed = alertList.alerts.filter(
    (record) => record.status === "Unprocessed"
  );
  const expired = alertList.alerts.filter(
    (record) => record.status === "Expired"
  );
  const processedRecord = processed.length;
  const unProcessedRecord = unprocessed.length;
  const exiredRecord = expired.length;

  const currentYear = new Date().getFullYear(); // 2020
  const previousYear = currentYear - 1;

  const prYearProcessed = alertList.alerts.filter(
    (record) =>
      record.status === "Processed" &&
      new Date(record.time_Executed).getFullYear() === previousYear
  );
  const crYearProcessed = alertList.alerts.filter(
    (record) =>
      record.status === "Processed" &&
      new Date(record.time_Executed).getFullYear() === currentYear
  );
  console.log(prYearProcessed, crYearProcessed);
  const processDif =
    100 *
    Math.abs(
      (prYearProcessed - crYearProcessed) /
        ((prYearProcessed + crYearProcessed) / 2)
    );

  return (
    <React.Fragment>
      <Helmet title="Orders" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Alerts
          </Typography>

          {/* <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/">
              Pages
            </Link>
            <Typography>Orders</Typography>
          </Breadcrumbs> */}
        </Grid>
        {/* <Grid item>
          <div>
            <Button variant="contained" color="primary">
              <AddIcon />
              New Order
            </Button>
          </div>
        </Grid> */}
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Alerts Processed"
            amount={processedRecord}
            // chip="Today"
            percentagetext="+26%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Alerts Unprocessed"
            amount={unProcessedRecord}
            // chip="Annual"
            percentagetext="-14%"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Alerts Expired"
            amount={exiredRecord}
            // chip="Monthly"
            percentagetext="+18%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Alerts Per Hour"
            amount="45"
            // chip="Yearly"
            percentagetext="-9%"
            percentagecolor={red[500]}
            // illustration="/static/img/illustrations/waiting.png"
          />
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

export default OrderList;
