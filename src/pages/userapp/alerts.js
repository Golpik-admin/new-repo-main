/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import React, { forwardRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider as MuiDivider,
  Grid as MuiGrid,
  Paper as MuiPaper,
  Toolbar,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import {
  ArrowDownward,
  FilterList,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

import Stats from "./Stats";
import { spacing } from "@mui/system";
import { fetchAlerts } from "../../redux/slices/alerts";
import { previousFetchAlerts } from "../../redux/slices/alertsPreviousMonth";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./cus-style.css";
import moment from "moment-timezone";
import useAuth from "../../hooks/useAuth";
import { fetchSettings } from "../../redux/slices/getSettings";

import MaterialTable from "material-table";
import { ChevronLeft, ChevronRight } from "react-feather";

/* Declearation */
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

function Alerts() {
  const alertList = useSelector((state) => state.alertsList);
  const dispatch = useDispatch();
  const { getUserInfo } = useAuth();
  const [userId, setUserId] = useState(null);
  const previousAlertList = useSelector((state) => state.previousAlertsList);
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

  const configuration = {
    toolbar: false,
    padding: "dense",
    filtering: true,
    search: false,
    pageSize: 10,
    paginationType: "stepped",
    actionsColumnIndex: -2,
    showTitle: false,
  };

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

  const collections = alertList.alerts.map((o) => ({
    ticker: o.ticker,
    option_Type: o.option_Type,
    order_Action: o.order_Action,
    price: o.price,
    status: o.status,
    alert_Comment: o.alert_Comment,
    time_Received: o.time_Received ? moment(o.time_Received).format("lll") : "",
    time_Executed: o.time_Executed ? moment(o.time_Executed).format("lll") : "",
    alert_Name: o.alert_Name,
    ticker_image_url: o.ticker_Url, //'/static/img/avatars/user.png',
  }));
  const fields = [
    {
      title: "TICKER",
      field: "ticker",
      render: (rowData) => {
        const styles = { width: 40, borderRadius: "50%" };
        return (
          <div className="img-wrap">
            <img src={rowData.ticker_image_url} style={styles} />{" "}
            <span>{rowData.ticker}</span>
          </div>
        );
      },
      lookup: [...new Set(alertList.alerts.map((x) => x.ticker))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
    {
      title: "OPTION TYPE",
      field: "option_Type",
      render: (rowData) => rowData.option_Type,
      lookup: [...new Set(alertList.alerts.map((x) => x.option_Type))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
    {
      title: "ORDER ACTION",
      field: "order_Action",
      render: (rowData) => rowData.order_Action,
      lookup: [...new Set(alertList.alerts.map((x) => x.order_Action))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
    {
      title: "PRICE NOW",
      field: "price",
      render: (rowData) => rowData.price,
      lookup: [...new Set(alertList.alerts.map((x) => x.price))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
    {
      title: "STATUS",
      field: "status",
      render: (rowData) => rowData.status,
      lookup: [...new Set(alertList.alerts.map((x) => x.status))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
    {
      title: "ALERT COMMENT",
      field: "alert_Comment",
      render: (rowData) => rowData.alert_Comment,
      lookup: [...new Set(alertList.alerts.map((x) => x.alert_Comment))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
    {
      title: "TIME RECEIVED",
      field: "time_Received",
      render: (rowData) => rowData.time_Received,
      lookup: [...new Set(alertList.alerts.map((x) => x.time_Received))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
    {
      title: "TIME EXECUTED",
      field: "time_Executed",
      render: (rowData) => rowData.time_Executed,
      lookup: [...new Set(alertList.alerts.map((x) => x.time_Executed))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
    {
      title: "ALERT NAME",
      field: "alert_Name",
      render: (rowData) => rowData.alert_Name,
      lookup: [...new Set(alertList.alerts.map((x) => x.alert_Name))]
        .filter(Boolean)
        .reduce((a, v) => ({ ...a, [v]: v }), {}),
    },
  ];
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

  useEffect(() => {
    const initialize = async () => {
      await getUserInfo()
        .then((res) => {
          const userId = res.sub.split("|")[1];
          setUserId(userId);
          let date = new Date();
          const last30Days = moment(date)
            .subtract(30, "days")
            .format("YYYY-MM-DD");
          const todayDate = moment().format("YYYY-MM-DD");

          dispatch(fetchSettings({ User_Id: res.sub }));
          dispatch(
            fetchAlerts({
              startDate: last30Days,
              endDate: todayDate,
              userId: userId,
            })
          );

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
        })
        .catch((err) => {
          console.log(err);
        });
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {/* {alertList.loading && <LinearProgress />} */}
          <Paper
            sx={{
              px: 6,
              py: 2,
              minHeight: 450,
            }}
          >
            <EnhancedTableToolbar sx={{ p: 0 }} userId={userId} />
            <MaterialTable
              isLoading={alertList.loading}
              icons={tableIcons}
              columns={fields}
              data={collections}
              options={configuration}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

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
const EnhancedTableToolbar = (props) => {
  const getSettings = useSelector((state) => state.fetchSettingsList);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState([null, null]);
  const userId = props.userId;
  const today = moment().format("YYYY-MM-DD");
  /* Functions */
  const handleChange = (event) => {
    dispatch(
      fetchAlerts({ status: event.target.value, count: null, userId: userId })
    );
  };
  const onChangeDate = (newValue) => {
    let startDate =
      newValue[0] !== null ? moment(newValue[0].$d).format("YYYY-MM-DD") : null;
    let endDate =
      newValue[1] !== null ? moment(newValue[1].$d).format("YYYY-MM-DD") : null;
    if (startDate !== null && endDate !== null) {
      dispatch(
        fetchAlerts({
          startDate: startDate,
          endDate: endDate,
          userId: userId,
        })
      );
    }
    setValue(newValue);
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
          {getSettings.TestMode && (
            <FormControlLabel value="Test" control={<Radio />} label="Test" />
          )}
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
            onChange={onChangeDate}
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
      .img-wrap {
        display: flex;
        align-items: center;
        img {
          padding-right: 10px;
        }
      }
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
  .MuiTablePagination-toolbar {
    .MuiButtonBase-root {
      color: #7e84a3;
    }
    .MuiButton-containedSizeSmall {
      color: #fff;
      background: #2b75fd;
    }
  }
`;

export default Alerts;
