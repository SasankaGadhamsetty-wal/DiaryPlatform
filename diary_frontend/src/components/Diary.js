import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Diary.css";
import moment from "moment";
import { FormGroup, Button, Input, FormText } from "reactstrap";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Diary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  console.log(`User email is:${email}`);
  const user_token = localStorage.getItem("token");
  const token = user_token.replaceAll('"', "");
  console.log(`token is:${token}`);
  const [userdata, setuserdata] = useState([]);
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    axios({
      method: "get",
      url: `/diaries/getNote?email=${email}&date=${moment(date).format(
        "YYYY/MM/DD"
      )}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((response) => {
      console.log(`userdata:${JSON.stringify(response)}`);
      if (response.data.note !== null) {
        setuserdata([response.data.note]);
      } else {
        alert("No note to display");
      }
    });
  };

  useEffect(() => {
    async function getUsersData() {
      const userdataResponse = await axios({
        method: "get",
        url: `/diaries/get/${email}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((response) => {
        console.log(`userdata:${JSON.stringify(response.data.data)}`);
        setuserdata(response.data.data);
      });
    }
    getUsersData();
  }, []);
  const columns = [
    {
      name: "Note",
      selector: (row) => row.description,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <BiEdit
            onClick={() => {
              const date = row.date;
              navigate("/editNote", {
                state: {
                  email: email,
                  description: row.description,
                  date: date,
                },
              });
            }}
          ></BiEdit>
          <BsTrash
            onClick={() => {
              const date = row.date;
              const delNote = axios({
                method: "delete",
                url: `diaries/delete?email=${email}&date=${date}`,
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
          </BsTrash>
        </>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "62px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        fontSize: "17px",
      },
    },
  };

  const formSchema = Yup.object().shape({
    description: Yup.string().required("Required"),
  });

  const handleOnSubmit = (values, actions) => {
    console.log("Inside handleonSubmit");
    console.log(`submitting details:${JSON.stringify(values)}`);
    axios({
      method: "POST",
      url: `/diaries/add?email=${email}&date=${moment(date).format(
        "YYYY/MM/DD"
      )}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        email: email,
        description: values.description,
        date: moment(date).format("YYYY/MM/DD"),
      },
    })
      .then((response) => {
        console.log(response.data);

        actions.setSubmitting(true);
        actions.resetForm();
      })
      .catch((error) => {
        actions.setSubmitting(false);
        console.log(error);
      });
    window.location.reload(true);
  };

  return (
    <div>
      <Button className='credential-logout'
        onClick={() => {
          localStorage.clear()
          navigate("/");
        }}
      >
        Logout
      </Button>
      <DataTable
        columns={columns}
        data={userdata}
        customStyles={customStyles}
      />
      <div className="calendar-div">
        <Calendar onChange={onChange} value={date} />
      </div>
      {date.toDateString(date)}
      <p>
        Current selected date is <b>{moment(date).format("YYYY/MM/DD")}</b>
      </p>
      <Formik
        initialValues={{ description: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="description">Description:</label>
            <Field id="description" type="textarea" name="description" />
            <ErrorMessage name="description" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Diary;
