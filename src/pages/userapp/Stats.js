import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { rgba } from "polished";

import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";

const illustrationCardStyle = (props) => css`
  ${props.illustration &&
  props.theme.palette.mode !== "dark" &&
  `
    //background: ${rgba(props.theme.palette.primary.main, 0.125)};
    //color: ${props.theme.palette.primary.main};
  `}
`;

const Card = styled(MuiCard)`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing(6)};

  ${illustrationCardStyle}
`;

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;
  padding: ${(props) => props.theme.spacing(6, 4)};
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const illustrationPercentageStyle = (props) => css`
  ${props.illustration &&
  props.theme.palette.mode !== "dark" &&
  `
    color: ${rgba(props.theme.palette.primary.main, 0.85)};
  `}
`;

const Percentage = styled(MuiTypography)`
  span {
    color: ${(props) => props.percentagecolor};
    font-size: 16px;
    font-weight: 700;
    padding: 2px;
    border-radius: 3px;
    margin-right: ${(props) => props.theme.spacing(2)};
  }

  ${illustrationPercentageStyle}
`;

const IllustrationImage = styled.img`
  height: 62px;
  position: absolute;
  right: ${(props) => props.theme.spacing(5)};
  bottom: ${(props) => props.theme.spacing(1)};
  top: ${(props) => props.theme.spacing(1)};
  margin: auto;
  display: none;

  ${(props) => props.theme.breakpoints.between("xs", "lg")} {
    display: block;
  }

  @media (min-width: 1600px) {
    display: block;
  }
`;

const Stats = ({
  title,
  amount,
  chip,
  percentagetext,
  percentagecolor,
  ispercentage,
  illustration,
}) => {
  return (
    <Card illustration={illustration}>
      <CardContent>
        <Typography variant="h6" mb={4} className="card-head">
          {title}
        </Typography>
        <Typography variant="h3" mb={3}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        <Percentage
          variant="subtitle2"
          color="textSecondary"
          percentagecolor={percentagecolor}
          illustration={illustration}
        >
          <span>{percentagetext}</span>
          {ispercentage === "true" && (
            <span className="percentage-text">since last month</span>
          )}
        </Percentage>
        {/* {!illustration && <Chip label={chip} />}  */}
      </CardContent>

      {!!illustration && (
        <IllustrationImage src={illustration} alt="Illustration" />
      )}
    </Card>
  );
};

export default Stats;
