import React from "react";
import { Form, Field, withFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import styled from "styled-components";
import { Button } from "grommet";
import axios from "axios";

const Header = styled.header`
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
  font: Helvetica Neue;
  background-color: #e76f25;
  font-size: 30px;
  width: 82.5%;
  height: 60px;
  border-radius: 10px;
  @media (min-width: 960px) and (max-width: 1400px) {
    background-color: black;
  }
`;

const StyledH3 = styled.h3`
  margin-top: -6%;
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  color: #d0d0d0;
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

const SignUp = ({ errors, touched, history, ...props }) => {
  return (
    <div>
      <Header>
        <ImgLogo src={require("./img/foodielogo.png")}></ImgLogo>
      </Header>

      <StyledH1>Sign Up</StyledH1>
      <Form>
        <StyledLabel>
          First
          <StyledField type="text" name="first_name" placeholder="Frankie" />
        </StyledLabel>
        {touched.first_name && errors.first_name && (
          <p className="error">{errors.first_name}</p>
        )}

        <StyledLabel>
          Last
          <StyledField type="text" name="last_name" placeholder="Smith" />
        </StyledLabel>
        {touched.last_name && errors.last_name && (
          <p className="error">{errors.last_name}</p>
        )}

        <StyledLabel>
          Email
          <StyledField type="text" name="username" placeholder="Email" />
        </StyledLabel>
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <StyledLabel>
          Password
          <StyledField type="password" name="password" placeholder="Password" />
        </StyledLabel>
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <StyledLabel>
          Confirm Password
          <StyledField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </StyledLabel>
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <StyledLabel>
          Location
          <StyledField
            type="text"
            name="location"
            placeholder="Where do you reside?"
          />
        </StyledLabel>
        {touched.location && errors.location && (
          <p className="error">{errors.location}</p>
        )}

        <MyStyledButton primary type="submit">
          {props.isLoading ? "..." : "Become a Foodie! "}
        </MyStyledButton>
      </Form>

      <StyledH3>
        Already have an account? <LinkStyle to="/Log-In">Click here</LinkStyle>{" "}
      </StyledH3>

      <StyledFooter>
        <br />
        <br />
        <LinkStyle to="#">Terms of Service</LinkStyle>
        <LinkStyle to="#">Privacy Policy</LinkStyle>
        <CopyrightStyle>©2019 FoodieFun</CopyrightStyle>
      </StyledFooter>
    </div>
  );
};

const FormikSignUp = withFormik({
  mapPropsToValues({ username, password, confirmPassword }) {
    return {
      username: username || "",
      password: password || "",
      confirmPassword: confirmPassword || ""
      // first_name: first_name || "",
      // last_name: last_name || "",
      // location: location || ""
    };
  },

  validationSchema: Yup.object().shape({
    // first_name: Yup.string().required("Please enter your First Name."),
    // last_name: Yup.string().required("Please enter your Last Name."),
    username: Yup.string().required("Please enter your username/email."),
    // location: Yup.string().required("Please enter your location."),
    password: Yup.string()
      .min(6)
      .required("Please enter at least 6 characters."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Password confirm is required.")
  }),

  handleSubmit(values, { props }) {
    console.log(props);
    let user = {
      // first_name: values.first_name,
      // last_name: values.last_name,
      // location: values.location,
      username: values.username,
      password: values.password
    };

    axios
      .post("https://backend-foodie-fun.herokuapp.com/api/auth/register", user)
      .then(res => {
        console.log(res);
        props.history.push("/log-in");
      })
      .catch(error => console.log(error));
  }
})(SignUp);

export default FormikSignUp;
