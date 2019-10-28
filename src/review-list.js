import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyle = styled(Link)`
  font-size: 16px;
  width: 100%;
  height: 125px;
  text-decoration: none;
  display: flex;
  justify-content: center;
`;

const ReviewList = props => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = () => {
      axios
        .get("https://backend-foodie-fun.herokuapp.com/api/meals/", config)
        .then(response => {
          console.log(response);
          setReviews(response.data);
        })
        .catch(error => {
          console.error("Server Error", error);
        });
    };

    const config = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    axios.get("dataGrab", config);

    getReviews();
  }, []);

  return (
    <div>
      {reviews.map(review => (
        <LinkStyle key={review.id} to={`/review/${review.id}`}>
          <ReviewDetails key={review.id} review={review} />
        </LinkStyle>
      ))}
    </div>
  );
};

function ReviewDetails({ review }) {
  const {
    item_name,
    restaurant_name,
    food_rating,
    item_comment,
    item_photo
  } = review;
  return (
    <div>
      <div>
        {item_photo} <br />
        {food_rating} <br />
        {restaurant_name} <br />
        {item_name} <br />
        {item_comment}
      </div>
    </div>
  );
}

export default ReviewList;
