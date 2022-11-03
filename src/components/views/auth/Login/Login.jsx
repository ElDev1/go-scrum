import React from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

import { swal } from "../../../../utils/swal";
import "../Auth.styles.css";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    password: "",
  };

  const required = "* this field is required";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "The minimum number of characters is 4")
        .required(required),
      password: Yup.string().required(required),
    });

  const onSubmit = () => {
    const { userName, password } = values;

    fetch(`${API_ENDPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user.userName);
          navigate("/", { replace: true });
        } else {
          swal();
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } =
    formik;

  return (
    <>
      <div className="curve"></div>
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Log in</h1>
          <div>
            <label>User Name</label>
            <input
              type="text"
              name="userName"
              onChange={handleChange}
              value={values.userName}
              onBlur={handleBlur}
              className={errors.userName && touched.userName ? "error" : ""}
            />
            {errors.userName && touched.userName && (
              <div>{errors.userName}</div>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "error" : ""}
            />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
          <div>
            <Link to="/register">register</Link>
          </div>
        </form>
      </div>
    </>
  );
};