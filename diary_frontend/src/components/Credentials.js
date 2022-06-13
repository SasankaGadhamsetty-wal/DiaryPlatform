import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import {toast} from 'react-toastify';
import "../css/Credentials.css";

const formSchema = Yup.object().shape({
  platform: Yup.string()
    .min(3, "Enter valid platfrom name")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password minimum length should be 8 and should consists of minimum 1 lowercase,1 uppercase,1 number,1 symbol")
    .required("Required"),
});
const Credentials = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  console.log(`User_email is:${email}`);
  const user_token = localStorage.getItem("token");
  const token = user_token.replaceAll('"', "");
  console.log(`token is:${token}`);
  const [credentialsdata, setcredentialsdata] = useState([]);

  useEffect(() => {
    async function getUserCredentials() {
      await axios({
        method: "get",
        url: `/credentials/${email}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
      }).then((response) => {
        console.log(`user credentials:${JSON.stringify(response.data.data)}`);
        setcredentialsdata(response.data.data);
        console.log(credentialsdata);
      });
    }
    getUserCredentials();
  }, []);
  const refreshcomponent=()=>{   
    axios({
    method: "get",
    url: `/credentials/${email}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`,
    },
  }).then((response) => {
    console.log(`user credentials:${JSON.stringify(response.data.data)}`);
    setcredentialsdata(response.data.data);
    console.log(credentialsdata);
  });}
  const columns = [
    {
      name: "platform",
      selector: (row) => row.platform,
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
      name: "Actions",
      selector: (row) => (
        <>
          <BiEdit
            onClick={() => {
              navigate("/editCredentials", {
                state: {
                  platform: row.platform,
                  email: row.email,
                  password: row.password,
                },
              });
            }}
          >
            Edit
          </BiEdit>
          <BsTrash
            onClick={() => {
              const email = row.email;
              const platform = row.platform;
              toast.success('Credentials deleted');
              axios({
                method: "delete",
                url: `credentials?email=${email}&platform=${platform}`,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization:`Bearer ${token}`,
                },
              }).then((response) => {
                console.log(`Deleted info:${JSON.stringify(response.data)}`);
                refreshcomponent();
              });
            
            }}
            type="submit"
          >
            Delete
          </BsTrash>
        </>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        textAlign: "center",
        backgroundColor: "#a3a32e",
        letterspacing: "0.03em",
        fontSize: "16px",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        backgroundColor: "#c76a7b",
        boxShadow: "0px 0px 9px 0px rgba(0,0,0,0.1)",
      },
    },
  };

  const handleOnSubmit = (values, actions) => {
    console.log(`submitting details:${JSON.stringify(values)}`);
    axios({
      method: "POST",
      url: `/credentials/add/${values.email}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
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
        if(response.data.data==='This platform credentials are already saved.Please edit if you want to change.'){
          alert("Credentials for this platform already saved.Please update to change the credentials")
        }
        else{toast.success('Credentials added succesfully.');}
       //credentialsdata.push(response.data.newCredentials);
        refreshcomponent();
        
      })
      .catch((error) => {
        actions.setSubmitting(false);
      });
    //window.location.reload(true);
  };
  return (
    <div>
      <div className="credentials-card">
        <h3>Please fill here,to save more credentials</h3>
        <Formik
          initialValues={{ platform: "", email: "", password: "" }}
          onSubmit={handleOnSubmit}
          validationSchema={formSchema}
        >
          {({ isSubmitting }) => (
            <Form className="credentialsform-card">
              <Field
                id="platform"
                name="platform"
                label="platform"
                className="credentials-input"
                placeholder="Enter Platform Name"
              />
              <ErrorMessage name="platform" />
              <Field
                id="email"
                name="email"
                label="email"
                className="credentials-input"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" />
              <Field
                id="password"
                name="password"
                type="password"
                label="password"
                className="credentials-input"
                placeholder="Enter password"
              />
              <ErrorMessage name="password"/>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="credentials-button"
              >
               Add Credentials
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <DataTable
        columns={columns}
        data={credentialsdata}
        fixedHeader
        highlightOnHover
        customStyles={customStyles}
        className="datatable-table"
      />
    </div>
  );
};
export default Credentials;
