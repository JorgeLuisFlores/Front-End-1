import React from "react";
import styled from "styled-components";
import ReviewList from "./review-list";
import { Link } from "react-router-dom";

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

const ImgProfile = styled.img`
  float: right;
  padding: 4%;
  width: 8%;
  margin-top: -13%;
`;

const BodyDiv = styled.div`
width 100%;
height: 50%;
`;

const BottomRow = styled.nav`
  width:100%;
  height 30px;
  margin-top: 20%;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px -2px 3px #00000029;
  opacity: 1;
  display: flex;
  justify-content: space-evenly;
`;

const BottomRowIcons = styled.img`
  padding: -10%;
  margin-top: 3%;
  width: 6%;
  height: 25px;
  display: flex;
  flex-wrap: wrap;
`;

const ImgButton = styled.img`
  width: 20%;
  display: block;
  margin: 0 auto;
  padding: 2%;
`;

const StyledFooter = styled.footer`
  margin-top: 5%;
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

const Profile = () => {
  return (
    <div>
      <Header>
        <ImgLogo src={require("./img/foodielogo.png")} />
        <ImgProfile src={require("./img/profile.png")} />
      </Header>
      <BodyDiv />
      <ReviewList />

      <Link to="/review-form">
        <ImgButton src={require("./img/add.png")} />
      </Link>

      <BottomRow>
        <BottomRowIcons src={require("./img/experience.png")} />
        <BottomRowIcons src={require("./img/social.png")} />
        <BottomRowIcons src={require("./img/discover.png")} />
      </BottomRow>

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

export default Profile;
