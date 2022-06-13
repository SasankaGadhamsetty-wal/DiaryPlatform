import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
//import { FormGroup, Button, Input, FormText } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {toast} from 'react-toastify';
import '../css/EditCredentials.css';
import diary_pic from '../images/diary_pic.png';


const formSchema = Yup.object().shape({
  platform: Yup.string().min(3, "Enter valid platfrom name").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password minimum length should be 8 and should consists of minimum 1 lowercase,1 uppercase,1 number,1 symbol")
  .required("Required"),
});
const EditCredentials = () => {
  const location = useLocation();
  console.log(`user_email:${location.state.email}`);
  const navigate = useNavigate();

  const token = localStorage.getItem("token").replaceAll('"', "");
  console.log(token);

  const handleOnSubmit=(values,actions)=>{
    console.log(`submitting details:${JSON.stringify(values)}`);
    toast.success('Credentials edited successfully');
    axios({
      method: "PUT",
      url: `/credentials/edit?email=${location.state.email}&platform=${location.state.platform}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
      },
      data: {
        platform:values.platform,
        email:values.email,
        password:values.password,
      },
    }).then((response)=>{
        console.log(response);
        navigate(-1,{state:{email:location.state.email}});
    }).catch((errors)=>{
        console.log(`errors : ${errors.response}`);
    })
  }
  return (
    <div className="editCredentials-page">
      <div className="header-card">
      <img src={diary_pic} alt="diary_pic" className="img_diary" />
      <h3 className="heading">Diary Platform</h3>
      
      </div>
      <div className="update-card">
        <h2>Edit Credentials</h2>
        <Formik
        initialValues={{ platform: `${location.state.platform}`, email: `${location.state.email}`, password: `${location.state.password}`}}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form className="form-card">
            
            <Field id="platform" type="text" name="platform" placeholder="Enter platform" label="platform" className="update-input"/>
            <ErrorMessage name="platform" />
            
            <Field id="email" type="email" name="email" placeholder="Enter your email" label="email" className="update-input"/>
            <ErrorMessage name="email" />
          
            <Field id="password" name="password" type="text" placeholder="Enter your password" label="password" className="update-input"/>
            <ErrorMessage name="password" />
            <button type="submit" className="update-button"disabled={isSubmitting}>
              Edit Credentials
            </button>
          </Form>
        )}
      </Formik>

    </div>
    </div>
    
  );
};

export default EditCredentials;
