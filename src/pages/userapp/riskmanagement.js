/* eslint-disable prettier/prettier */
import React, { forwardRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider as MuiDivider,
  Grid as MuiGrid,
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
  LinearProgress as MuiLinearProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  IconButton,
} from "@mui/material";
import {
  SyncAlt,
  AddOutlined,
  SystemUpdateAltOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";

import {
  ArrowDownward,
  FilterList,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

import { green, red } from "@mui/material/colors";
import Stats from "./Stats";
import { spacing } from "@mui/system";
import { fetchRiskManagements } from "../../redux/slices/getRiskManagement";
import Moment from "react-moment";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./cus-style.css";
import moment from "moment-timezone";
import FilterPop from "./Filter";
import useAuth from "../../hooks/useAuth";

import MaterialTable from "material-table";
import { ChevronLeft, ChevronRight } from "react-feather";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

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
  { id: "ticker", alignment: "left", label: "TICKER" },
  { id: "option_type", alignment: "left", label: "PROFIT TARGET" },
  { id: "order_action", alignment: "left", label: "LOSS / MINIMUM PROFIT" },
  {
    id: "price_fired_alert",
    alignment: "left",
    label: "ACTIVE POSITIONS",
  },
  { id: "price_now", alignment: "left", label: "ACTIVE" },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="table-th"
          >
            <Box className="filter-box">
              <div className="txt">{headCell.label}</div>
              <FilterPop />
              {/* SyncAltTwoToneIcon  */}
              <TableSortLabel
                active={true}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                IconComponent={SyncAlt}
              ></TableSortLabel>
            </Box>
          </TableCell>
        ))}
      </TableRow>
      {/* <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="filter-th"
          >
            <IconButton>
              <AddCircle />
            </IconButton>
          </TableCell>
        ))}
      </TableRow> */}
      <TableRow>
          <TableCell
            colSpan={5}
            className="filter-th"
          >
            <IconButton>
              <AddOutlined />
            </IconButton>
          </TableCell>
          {/* <TableCell
            padding=""
            className="filter-th"
          >
            <IconButton>
              <AddOutlined />
            </IconButton>
          </TableCell>
          <TableCell
            padding=""
            className="filter-th"
          >
            <IconButton>
              <AddOutlined />
            </IconButton>
          </TableCell>
          <TableCell
            padding=""
            className="filter-th"
          >
            <IconButton>
              <AddOutlined />
            </IconButton>
          </TableCell>
          <TableCell
            padding=""
            className="filter-th"
          >
            <IconButton>
              <SystemUpdateAltOutlined />
            </IconButton>
            <IconButton fontSize="small" className="del-btn">
              <DeleteOutlineOutlined />
            </IconButton>
          </TableCell> */}
          
      </TableRow>
    </TableHead>
  );
};

// const Table = styled(MuiTable)`
//   th.table-th:first-child{
//     min-width:300px;
//   }
//   th{
//     border-left: 4px solid ${(props) => props.theme.palette.background.paper};
//     border-bottom: 0;
//     padding: 6px;
//     line-height: 1.2;
//   }
//   th.table-th{
//     background: ${(props) => props.theme.palette.tableTh.background};
//   }
//   th.filter-th{
//     background: ${(props) => props.theme.palette.filterTh.background};
//     .filter-box{
//       display: flex;
//       justify-content: space-between;
//       button{
//         color: ${(props) => props.theme.palette.filterTh.color};
//         min-width:30px;
//       }
//       .MuiTableSortLabel-root{
//         transform: rotate(90deg);
//         svg{
//           color: ${(props) => props.theme.palette.filterTh.color};
//         }

//       }
//     }
//   }
// `;

const Table = styled(MuiTable)`

  th.table-th{
    border-left: 4px solid ${(props) => props.theme.palette.background.paper};
    border-bottom: 0;
    background: ${(props) => props.theme.palette.tableTh.background};
    padding: 10px;
    text-align:left;
    line-height: 1.2;
    .filter-box{
      display: flex;
      flex: 0 0 100%;
      justify-content: space-between;
      align-items: center;
      .txt {
        flex-grow: 1;
      }
      button {
        justify-content: center;
        min-width: auto;
        color: ${(props) => props.theme.palette.filterTh.color};
      }
    }
    .MuiTableSortLabel-root {
      transform: rotate(90deg);
      svg {
        color: ${(props) => props.theme.palette.filterTh.color};
      }
    }
  }
  th.filter-th{
    border-bottom: ${(props) =>
      props.theme.name === "DARK"
        ? "1px solid rgba(81, 81, 81, 1);"
        : "1px solid rgba(224, 224, 224, 1);"}
    padding: 10px;
    text-align: center;
    button {
      background: ${(props) => props.theme.palette.filterTh.color};
      color: #fff;
      padding: 5px;
      svg {
        font-size: 1.3rem;
      }
    }
    .del-btn {
      background: #a1a7c4;
      margin-left: 12px;
      padding: 3.5px;
      svg {
        font-size: 1.5rem;
      }
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
          padding: 18px 18px;
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
        padding: 8px 13px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
        color: ${(props) => props.theme.palette.toolbarbtn.color};
        line-height: 1.7;
      }
    }
  }
`;

const EnhancedTableToolbar = () => {

  const dispatch = useDispatch();
  const [value, setValue] = React.useState([null, null]);
  const userId = "6372c6c0a8b2c2ec60b2da52";

  const handleChange = (event) => {
    // dispatch(fetchRiskManagements({ status: event.target.value, count: null,userId:userId, }));
  };
  const today = moment().format("YYYY-MM-DD");
  return (
    <Toolbar>
      <Box className="radio-parent">
        <RadioGroup
          aria-label="Filters"
          name="alertFilters"
          onChange={handleChange}
          defaultValue="All"
        >
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel
            value="Open"
            control={<Radio />}
            label="Open"
          />
          <FormControlLabel
            value="Closed"
            control={<Radio />}
            label="Closed"
          />
          <FormControlLabel
            value="Risk-Managed"
            control={<Radio />}
            label="Risk-Managed"
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
                // dispatch(
                //   fetchRiskManagements({ startDate: startDate, endDate: endDate })
                // );
              }
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField className="date-1" {...startProps} />
                <Box className="hyphen"> - </Box>
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
      const newSelecteds = riskManagementsList.tickersRiskManagement.map(
        (n) => n.id
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const riskManagementsList = useSelector((state) => state.riskManagementsList);
  console.log(riskManagementsList);
  const LinearProgress = styled(MuiLinearProgress)(spacing);

  const alertList = useSelector((state) => state.alertsList);

  const tableIcons = {
    // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    // Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    // DetailPanel: forwardRef((props, ref) => (
    //   <ChevronRight {...props} ref={ref} />
    // )),
    // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    // ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    // Search: forwardRef((props, ref) => <Sort {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    // ThirdStateCheck: forwardRef((props, ref) => (
    //   <Remove {...props} ref={ref} />
    // )),
    // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const New_DATA = alertList.alerts.map((o) => ({
    ticker: o.ticker,
    option_Type: o.option_Type,
    order_Action: o.order_Action,
    price: o.price,
    status: o.status,
    alert_Comment: o.alert_Comment,
    time_Received: o.time_Received,
    time_Executed: o.time_Executed,
    alert_Name: o.alert_Name,
  }));

  return (
    <div>
      <Paper
        sx={{
          px: 6,
          minHeight: 450,
        }}
      >
        <EnhancedTableToolbar numSelected={selected.length} />
        <MaterialTable
              isLoading={ alertList.loading }
              icons={tableIcons}
              title={false}
              columns={[
                {
                  title: "TICKER",
                  field: "ticker",
                  render: (rowData) => rowData.ticker,
                  lookup: [...new Set(alertList.alerts.map((x) => x.ticker))].reduce(
                    (a, v) => ({ ...a, [v]: v }),
                    {}
                  ),
                },
                {
                  title: "OPTION TYPE",
                  field: "option_Type",
                  render: (rowData) => rowData.option_Type,
                  lookup: [
                    ...new Set(alertList.alerts.map((x) => x.option_Type)),
                  ].reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
                {
                  title: "ORDER ACTION",
                  field: "order_Action",
                  render: (rowData) => rowData.order_Action,
                  lookup: [
                    ...new Set(alertList.alerts.map((x) => x.order_Action)),
                  ].reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
                {
                  title: "PRICE NOW",
                  field: "price",
                  render: (rowData) => rowData.price,
                  lookup: [...new Set(alertList.alerts.map((x) => x.price))].reduce(
                    (a, v) => ({ ...a, [v]: v }),
                    {}
                  ),
                },
                {
                  title: "STATUS",
                  field: "status",
                  render: (rowData) => rowData.status,
                  lookup: [...new Set(alertList.alerts.map((x) => x.status))].reduce(
                    (a, v) => ({ ...a, [v]: v }),
                    {}
                  ),
                },
                {
                  title: "ALERT COMMENT",
                  field: "alert_Comment",
                  render: (rowData) => rowData.alert_Comment,
                  lookup: [
                    ...new Set(alertList.alerts.map((x) => x.alert_Comment)),
                  ].reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
                {
                  title: "TIME RECEIVED",
                  field: "time_Received",
                  render: (rowData) => rowData.time_Received,
                  lookup: [
                    ...new Set(alertList.alerts.map((x) => x.time_Received)),
                  ].reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
                {
                  title: "TIME EXECUTED",
                  field: "time_Executed",
                  render: (rowData) => rowData.time_Executed,
                  lookup: [
                    ...new Set(alertList.alerts.map((x) => x.time_Executed)),
                  ].reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
                {
                  title: "ALERT NAME",
                  field: "alert_Name",
                  render: (rowData) => rowData.alert_Name,
                  lookup: [
                    ...new Set(alertList.alerts.map((x) => x.alert_Name)),
                  ].reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
              ]}
              data={New_DATA}
              options={{
                toolbar: false,
                padding:"dense",
                filtering: true,
                search: false,
                pageSize: 10,
                showTitle: false,
              }}
            />
        {/* {riskManagementsList.loading && <LinearProgress />}
        {!riskManagementsList.loading &&
        riskManagementsList.tickersRiskManagement.length ? (
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
                rowCount={riskManagementsList.tickersRiskManagement.length}
              />
              <TableBody>
                {stableSort(
                  riskManagementsList.tickersRiskManagement,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`${row.id}`}
                        selected={isItemSelected}
                      >
                        <TableCell align="left">{row.Symbol}</TableCell>
                        <TableCell align="left">{row.ProfitTarget}</TableCell>
                        <TableCell align="left">
                          {row.LossTarget}
                        </TableCell>
                        <TableCell align="left">{row.Brokerage}</TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
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
                rowCount={riskManagementsList.tickersRiskManagement.length}
              />
              <TableBody>
                <TableCell colSpan={12}>{"Record not found"}</TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={riskManagementsList.tickersRiskManagement.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
      </Paper>
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
      percentageColorProcessed = "#F0142F";
    } else {
      percentageColorProcessed = "#3DD598";
    }

    return percentageColorProcessed;
  }

  const dispatch = useDispatch();

  let date = new Date();
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

  const { user } = useAuth();
  const userId = "6372c6c0a8b2c2ec60b2da52";
  useEffect(() => {
    const initialize = async () => {
      try {
        const isAuthenticated = await user;
        if (isAuthenticated) {
          dispatch(fetchRiskManagements({ userId: userId }));
          // dispatch(
          //   fetchRiskManagements({
          //     userId: userId,
          //     startDate: currentMonthFirstDay,
          //     endDate: currentMonthLastDay,
          //     status: "Processed",
          //     count: true,
          //   })
          // );
          // dispatch(
          //   fetchRiskManagements({
          //     userId: userId,
          //     startDate: currentMonthFirstDay,
          //     endDate: currentMonthLastDay,
          //     status: "Unprocessed",
          //     count: true,
          //   })
          // );
          // dispatch(
          //   fetchRiskManagements({
          //     userId: userId,
          //     startDate: currentMonthFirstDay,
          //     endDate: currentMonthLastDay,
          //     status: "Expired",
          //     count: true,
          //   })
          // );
        }
      } catch (err) {
        console.error(err);
      }
    };
    initialize();
  }, []);

  const alertList = useSelector((state) => state.alertsList);
  const previousAlertList = useSelector((state) => state.previousAlertsList);

  // "% &#8593;";

  return (
    <React.Fragment>
      <Helmet title="Orders" />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4} lg>
          <Stats
            title="Total Positions Closed"
            ispercentage="true"
            amount={alertList.processedAlertsCount}
            percentagetext={
              calculatePercentage(
                previousAlertList.previousProcessedAlertsCount,
                alertList.processedAlertsCount
              ) + "%↓"
            }
            percentagecolor={percentageStatusDisplay(
              previousAlertList.previousProcessedAlertsCount,
              alertList.processedAlertsCount
            )}
            illustration="/static/img/stats/icon-pos1.svg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg>
          <Stats
            title="Total Positions Risk-Managed"
            ispercentage="true"
            amount={alertList.unprocessedAlertsCount}
            percentagetext={
              calculatePercentage(
                previousAlertList.previousUnprocessedAlertsCount,
                alertList.unprocessedAlertsCount
              ) +
              (calculatePercentage(
                previousAlertList.previousUnprocessedAlertsCount,
                alertList.unprocessedAlertsCount
              ) > 0
                ? "%↑"
                : "%↓")
            }
            percentagecolor={percentageStatusDisplay(
              previousAlertList.previousUnprocessedAlertsCount,
              alertList.unprocessedAlertsCount
            )}
            illustration="/static/img/stats/icon-pos1.svg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg>
          <Stats
            title="Today's P & L"
            amount={alertList.expiredAlertsCount}
            ispercentage="true"
            percentagetext={
              calculatePercentage(
                previousAlertList.previousExpiredAlertsCount,
                alertList.expiredAlertsCount
              ) +
              (calculatePercentage(
                previousAlertList.previousExpiredAlertsCount,
                alertList.expiredAlertsCount
              )
                ? "%↑"
                : "%↓")
            }
            percentagecolor={percentageStatusDisplay(
              previousAlertList.previousExpiredAlertsCount,
              alertList.expiredAlertsCount
            )}
            illustration="/static/img/stats/icon-pos3.svg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg>
          <Stats
            ispercentage="true"
            title="P&L"
            amount={(
              alertList.totalAlertsCount / parseInt(totalCurrentHours)
            ).toFixed(2)}
            // chip="dasfvl"
            percentagetext={
              calculatePercentage(
                previousAlertList.previousTotalAlertsCount,
                alertList.totalAlertsCount
              ) + "%↑"
            }
            percentagecolor={percentageStatusDisplay(
              previousAlertList.previousTotalAlertsCount,
              alertList.totalAlertsCount
            )}
            illustration="/static/img/stats/icon-pos3.svg"
          />
        </Grid>
        <Grid className="pro-card" item xs={12} sm={6} md={4} lg={2}>
          <Stats
            title="Pro +"
            ispercentage="false"
            amount="Subscription"
            chip=""
            percentagetext="Details"
          />
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} className="mat-table">
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const Grid = styled(MuiGrid)`
  .MuiPaper-root {
    border: ${(props) =>
      props.theme.name === "DARK" ? "1px solid white;" : "unset"};
  }
  .card-head {
    color: #5a607f;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 28px;
    font-weight: 900;
  }
  .MuiTypography-subtitle2 {
    .percentage-text {
      color: #7e84a3;
      font-size: 12px;
      font-weight: 400;
    }
  }
  &.pro-card {
    .MuiPaper-root {
      color: ${(props) => props.theme.palette.proCard.color};
      background-color: ${(props) => props.theme.palette.proCard.background};
      border: unset !important;
      &:before {
        content: "PRO+";
        font-size: 70px;
        position: absolute;
        padding: 0 0 0 12px;
        font-weight: 700;
        top: 12px;
        color: ${(props) => props.theme.palette.proCard.beforeColor};
      }
      .card-head {
        color: #fff;
        font-size: 31px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      h3 {
        font-size: 19px;
      }
      .MuiTypography-subtitle2 {
        span {
          color: #a1a7c4;
        }
      }
    }
  }
  .mat-table {
    th:first-child {
      min-width: 300px;
    }
    th {
      text-align: left;
      background: ${(props) => props.theme.palette.tableTh.background};
      border-left: 4px solid ${(props) => props.theme.palette.background.paper};
      border-bottom: 0;
      //padding: 6px;
      line-height: 1.2;
    }
    tbody {
      tr:first-child {
        td {
          text-align: left;
          background: ${(props) => props.theme.palette.filterTh.background};
          border-left: 4px solid
            ${(props) => props.theme.palette.background.paper};
          padding: 6px;
          line-height: 1.2;
          .MuiFormLabel-root {
            & > .Mui-focused {
              &:after {
                display: none;
              }
            }
          }
          .MuiInput-root {
            &:before {
              border-bottom: 0;
            }
            &:after {
              display: none;
            }
            .MuiSelect-select {
              background-image: url("static/img/icns/filter-icn.png");
              background-size: 16px;
              background-repeat: no-repeat;
              background-position: left center;
              padding-left: 30px;
            }
          }
        }
      }
    }
  }
`;

export default OrderList;
