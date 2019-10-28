import React from "react";
import { Route } from "react-router-dom";
import FormikSignUp from "./sign-up";
import FormikLogIn from "./log-in";
import Profile from "./home-page";
import FormikReviewForm from "./review-form";
import Review from "./review";

const App = () => {
  return (
    <div>
      <Route exact path="/log-in" component={FormikLogIn} />
      <Route exact path="/sign-up" component={FormikSignUp} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/review/:id" component={Review} />
      <Route exact path="/review-form" component={FormikReviewForm} />
    </div>
  );
};

export default App;
