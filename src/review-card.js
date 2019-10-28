import React from "react";
import { Card, CardBody, CardText } from "reactstrap";

const ReviewCard = props => {
  return (
    <Card>
      <CardBody>
        <CardText>{props.data}</CardText>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
