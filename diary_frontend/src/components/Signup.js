import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import '../css/Signup.css';
import diary_pic from '../images/diary_pic.png';

const formSchema = Yup.object().shape({
  name: Yup.string().min(3,"It's too short").required("Required"),
  age: Yup.number().typeError("Enter integer").required("Should be an integer"),
  mobile: Yup.number().typeError("Enter valid Mobile no.").required("Required"),
  email: Yup.string().email("Please enter valid email").required("Required"),
  password: Yup.string().min(8,"Password minimum length should be 8 and should consists of minimum 1 lowercase,1 uppercase,1 number,1 symbol")
  .required("Required"),

});

const Signup = () => {
  const navigate=useNavigate();
  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "/users/signup",
      data: values,
    })
      .then((response) => {
        console.log(response.data);
        actions.setSubmitting(true);
        actions.resetForm();
        navigate("/");
      })
      .catch((error) => {
        actions.setSubmitting(false);
      });
  };
  return (
    <div className="editNote-page">
      <div className="header-card">
      <img src={diary_pic} alt="diary_pic" className="img_diary" />
      <h3 className="heading">Diary Platform</h3>
      
      </div>
    <div className="signup-card">
      <h2>SIGN UP</h2>
      <Formik
        initialValues={{ name:"",age:"",mobile:"",email: "", password: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
        
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">

            <Field id="name" type="text" name="name" label="name" placeholder="Your name" className="signup-input"/>
            <ErrorMessage name="name">{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
 
            <Field id="age" name="age" type="text" label="age" placeholder="Your age" className="signup-input"/>
            <ErrorMessage name="age">{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
         
            <Field id="mobile" name="mobile" type="text" label="mobile" placeholder="Your mobile number" className="signup-input"/>
            <ErrorMessage name="mobile">{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
          
            <Field id="email" type="email" name="email" label="email" placeholder="Your email" className="signup-input"/>
            <ErrorMessage name="email">{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>

            <Field id="password" name="password" type="password" label="password" placeholder="Your password" className="signup-input"/>
            <ErrorMessage name="password">{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>

            <button type="submit" disabled={isSubmitting} className="signup-button">
              {isSubmitting?"Loading":"Signup"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default Signup;
