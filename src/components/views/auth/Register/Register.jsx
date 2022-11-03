import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../Auth.styles.css";

const { REACT_APP_API_ENDPOINT } = process.env;

export const Register = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, []);

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const required = "* this field is required";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "The minimum number of characters is 4")
        .required(required),
      password: Yup.string().required(required),
      email: Yup.string().email("Must be a valid email").required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
    });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;

    fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        navigate("/registered/" + data?.result?.user?.teamID, {
          replace: true,
        })
      );
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    setFieldValue,
  } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={values.userName}
            className={errors.userName && touched.userName ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className={errors.password && touched.password ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            className={errors.email && touched.email ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="secondary"
            />
          }
          label="you are already in a created team"
        />
        {values.switch && (
          <div>
            <label>Please enter the ID team</label>
            <input
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label>Rol</label>
          <select
            name="role"
            onChange={handleChange}
            value={values.role}
            className={errors.role && touched.role ? "error" : ""}
            onBlur={handleBlur}
          >
            <option value="">Select role...</option>
            {data?.Rol?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continent</label>
          <select
            name="continent"
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            value={values.continent}
            className={errors.continent && touched.continent ? "error" : ""}
            onBlur={handleBlur}
          >
            <option value="">Select a continent...</option>
            {data?.continente?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        {values.continent === "America" && (
          <div>
            <label>Region</label>
            <select
              name="region"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Seleccionar región...</option>
              {data?.region?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}
          </div>
        )}
        <div>
          <button type="submit">Send</button>
        </div>
        <div>
          <Link to="/login">Go to Login</Link>
        </div>
      </form>
    </div>
  );
};