import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "grommet";
import axios from "axios";

const Header = styled.nav`
  width:100%;
  height 50px;
  background: #E76F25;
  margin-bottom: 15%;
`;

const ImgLogo = styled.img`
  display: block;
  margin: 0 auto;
  padding: 2%;
  width: 28%;
`;

const StyledH1 = styled.h1`
  width: 100%;
  margin: 4% 10%;
`;

const StyledLabel = styled.label`
  width: 100%;
  margin: 1% 10%;
`;

const StyledField = styled(Field)`
  width: 80%;
  padding: 5px;
  margin: 2% 10%;
  border-radius: 10px;
  border: 2px solid #d0d0d0;
  height 30px;
  font-size:16px;
`;

const MyStyledButton = styled(Button)`
  text-align: center;
  margin: 20% 0% 10% 10%;
  font-weight: bold;
  background-color: #e76f25;
  font-size: 30px;
  width: 82.5%;
  height: 60px;
  border-radius: 10px;
  @media (min-width: 960px) and (max-width: 1400px) {
    background-color: black;
  }
`;

const StyledFooter = styled.footer`
  margin-top: 60%;
  width:100%;
  height 150px;
  background: #2B444B;

`;

const LinkStyle = styled(Link)`
  font-size: 16px;
  color: #d0d0d0;
  text-decoration: underline;
  display: flex;
  justify-content: center;
`;

const CopyrightStyle = styled.p`
  display: flex;
  justify-content: center;
  color: #d0d0d0;
`;

function ReviewForm({ errors, touched, history, ...props }) {
  return (
    <div>
      <Header>
        <ImgLogo src={require("./img/foodielogo.png")}></ImgLogo>
      </Header>

      <StyledH1>Add Experience</StyledH1>
      <Form className="review_form">
        <StyledLabel className="restaurant_name">
          Restaurant
          <StyledField
            className="review_input"
            type="text"
            name="restaurant_name"
          />
          {touched.restaurant_name && errors.restaurant_name && (
            <p className="error">{errors.restaurant_name}</p>
          )}
        </StyledLabel>

        <StyledLabel className="restaurant_type">
          Restaurant Type
          <StyledField
            className="review_input"
            type="text"
            name="restaurant_type"
          />
          {touched.restaurant_type && errors.restaurant_type && (
            <p className="error">{errors.restaurant_type}</p>
          )}
        </StyledLabel>

        <StyledLabel className="item_name">
          Food Item
          <StyledField
            className="review_input"
            type="text"
            name="item_name"
            placeholder="What did you eat?"
          />
          {touched.item_name && errors.item_name && (
            <p className="error">{errors.item_name}</p>
          )}
        </StyledLabel>

        <StyledLabel className="date_visited">
          Date of Visit
          <StyledField
            className="review_input"
            type="date"
            name="date_visited"
          />
          {touched.date_visited && errors.date_visited && (
            <p className="error">{errors.date_visited}</p>
          )}
        </StyledLabel>

        <StyledLabel className="food_rating">
          Rating
          <StyledField
            className="review_input"
            type="number"
            min={1}
            max={5}
            step={0.1}
            name="food_rating"
          />
          {touched.food_rating && errors.food_rating && (
            <p className="error">{errors.food_rating}</p>
          )}
        </StyledLabel>

        <StyledLabel className="price">
          Price
          <StyledField
            className="review_input"
            type="number"
            min={0}
            step={0.01}
            name="price"
          />
          {touched.price && errors.price && (
            <p className="error">{errors.price}</p>
          )}
        </StyledLabel>

        <StyledLabel className="wait_time">
          Wait Time
          <StyledField className="review_input" type="text" name="wait_time" />
          {touched.wait_time && errors.wait_time && (
            <p className="error">{errors.wait_time}</p>
          )}
        </StyledLabel>

        <StyledLabel className="item_comment">
          Other Comments
          <StyledField component="textarea" name="item_comment" />
          {touched.item_comment && errors.item_comment && (
            <p className="error">{errors.item_comment}</p>
          )}
        </StyledLabel>

        <MyStyledButton primary type="submit">
          {props.isLoading ? "..." : "Share Experience"}
        </MyStyledButton>
      </Form>

      <StyledFooter>
        <br />
        <br />
        <LinkStyle to="#">Terms of Service</LinkStyle>
        <LinkStyle to="#">Privacy Policy</LinkStyle>
        <CopyrightStyle>©2019 FoodieFun</CopyrightStyle>
      </StyledFooter>
    </div>
  );
}

const FormikReviewForm = withFormik({
  mapPropsToValues({
    item_name,
    restaurant_name,
    restaurant_type,
    food_rating,
    item_comment,
    wait_time,
    date_visited
  }) {
    return {
      restaurant_name: restaurant_name || "",
      restaurant_type: restaurant_type || "",
      item_name: item_name || "",
      food_rating: food_rating || 0,
      item_comment: item_comment || "",
      wait_time: wait_time || "",
      date_visited: date_visited || ""
    };
  },

  validationSchema: Yup.object().shape({
    restaurant_name: Yup.string().required(
      "Restaurant name is a required field."
    ),
    restaurant_type: Yup.string(),
    item_name: Yup.string().required("Food item is a required field."),
    food_rating: Yup.number().required("Rating is a required field."),
    item_comment: Yup.string(),
    wait_time: Yup.string(),
    date_visited: Yup.string()
  }),

  handleSubmit(values, { props }) {
    console.log(props);
    console.log("submitting");
    let data = {
      restaurant_name: values.restaurant_name,
      restaurant_type: values.restaurant_type,
      item_name: values.item_name,
      food_rating: values.food_rating,
      item_comment: values.item_comment,
      wait_time: values.wait_time,
      date_visited: values.date_visited,
      item_photo: values.item_photo
    };

    axios
      .post("https://backend-foodie-fun.herokuapp.com/api/meals", data, config)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        props.history.push("/profile");
      })
      .catch(error => console.log(data));
  }
})(ReviewForm);

const config = {
  headers: {
    Authorization: localStorage.getItem("token")
  }
};
axios.get("datagrab", config);

export default FormikReviewForm;
