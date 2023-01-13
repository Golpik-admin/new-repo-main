import * as React from "react";
import { Box, Link } from "@mui/material";
import styled from "@emotion/styled";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .MuiFormControl-root:first-of-type {
    margin-right: 25px;
  }
  a {
    width: 151px;
    font-size: 14px;
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.back-btn {
      border: 1px solid #a1a7c4;
      color: #7e84a3;
      margin-right: 40px;
    }
    &.next-btn {
      background: #2b75fd;
      color: #fff;
    }
  }
`;

const steps = [
  {
    label: "Get Started",
    image: "/static/img/get-started-icn.png",
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many`,
  },
  {
    label: "Get Started",
    image: "/static/img/get-started-icn.png",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many",
  },
  {
    label: "Get Started",
    image: "/static/img/get-started-icn.png",
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many`,
  },
];

export default function TextMobileStepper() {
  const [activeStep] = React.useState(0);
  const maxSteps = steps.length;

  return (
    <Box
      sx={{
        maxWidth: 700,
        flexGrow: 1,
        background: "#fff",
        borderRadius: "4px",
        p: 5,
      }}
    >
      <Box
        sx={{
          maxWidth: 700,
          width: "100%",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ mb: 5 }}>
          {" "}
          {steps[activeStep].label}
        </Typography>
        <img src={steps[activeStep].image} className="" alt="" />
        <Typography fontSize="16px" color="#A1A7C4" sx={{ mt: 5 }}>
          {steps[activeStep].description}
        </Typography>
        <Box sx={{ my: 8 }}>
          <Div className="btn-wrap">
            {/* <Button type="submit" variant="outlined" className="back-btn">
              SKIP
            </Button> */}
            {/* <Button type="submit" variant="contained" className="neck-btn">
              GET STARTED
            </Button> */}
            <Link
              href="alerts"
              underline="none"
              variant="outlined"
              className="back-btn"
            >
              SKIP
            </Link>
            <Link
              href="help-center"
              underline="none"
              variant="contained"
              className="next-btn"
            >
              GET STARTED
            </Link>
          </Div>
        </Box>
      </Box>
      <MobileStepper
        sx={{ background: "#fff", justifyContent: "center" }}
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        // nextButton={
        //   <Button
        //     size="small"
        //     onClick={handleNext}
        //     disabled={activeStep === maxSteps - 1}
        //   >
        //     Next
        //     {theme.direction === "rtl" ? (
        //       <KeyboardArrowLeft />
        //     ) : (
        //       <KeyboardArrowRight />
        //     )}
        //   </Button>
        // }
        // backButton={
        //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === "rtl" ? (
        //       <KeyboardArrowRight />
        //     ) : (
        //       <KeyboardArrowLeft />
        //     )}
        //     Back
        //   </Button>
        // }
      />
    </Box>
  );
}
