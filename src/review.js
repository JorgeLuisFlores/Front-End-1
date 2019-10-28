import React, { useState, useEffect } from "react";
import axios from "axios";

const Review = props => {
  const [review, setReview] = useState();

  useEffect(() => {
    const id = props.match.params.id;

    const getReview = () => {
      axios
        .get(`https://backend-foodie-fun.herokuapp.com/api/meals/${id}`, config)
        .then(response => {
          console.log(response);
          setReview(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const config = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    axios.get("dataGrab", config);

    getReview();
  }, [props.match.params.id]);

  if (!review) {
    return <div>Loading review information...</div>;
  }

  const {
    item_name,
    restaurant_name,
    food_rating,
    item_comment,

    date_visited,
    item_photo
  } = review;
  return (
    <div>
      <div key={review.id}>{item_photo}</div>
      <div key={review.id}> {restaurant_name} </div>
      <div key={review.id}>{item_name} </div>
      <div key={review.id}>{food_rating}</div>
      <div key={review.id}>{date_visited}</div>
      <div key={review.id}>{item_comment}</div>
    </div>
  );
};

export default Review;
