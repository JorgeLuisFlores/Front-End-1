import React from "react";
import { Form, Field, withFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import styled from "styled-components";
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
  margin-left: 10%;
  margin-top: 4%;
  margin-bottom: 35%;
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

const LogIn = ({ errors, touched, history, ...props }) => {
  return (
    <div>
      <Header>
        <ImgLogo src={require("./img/foodielogo.png")}></ImgLogo>
      </Header>

      <StyledH1>Welcome Back!</StyledH1>
      <Form>
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

const FormikLogIn = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please enter your username."),
    password: Yup.string()
      .min(6)
      .required("Please enter at least 6 characters.")
  }),

  handleSubmit(values, { props }) {
    console.log(props);
    console.log("submitting");
    let user = {
      username: values.username,
      password: values.password
    };

    axios
      .post("https://backend-foodie-fun.herokuapp.com/api/auth/login", user)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        props.history.push("/profile");
      })
      .catch(error => console.log(error));
  }
})(LogIn);

export default FormikLogIn;

const config = {
  headers: {
    Authorization: localStorage.getItem("token")
  }
};
axios.get("dataGrab", config);
