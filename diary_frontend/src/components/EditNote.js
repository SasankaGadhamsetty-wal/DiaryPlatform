import React from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  description: Yup.string().required("Required"),

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
    axios({
      method: "PUT",
      url: `/diaries/edit?email=${email}&date=${date}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
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
    <div>
       <Formik
        initialValues={{ description: `${location.state.description}` }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="description">Description:</label>
            <Field id="description" type="text" name="description" />
            <ErrorMessage name="description" />
            <button type="submit" disabled={isSubmitting }>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditNote