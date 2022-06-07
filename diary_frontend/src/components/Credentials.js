import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FormGroup, Button, Input, FormText } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const formSchema = Yup.object().shape({
  platform: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
const Credentials = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const email = location.state.email;
  console.log(`User_email is:${email}`);
  const user_token = localStorage.getItem("token");
  const token = user_token.replaceAll('"', "");
  console.log(`token is:${token}`);
  const [credentialsdata, setcredentialsdata] = useState([]);

  useEffect(() => {
    async function getUserCredentials() {
      const userCredentialsResponse = await axios({
        method: "get",
        url: `/credentials/${email}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((response) => {
        console.log(`user credentials:${JSON.stringify(response.data.data)}`);
        setcredentialsdata(response.data.data);
      });
    }
    getUserCredentials();
  }, []);

const columns = [
    {
      name: "platform",
      selector: (row) => row.platform
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "password",
      selector: (row) => row.password,
    },
    {
      name: "Action",
      selector: (row) => (
      <>
      <Button onClick={()=>{
        navigate('/edit',{state:{platform:row.platform,email:row.email,password:row.password}});
      }}>Edit</Button>
      <Button
          className="btn btn-primary"
          onClick={() => {
            const email = row.email;
            const platform = row.platform;
            const deldata = axios({
              method: "delete",
              url: `credentials?email=${email}&platform=${platform}`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
              },
            }).then((response) => {
              console.log(`Deleted info:${JSON.stringify(response.data)}`);
            });
            window.location.reload(true);
          }}
          type="submit"
        >
          Delete
        </Button>

</>
        
      ),
    },
  ];
  const handleOnSubmit = (values, actions) => {
    console.log(`submitting details:${JSON.stringify(values)}`);
    axios({
      method: "POST",
      url: `/credentials/add/${values.email}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        platform: values.platform,
        emailId: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        console.log(response.data);

        actions.setSubmitting(true);
        actions.resetForm();
      })
      .catch((error) => {
        actions.setSubmitting(false);
      });
    window.location.reload(true);
  };
  return (
    <div>
      Credentials
      <p>{location.state.email}</p>
      <DataTable
        title="User Credentials"
        columns={columns}
        data={credentialsdata}
        fixedHeader
        highlightOnHover
      />
      <h6>Please fill here,to save more credentials</h6>
      <Formik
        initialValues={{ platform: "", email: "", password: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="platform">Platform Name:</label>
            <Field id="platform" type="text" name="platform" />
            <ErrorMessage name="platform" />
            <label htmlFor="email">Email:</label>
            <Field id="email" type="email" name="email" />
            <ErrorMessage name="email" />
            <label htmlFor="password">Password:</label>
            <Field id="password" name="password" type="text" />
            <ErrorMessage name="password" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Credentials;
