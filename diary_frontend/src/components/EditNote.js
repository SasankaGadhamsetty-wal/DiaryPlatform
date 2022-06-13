import React from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {toast} from 'react-toastify';
import '../css/EditNote.css';
import diary_pic from '../images/diary_pic.png';

const formSchema = Yup.object().shape({
  description: Yup.string().min(5,"Description length should be atleast 5").max(2000,"Description max length is 2000").required("Required"),

});

const EditNote = () => {
  const location=useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token").replaceAll('"', "");
  console.log(token);
  const email=location.state.email;
  const date=location.state.date;
  const description=location.state.description;

  console.log(`${email},${date},${description}`);

  const handleOnSubmit = (values, actions) => {
    console.log("Inside handleonSubmit");
    console.log(`submitting details:${JSON.stringify(values)}`);
    toast.success('Note edited successfully');
    axios({
      method: "PUT",
      url: `/diaries/edit?email=${email}&date=${date}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
      },
      data: {
        description:values.description,
      },
    })
      .then((response) => {
        console.log(response.data);
  
        actions.setSubmitting(true);
        actions.resetForm();
        navigate(-1,{state:{email:location.state.email}});
      })
      .catch((error) => {
        actions.setSubmitting(false);
        console.log(error);
      });
   //window.location.reload(true);
  };
  
  return (
    <div className="editNote-page">
      <div className="header-card">
      <img src={diary_pic} alt="diary_pic" className="img_diary" />
      <h3 className="heading">Diary Platform</h3>
      
      </div>
    <div className="edit-card">
        <h2>Edit Note</h2>
       <Formik
        initialValues={{ description: `${location.state.description}` }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form className="editform-card">
            <Field id="description" type="textarea" name="description" style={{ width: "30em", height: "10em" }}
            label="description" className="edit-input"/>
            <ErrorMessage name="description" />
            <button type="submit" className="edit-button" disabled={isSubmitting }>Edit Note</button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  )
}

export default EditNote