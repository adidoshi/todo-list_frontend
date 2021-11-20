import React from "react";
import "./LoginRegister.css";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import DisplayErrorMessage from "../../components/DisplayErrorMessage";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required").min(6),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const RegisterScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const onSubmit = (values) => {
    dispatch(register(values.name, values.email, values.password));
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
              <h3 className="register-heading">Splash Notes! 🔖 </h3>
              <h5>Register</h5>
              {error && (
                <DisplayErrorMessage variant="danger">
                  {error}
                </DisplayErrorMessage>
              )}
              {loading && <Loading />}
              <Form>
                <div className="inputBox">
                  <span>Name</span>
                  <Field
                    type="name"
                    name="name"
                    id="name"
                    className="inputStyle"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
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
                  <span>Confirm password</span>
                  <Field
                    type="password"
                    className="inputStyle"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                  <ErrorMessage name="confirmPassword" component={TextError} />
                </div>
                <div className="inputBox">
                  <input type="submit" className="inputStyle" value="Sign up" />
                </div>
                <div className="inputBox">
                  <p>
                    Already a member? <Link to="/login">Sign in</Link>
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

export default RegisterScreen;
