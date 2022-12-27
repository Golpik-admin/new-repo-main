/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
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
} from "@mui/material";
import { SyncAlt } from "@mui/icons-material";
import Stats from "./Stats";
import { spacing } from "@mui/system";
import { fetchAlerts } from "../../redux/slices/alerts";
import {
  previousFetchAlerts,
} from "../../redux/slices/alertsPreviousMonth";
import Moment from "react-moment";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./cus-style.css";
import moment from "moment-timezone";
import FilterPop from "./Filter";
import useAuth from "../../hooks/useAuth";
import { fetchSettings } from "../../redux/slices/getSettings";

/* Declearation */
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Table = styled(MuiTable)`
  th.table-th:first-child{
    min-width:300px;
  }
  th{
    border-left: 4px solid ${(props) => props.theme.palette.background.paper};
    border-bottom: 0;
    padding: 6px;
    line-height: 1.2;
  }
  th.table-th{
    background: ${(props) => props.theme.palette.tableTh.background};
  }
  th.filter-th{
    background: ${(props) => props.theme.palette.filterTh.background};
    .filter-box{
      display: flex;
      justify-content: space-between;
      button{
        color: ${(props) => props.theme.palette.filterTh.color};
        min-width:30px;
      }
      .MuiTableSortLabel-root{
        transform: rotate(90deg);
        svg{
          color: ${(props) => props.theme.palette.filterTh.color};
        }

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
          border:  ${(props) => props.theme.palette.toolbarbtn.border};
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


const headCells = [
  { id: "ticker", alignment: "left", label: "TICKER" },
  { id: "option_type", alignment: "left", label: "OPTION TYPE" },
  { id: "order_action", alignment: "left", label: "ORDER ACTION" },
  {
    id: "price_fired_alert",
    alignment: "left",
    label: "PRICE WHEN ALERT FIRED",
  },
  { id: "price_now", alignment: "left", label: "PRICE NOW" },
  { id: "status", alignment: "left", label: "STATUS" },
  { id: "alert_comment", alignment: "left", label: "ALERT COMMENT" },
  { id: "time_received", alignment: "left", label: "TIME RECEIVED" },
  { id: "time_executed", alignment: "left", label: "TIME EXECUTED" },
  { id: "alert_Name", alignment: "left", label: "ALERT NAME" },
];

/* Functions  */
function descendingComparator(a, b, orderBy) {
  if (b["time_Received"] < a["time_Received"]) {
    return -1;
  }
  if (b["time_Received"] > a["time_Received"]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "asc"
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


const EnhancedTableHead = (props) => {
  const {
    order,
    orderBy,
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
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="table-th"
          >
            {headCell.label}
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
            <Box 
            className="filter-box"
            >
              <FilterPop />
              <TableSortLabel
                active={true}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                IconComponent={SyncAlt}
              >
                
              </TableSortLabel>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = () => {
  const getSettings = useSelector((state) => state.fetchSettingsList);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState([null, null]);
  const userId = '6372c6c0a8b2c2ec60b2da52';
  const today = moment().format("YYYY-MM-DD");
  /* Functions */
  const handleChange = (event) => {
    dispatch(fetchAlerts({ status: event.target.value, count: null,userId:userId, }));
  };

  

  return (
    <Toolbar>
      <Box className="radio-parent">
        <RadioGroup
          aria-label="Filters"
          name="alertFilters"
          onChange={handleChange}
          defaultValue="all"
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel
            value="Processed"
            control={<Radio />}
            label="Processed"
          />
          <FormControlLabel
            value="Unprocessed"
            control={<Radio />}
            label="Un Processed"
          />
          <FormControlLabel
            value="Expired"
            control={<Radio />}
            label="Expired"
          />
        {getSettings.TestMode &&           
          <FormControlLabel
            value="Test"
            control={<Radio />}
            label="Test"
          />
        }
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
              const userId = '6372c6c0a8b2c2ec60b2da52';
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
                  fetchAlerts({ startDate: startDate, endDate: endDate,userId:userId, })
                );
              }
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField className="date-1" {...startProps}/>
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
      const newSelecteds = alertList.alerts.map((n) => n.id);
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
  const alertList = useSelector((state) => state.alertsList);
  const LinearProgress = styled(MuiLinearProgress)(spacing);



  return (
    <div>
      {alertList.loading && <LinearProgress />}
      <Paper
        sx={{
          px: 6,
          py:2,
          minHeight: 450,
        }}
      >
        <EnhancedTableToolbar numSelected={selected.length}
          sx={{p:0}}
          className="murtaza"
        />        

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

              {!alertList.loading && alertList.alerts.length &&
              <TableBody>
                {stableSort(alertList.alerts, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <>
                        <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`${row.id}`}
                        selected={isItemSelected}
                      >
                        <TableCell align="left">{row.ticker}</TableCell>
                        <TableCell align="left">{row.option_Type}</TableCell>
                        <TableCell align="left">
                          {row.order_Action.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell align="left">{"N/A"}</TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="left">{row.alert_Comment}</TableCell>
                        <TableCell align="left">
                          {row.time_Received !== null ? (
                            <Moment format="YYYY-MM-DD hh:mm:ss">
                              {row.time_Received}
                            </Moment>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.time_Executed !== null ? (
                            <Moment format="YYYY-MM-DD hh:mm:ss">
                              {row.time_Executed}
                            </Moment>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align="left">{row.alert_Name}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
            </TableBody>
            }
            {!alertList.loading && !alertList.alerts.length &&
            <TableBody>
              <TableRow>
                  <TableBody>
                    <TableCell colSpan={12}>{"Record not found"}</TableCell>
                  </TableBody>
              </TableRow>
            </TableBody>
            }
          </Table>
          {!alertList.loading && alertList.alerts.length &&

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={alertList.alerts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
          </TableContainer>
        
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
    const userId = '6372c6c0a8b2c2ec60b2da52';  
    useEffect(() => {
      const initialize = async () => {
        try {
          const isAuthenticated = await user;
          let date = new Date();
          const last30Days = moment(date)
            .subtract(30,"days")
            .format("YYYY-MM-DD");
          const todayDate = moment().format("YYYY-MM-DD");
        
          if (isAuthenticated) {

            dispatch(fetchSettings({ User_Id: user.id }));
            dispatch(fetchAlerts({ startDate: last30Days,
              endDate: todayDate,userId: userId }));
      
            dispatch(
              fetchAlerts({
                userId: userId,
                startDate: currentMonthFirstDay,
                endDate: currentMonthLastDay,
                status: "Processed",
                count: true,
              })
            );
            dispatch(
              previousFetchAlerts({
                userId: userId,
                startDate: previousMonthFirstDay,
                endDate: previousMonthLastDay,
                status: "Processed",
                count: true,
              })
            );

            dispatch(
              fetchAlerts({
                userId: userId,
                startDate: currentMonthFirstDay,
                endDate: currentMonthLastDay,
                status: "Unprocessed",
                count: true,
              })
            );
            dispatch(
              previousFetchAlerts({
                userId: userId,
                startDate: previousMonthFirstDay,
                endDate: previousMonthLastDay,
                status: "Unprocessed",
                count: true,
              })
            );

            dispatch(
              fetchAlerts({
                userId: userId,
                startDate: currentMonthFirstDay,
                endDate: currentMonthLastDay,
                status: "Expired",
                count: true,
              })
            );
            dispatch(
              previousFetchAlerts({
                userId: userId,
                startDate: previousMonthFirstDay,
                endDate: previousMonthLastDay,
                status: "Expired",
                count: true,
              })
            );
          }
        } catch (err) {
          console.error(err);
        }
    

      }
      initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            title="Total Alerts Processed"
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
            illustration="/static/img/stats/icon-1.svg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg>
          <Stats
            title="Total Alerts Unprocessed"
            ispercentage="true"
            amount={alertList.unprocessedAlertsCount}
            percentagetext={
              calculatePercentage(
                previousAlertList.previousUnprocessedAlertsCount,
                alertList.unprocessedAlertsCount
              ) + (calculatePercentage(
                previousAlertList.previousUnprocessedAlertsCount,
                alertList.unprocessedAlertsCount
              )  > 0 ? "%↑" : "%↓")
            }
            percentagecolor={percentageStatusDisplay(
              previousAlertList.previousUnprocessedAlertsCount,
              alertList.unprocessedAlertsCount
            )}
            illustration="/static/img/stats/icon-2.svg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg>
          <Stats
            title="Total Alerts Expired"
            amount={alertList.expiredAlertsCount}
            ispercentage="true"
            percentagetext={
              calculatePercentage(
                previousAlertList.previousExpiredAlertsCount,
                alertList.expiredAlertsCount
              ) +  ( calculatePercentage(
                previousAlertList.previousExpiredAlertsCount,
                alertList.expiredAlertsCount
              ) ? "%↑" : "%↓")
            }
            percentagecolor={percentageStatusDisplay(
              previousAlertList.previousExpiredAlertsCount,
              alertList.expiredAlertsCount
            )}
            illustration="/static/img/stats/icon-3.svg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg>
          <Stats
                        ispercentage="true"
            title="Alerts Per Hour"
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
            illustration="/static/img/stats/icon-4.svg"
          />
        </Grid>
        <Grid className="pro-card" item xs={12} sm={6} md={4} lg={2} >
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
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const Grid = styled(MuiGrid)`
    .MuiPaper-root{
      border: ${(props) => props.theme.name === 'DARK' ? '1px solid white;' :'unset'} 
    }
  .card-head{
    color:#5A607F;
    font-size:16px;
    font-weight:400;
    margin-bottom:10px;
  }
  h3{
    font-size:28px;
    font-weight:900;
  }
  .MuiTypography-subtitle2{
    .percentage-text{
      color:#7E84A3;
      font-size:12px;
      font-weight:400;
    }
  }
  &.pro-card{
    .MuiPaper-root{
      color: ${(props) => props.theme.palette.proCard.color};
      background-color: ${(props) => props.theme.palette.proCard.background};
      border: unset !important; 
      &:before{
        content: "PRO+";
        font-size: 70px;
        position: absolute;
        padding: 0 0 0 12px;
        font-weight: 700;
        top:12px;
        color:${(props) => props.theme.palette.proCard.beforeColor};
      }
      .card-head{
        color:#fff;
        font-size:31px;
        font-weight:700;
        margin-bottom:10px;
      }
      h3{
        font-size:19px;
      }
      .MuiTypography-subtitle2{
        span{
          color:#A1A7C4;
        }
      }
    }
  }
`;

export default OrderList;
