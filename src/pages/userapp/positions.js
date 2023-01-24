/* eslint-disable jsx-a11y/alt-text */
import React, { forwardRef, useEffect } from "react";
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
import { green, red } from "@mui/material/colors";
import Stats from "./Stats";
import { spacing } from "@mui/system";
import { fetchPositions, fetchPNL } from "../../redux/slices/possitions";
import {
  fetchPositionsPrevious,
  fetchPNLPrevious,
} from "../../redux/slices/positionsPreviousMonth";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./cus-style.css";
import moment from "moment-timezone";

import MaterialTable from "material-table";
import { ChevronLeft, ChevronRight } from "react-feather";
import useAuth from "../../hooks/useAuth";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

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

const EnhancedTableToolbar = (props) => {
  // Here was 'let'
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(
      fetchPositions({
        userId: props.userId,
        status: event.target.value,
        count: null,
      })
    );
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
                  fetchPositions({
                    userId: props.userId,
                    startDate: startDate,
                    endDate: endDate,
                  })
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

function Positions() {
  const { user } = useAuth();
  const userId = user.id;
  const positionsList = useSelector((state) => state.positionsList);

  const configuration = {
    toolbar: false,
    padding: "dense",
    filtering: true,
    search: false,
    pageSize: 10,
    paginationType: "stepped",
    showTitle: false,
    actionsColumnIndex: -1,
    addRowPosition: "first",
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

  const New_DATA = positionsList.positions.map((o) => ({
    ticker: o.ticker,
    option_Symbol: o.option_Symbol,
    option_Type: o.option_Type,
    buy_Price_Executed: o.buy_Price_Executed,
    quantity: o.quantity,
    buy_Order_Reason: o.buy_Order_Reason,
    capital_Committed: o.capital_Committed,
    status: o.status,
    buy_Time_Executed: o.buy_Time_Executed,
    sell_Time_Executed: o.sell_Time_Executed,
    sell_Price_Executed: o.sell_Price_Executed,
    pnL: o.pnL,
    sell_Order_Reason: o.sell_Order_Reason,
    ticker_image_url: "/static/img/avatars/user.png",
  }));

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

  useEffect(() => {
    dispatch(fetchPositions({ userId: userId }));
    dispatch(
      fetchPositions({
        userId: userId,
        startDate: currentMonthFirstDay,
        endDate: currentMonthLastDay,
        status: "open",
        count: true,
      })
    );

    dispatch(
      fetchPositionsPrevious({
        userId: userId,
        startDate: previousMonthFirstDay,
        endDate: previousMonthLastDay,
        status: "open",
        count: true,
      })
    );

    dispatch(
      fetchPNL({
        userId: userId,
        startDate: currentMonthFirstDay,
        endDate: currentMonthLastDay,
        apiCall: "totalPnl",
        count: true,
      })
    );
    dispatch(
      fetchPNLPrevious({
        userId: userId,
        startDate: previousMonthFirstDay,
        endDate: previousMonthLastDay,
        apiCall: "totalPnl",
        count: true,
      })
    );

    dispatch(
      fetchPNL({
        userId: userId,
        startDate: today,
        endDate: today,
        apiCall: "today",
        count: true,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            illustration="/static/img/stats/icon-pos1.svg"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Positions Closed"
            amount={positionsList.positionsOpen}
            // chip="Today"
            percentagetext={
              calculatePercentage(
                positionsListPrevious.positionsClosedPrevious,
                positionsList.positionsClosed
              ) + "%"
            }
            percentagecolor={percentageStatusDisplay(
              positionsListPrevious.positionsClosedPrevious,
              positionsList.positionsClosed
            )}
            illustration="/static/img/stats/icon-pos2.svg"
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
            illustration="/static/img/stats/icon-pos1.svg"
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
            illustration="/static/img/stats/icon-pos3.svg"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg>
          <Stats
            title="Recent Positions"
            amount="45"
            // chip="Yearly"
            percentagetext="-9%"
            percentagecolor={red[500]}
            illustration="/static/img/stats/icon-pos3.svg"
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
        <Grid item xs={12} className="mat-table">
          <Paper
            sx={{
              padding: 8,
              minHeight: 450,
            }}
          >
            <EnhancedTableToolbar userId={userId} />

            <MaterialTable
              isLoading={positionsList.loading}
              icons={tableIcons}
              title={false}
              options={configuration}
              columns={[
                {
                  title: "TICKER",
                  field: "ticker",
                  //render: (rowData) => rowData.ticker,
                  render: (rowData) => {
                    const styles = { width: 40, borderRadius: "50%" };
                    return (
                      <div className="img-wrap">
                        <img src={rowData.ticker_image_url} style={styles} />{" "}
                        <span>{rowData.ticker}</span>
                      </div>
                    );
                  },
                  lookup: [
                    ...new Set(positionsList.positions.map((x) => x.ticker)),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "OPTION SYMBOL",
                  field: "option_Symbol",
                  render: (rowData) => rowData.option_Symbol,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.option_Symbol)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "OPTION TYPE",
                  field: "option_Type",
                  render: (rowData) => rowData.option_Type,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.option_Type)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "PRICE EXECUTED",
                  field: "buy_Price_Executed",
                  render: (rowData) => rowData.buy_Price_Executed,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.buy_Price_Executed)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "QTY",
                  field: "quantity",
                  render: (rowData) => rowData.quantity,
                  lookup: [
                    ...new Set(positionsList.positions.map((x) => x.quantity)),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "ALERT DESCRIPTION",
                  field: "buy_Order_Reason",
                  render: (rowData) => rowData.buy_Order_Reason,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.buy_Order_Reason)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "CAPITAL COMMITED",
                  field: "capital_Committed",
                  render: (rowData) => rowData.capital_Committed,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.capital_Committed)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "STATUS",
                  field: "status",
                  render: (rowData) => rowData.status,
                  lookup: [
                    ...new Set(positionsList.positions.map((x) => x.status)),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "TIME BOUGHT",
                  field: "buy_Time_Executed",
                  render: (rowData) => rowData.buy_Time_Executed,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.buy_Time_Executed)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "TIME SOLD",
                  field: "sell_Time_Executed",
                  render: (rowData) => rowData.sell_Time_Executed,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.sell_Time_Executed)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },

                {
                  title: "PRICE NOW",
                  field: "sell_Price_Executed",
                  render: (rowData) => rowData.sell_Price_Executed,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.sell_Price_Executed)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
                {
                  title: "P & L",
                  field: "pnL",
                  render: (rowData) => rowData.pnL,
                  lookup: [
                    ...new Set(positionsList.positions.map((x) => x.pnL)),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
                {
                  title: "Description",
                  field: "sell_Order_Reason",
                  render: (rowData) => rowData.sell_Order_Reason,
                  lookup: [
                    ...new Set(
                      positionsList.positions.map((x) => x.sell_Order_Reason)
                    ),
                  ]
                    .filter(Boolean)
                    .reduce((a, v) => ({ ...a, [v]: v }), {}),
                },
              ]}
              data={New_DATA}
            />
          </Paper>
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
      //min-width: 300px;
    }
    th {
      text-align: left;
      background: ${(props) => props.theme.palette.tableTh.background};
      border-left: 4px solid ${(props) => props.theme.palette.background.paper};
      border-bottom: 0;
      padding: 6px;
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

export default Positions;
