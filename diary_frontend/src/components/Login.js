import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const navigate=useNavigate();
  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "/users/loginuser",
      data: values,
    })
      .then((response) => {
        //console.log(`response is:${JSON.stringify(response,null,2)}`);
        console.log(`token is:${response.data.token}`)
        actions.setSubmitting(true);
        actions.resetForm();
        localStorage.setItem('regtoken', JSON.stringify(response.data.token));
          localStorage.setItem(
            'regtoken user',
            JSON.stringify(response.data.userDetails)
          );
        if(response.data.token){
          navigate("/home");
        }
      })
      .catch((error) => {
        actions.setSubmitting(false);
      });
  };
  return (
    <div>
      <h1>Contact Us</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email:</label>
            <Field id="email" type="email" name="email" />
            <ErrorMessage name="email"/>
            <label htmlFor="password">Password:</label>
            <Field id="password" name="password" type="text"/>
            <ErrorMessage name="password"/>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
