/* eslint-disable prettier/prettier */
import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider as MuiDivider,
  Grid as MuiGrid,
  Toolbar,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Paper,
  Input,
} from "@mui/material";
import {
  FilterList,
  FirstPage,
  LastPage,
  ArrowDownward,
  DeleteOutline,
  Clear,
  AddBox,
  Check,
} from "@mui/icons-material";
import Stats from "./Stats";
import { spacing } from "@mui/system";
import { useEffect } from "react";
import { fetchRiskManagements } from "../../redux/slices/getRiskManagement";
import { updateRiskManagements } from "../../redux/slices/updateRiskManagement";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./cus-style.css";
import moment from "moment-timezone";
import useAuth from "../../hooks/useAuth";
import MaterialTable from "material-table";
import { ChevronLeft, ChevronRight, Edit } from "react-feather";

function RiskManagement() {
  const Divider = styled(MuiDivider)(spacing);
  const alertList = useSelector((state) => state.alertsList);
  const previousAlertList = useSelector((state) => state.previousAlertsList);

  const riskManagementsList = useSelector((state) => state.riskManagementsList);

  const dispatch = useDispatch();

  const { user } = useAuth();
  // const userId = "6372c6c0a8b2c2ec60b2da52";
  const userId = user.id;

  let date = new Date();
  const currentMonthFirstDay = moment(date)
    .startOf("month")
    .format("YYYY-MM-DD");
  const currentMonthLastDay = moment(date).endOf("month").format("YYYY-MM-DD");

  const totalCurrentHours = moment
    .duration(
      moment(currentMonthLastDay, "YYYY/MM/DD").diff(
        moment(currentMonthFirstDay, "YYYY/MM/DD")
      )
    )
    .asHours();

  const configuration = {
    toolbar: true,
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
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    // DetailPanel: forwardRef((props, ref) => (
    //   <ChevronRight {...props} ref={ref} />
    // )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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

  const collections = riskManagementsList.tickersRiskManagement
    ? riskManagementsList.tickersRiskManagement.map((o) => ({
        Symbol: o.Symbol,
        ProfitTarget: o.ProfitTarget,
        LossTarget: o.LossTarget,
        Brokerage: o.Brokerage,
      }))
    : [];

  const fields = [
    {
      title: "TICKER",
      field: "Symbol",
      editComponent: (editProps) => (
        <Input
          autoFocus={true}
          onChange={(e) => editProps.onChange(e.target.value)}
          value={editProps.rowData.Symbol}
        />
      ),
      render: (rowData) => rowData.Symbol,
      lookup: riskManagementsList.tickersRiskManagement
        ? [
            ...new Set(
              riskManagementsList.tickersRiskManagement.map((x) => x.Symbol)
            ),
          ]
            .filter(Boolean)
            .reduce((a, v) => ({ ...a, [v]: v }), {})
        : {},
    },
    {
      title: "PROFIT TARGET",
      field: "ProfitTarget",
      editComponent: (editProps) => (
        <Input
          autoFocus={true}
          onChange={(e) => editProps.onChange(e.target.value)}
          value={editProps.rowData.ProfitTarget}
        />
      ),
      render: (rowData) => rowData.ProfitTarget,
      lookup: riskManagementsList.tickersRiskManagement
        ? [
            ...new Set(
              riskManagementsList.tickersRiskManagement.map(
                (x) => x.ProfitTarget
              )
            ),
          ]
            .filter(Boolean)
            .reduce((a, v) => ({ ...a, [v]: v }), {})
        : {},
    },
    {
      title: "LOSS / MINIMUM PROFIT",
      field: "LossTarget",
      editComponent: (editProps) => (
        <Input
          autoFocus={true}
          onChange={(e) => editProps.onChange(e.target.value)}
          value={editProps.rowData.LossTarget}
        />
      ),
      render: (rowData) => rowData.LossTarget,
      lookup: riskManagementsList.tickersRiskManagement
        ? [
            ...new Set(
              riskManagementsList.tickersRiskManagement.map((x) => x.LossTarget)
            ),
          ]
            .filter(Boolean)
            .reduce((a, v) => ({ ...a, [v]: v }), {})
        : {},
    },
    {
      title: "ACTIVE POSITIONS",
      field: "Brokerage",
      editComponent: (editProps) => (
        <Input
          autoFocus={true}
          onChange={(e) => editProps.onChange(e.target.value)}
          value={editProps.rowData.Brokerage}
        />
      ),
      render: (rowData) => rowData.Brokerage,
      lookup: riskManagementsList.tickersRiskManagement
        ? [
            ...new Set(
              riskManagementsList.tickersRiskManagement.map((x) => x.Brokerage)
            ),
          ]
            .filter(Boolean)
            .reduce((a, v) => ({ ...a, [v]: v }), {})
        : {},
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
      try {
        const isAuthenticated = await user;
        if (isAuthenticated) {
          dispatch(fetchRiskManagements({ userId: userId }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Paper
            sx={{
              px: 6,
              py: 2,
              minHeight: 450,
            }}
          >
            <EnhancedTableToolbar sx={{ p: 0 }} userId={userId} />
            <MaterialTable
              isLoading={riskManagementsList.loading}
              icons={tableIcons}
              columns={fields}
              data={collections}
              options={configuration}
              editable={{
                // onBulkUpdate: (changes) => {
                //   return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //       // let copyData = [...data];
                //       // setData(getNewDataBulkEdit(changes, copyData));
                //       resolve();
                //     }, 1000);
                //   });
                // },
                onRowAddCancelled: (rowData) => alert("Row adding cancelled"),
                onRowAdd: (newData) => {
                  return new Promise((resolve, reject) => {
                    dispatch(
                      updateRiskManagements({
                        userId: userId,
                        Symbol: newData.Symbol,
                        ProfitTarget: newData.ProfitTarget,
                        LossTarget: newData.LossTarget,
                        Brokerage: newData.Brokerage,
                      })
                    );
                    setTimeout(() => {
                      resolve();
                      // newData.id = "uuid-" + Math.random() * 10000000;
                      // setData([...data, newData]);
                    }, 1000);
                  });
                },
                onRowUpdateCancelled: (rowData) =>
                  alert("Row editing cancelled"),
                // onRowUpdate: (newData, oldData) => {
                //   return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //       // const dataUpdate = [...data];
                //       // // In dataUpdate, find target
                //       // const target = dataUpdate.find(
                //       //   (el) => el.id === oldData.tableData.id
                //       // );
                //       // const index = dataUpdate.indexOf(target);
                //       // dataUpdate[index] = newData;
                //       // setData([...dataUpdate]);
                //       resolve();
                //     }, 1000);
                //   });
                // },
                // onRowDelete: (oldData) => {
                //   return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //       // const dataDelete = [...data];
                //       // const target = dataDelete.find(
                //       //   (el) => el.id === oldData.tableData.id
                //       // );
                //       // const index = dataDelete.indexOf(target);
                //       // dataDelete.splice(index, 1);
                //       // setData([...dataDelete]);
                //       resolve();
                //     }, 1000);
                //   });
                // },
              }}
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
  const dispatch = useDispatch();
  const [value, setValue] = React.useState([null, null]);
  const userId = props.userId;
  const today = moment().format("YYYY-MM-DD");
  const handleChange = () => {
    // dispatch(fetchRiskManagements({ status: event.target.value, count: null,userId:userId, }));
  };
  const onChangeDate = (newValue) => {
    let startDate =
      newValue[0] !== null ? moment(newValue[0].$d).format("YYYY-MM-DD") : null;
    let endDate =
      newValue[1] !== null ? moment(newValue[1].$d).format("YYYY-MM-DD") : null;
    if (startDate !== null && endDate !== null) {
      dispatch(fetchRiskManagements({ userId: userId }));
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
          defaultValue="All"
        >
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel value="Open" control={<Radio />} label="Open" />
          <FormControlLabel value="Closed" control={<Radio />} label="Closed" />
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

export default RiskManagement;
