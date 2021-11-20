import React from "react";
import "./LoginRegister.css";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import DisplayErrorMessage from "../../components/DisplayErrorMessage";
import Loading from "../../components/Loading";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required").min(6),
});

const LoginScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const onSubmit = (values) => {
    dispatch(login(values.email, values.password));
  };

  return (
    <>
      <section>
        <div className="imgBox">
          <img
            src="https://images.unsplash.com/photo-1471970394675-613138e45da3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bm90ZXx8fHx8fDE2MzcyMjQ5NTY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1400"
            alt="..."
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          <div className="contentBox">
            <div className="formBox">
              <h3 className="login-heading">Splash Notes! 🔖</h3>
              <hr />
              <h5>Login</h5>
              {error && (
                <DisplayErrorMessage variant="danger">
                  {error}
                </DisplayErrorMessage>
              )}
              {loading && <Loading />}
              <Form>
                <div className="inputBox">
                  <span>Email</span>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="inputStyle"
                  />
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <div className="inputBox">
                  <span>Password</span>
                  <Field
                    type="password"
                    className="inputStyle"
                    name="password"
                    id="password"
                  />
                  <ErrorMessage name="password" component={TextError} />
                </div>
                <div className="inputBox">
                  <input type="submit" className="inputStyle" value="Sign in" />
                </div>
                <div className="inputBox">
                  <p>
                    Don't have an accont? <a href="/register">Sign up</a>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </Formik>
      </section>
    </>
  );
};

export default LoginScreen;
