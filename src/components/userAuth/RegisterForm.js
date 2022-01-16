import React, { useEffect } from "react";
import { registerUserAsync } from "../../redux/api/userApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import bgImg from "../../assets/images/bgImg.jpg";
import * as Yup from "yup";
import ErrorText from "../utils/ErrorText";
import "./Form.css";
import { Spinner } from "react-bootstrap";

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

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { pending, userInfo } = useSelector((state) => state.user);

  const onSubmit = (values) => {
    dispatch(
      registerUserAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <>
      <main>
        <section>
          <div className="imgBox">
            <img src={bgImg} alt="..." />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <div className="contentBox">
              <div className="formBox">
                <h3 className="register-heading">Splash Notes! 🔖 </h3>
                <h5>Register</h5>
                {pending && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "5px",
                    }}>
                    <Spinner animation="border" />
                  </div>
                )}

                <Form>
                  <div className="inputBox">
                    <span>Name</span>
                    <Field
                      type="name"
                      name="name"
                      id="name"
                      className="inputStyle"
                    />
                    <ErrorMessage name="name" component={ErrorText} />
                  </div>
                  <div className="inputBox">
                    <span>Email</span>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="inputStyle"
                    />
                    <ErrorMessage name="email" component={ErrorText} />
                  </div>
                  <div className="inputBox">
                    <span>Password</span>
                    <Field
                      type="password"
                      className="inputStyle"
                      name="password"
                      id="password"
                    />
                    <ErrorMessage name="password" component={ErrorText} />
                  </div>
                  <div className="inputBox">
                    <span>Confirm password</span>
                    <Field
                      type="password"
                      className="inputStyle"
                      name="confirmPassword"
                      id="confirmPassword"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component={ErrorText}
                    />
                  </div>
                  <div className="inputBox">
                    <button
                      type="submit"
                      className={`sub-btn ${pending ? "btn-disable" : ""}`}
                      disabled={pending ? true : false}>
                      Sign up
                    </button>
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
      </main>
    </>
  );
};

export default RegisterForm;
