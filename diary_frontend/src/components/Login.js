import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate,Link } from "react-router-dom";
import '../css/Login.css';
import diary_pic from '../images/diary_pic.png';

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8,"Password minimum length should be 8").required("Required"),
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
        localStorage.setItem('token', JSON.stringify(response.data.token));
        console.log(`token: ${localStorage.getItem("token")}`);
        console.log(`email is:${response.data.userCredentials.email}`);
        
        if(response.data.token){
          //localStorage.setItem('email',values.email);
          //console.log(`email is:${localStorage.getItem("email")}`);
          navigate("/home",{
            state:{email:response.data.userCredentials.email}
          });
        }
      })
      .catch((error) => {
        actions.setSubmitting(false);
        console.log(error);
        alert("Wrong credentials");
      });
  };
  
  return (
  <div className="login-page">
    <div className="header-logincard">
      <img src={diary_pic} alt="diary_pic" className="img_diary" />
      <h3 className="heading">Diary Platform</h3>
      
      </div>
    <div className="login-card">
    
  <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          
          <Form className="login-form">
            <h2>LOG IN</h2>
            <Field id="email" type="email" name="email" className="login-input" label="email" placeholder="Enter your username"/>
            <ErrorMessage name="email">{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
 
            <Field id="password" name="password" type="password"className="login-input" label="password" placeholder="Enter your password"/>
            <ErrorMessage name="password">{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
            <button type="submit" disabled={isSubmitting} className="login-button">{isSubmitting?"Loading":"Login"}
            </button>
            <div>
            <h6>Create an account,if you are a new user!</h6>

            <Link to={`/signup`} style={{color:'black'}} activeStyle={{color:'red'}}>Signup</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>  
  </div>
  
  );
};

export default Login;
