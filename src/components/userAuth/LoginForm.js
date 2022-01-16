import React, { useEffect, useState } from "react";
import { loginUserAsync } from "../../redux/api/userApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import bgImg from "../../assets/images/bgImg.jpg";
import * as Yup from "yup";
import ErrorText from "../utils/ErrorText";
import "./Form.css";
import { Spinner } from "react-bootstrap";

const initialValues = {
  email: "",
  password: "",
};

const savedData = {
  email: "test@example.com",
  password: "123456",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required").min(6),
});

const LoginForm = () => {
  const [formData, setFormData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo, pending } = useSelector((state) => state.user);

  const onSubmit = (values) => {
    dispatch(
      loginUserAsync({
        email: values.email,
        password: values.password,
      })
    );
  };

  // Redirect
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
            initialValues={formData || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            <div className="contentBox">
              <div className="formBox">
                <h3 className="login-heading">Splash Notes! 🔖</h3>
                <hr />
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
                <h5>Login</h5>
                <Form>
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

                  <button
                    className="btn-border"
                    type="button"
                    onClick={() => setFormData(savedData)}>
                    Get Test User Credentials
                  </button>
                  <button
                    type="submit"
                    className={`sub-btn ${pending ? "btn-disable" : ""}`}
                    disabled={pending ? true : false}>
                    Login
                  </button>

                  <div className="inputBox">
                    <p>
                      Don't have an accont? <Link to="/register">Sign up</Link>
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

export default LoginForm;
