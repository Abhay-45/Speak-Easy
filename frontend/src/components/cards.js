import React from "react";
import COLORS from "../constants/theme";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const Cards = ({ title, score, description, comment, color }) => {
  return (
    <Card
      style={{
        width: "20rem",
        height: "20rem",
        backgroundColor: COLORS.LIGHTBLUE,
        border: "none",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardBody
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CardTitle tag="h5" style={{ paddingBottom: "auto" }}>
          {title}
        </CardTitle>
        <CardText style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row",          alignItems: "baseline", justifyContent: "center" }}>
            <p style={{ fontSize: 60, color: color }}>{score}</p>
            {title === "Pace" && <p style={{ fontSize: 20, paddingLeft: 5 }}> wps</p>}
          </div>

          <p>{comment}</p>
          <p>{description}</p>
        </CardText>
      </CardBody>
    </Card>
  );
};
export default Cards;
