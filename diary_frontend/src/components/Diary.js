import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {toast} from 'react-toastify';
import "../css/Diary.css";
import moment from "moment";
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
  

  useEffect(() => {
    async function getUsersData() {
       await axios({
        method: "get",
        url: `/diaries/get/${email}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
      }).then((response) => {
        console.log(`userdata:${JSON.stringify(response.data.data)}`);
        setuserdata(response.data.data);

      });
    }
    getUsersData();
  }, []);

  const refreshcomponentdiary=()=>{
    axios({
      method: "get",
      url: `/diaries/get/${email}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
      },
    }).then((response) => {
      console.log(`userdata:${JSON.stringify(response.data.data)}`);
      setuserdata(response.data.data);

    });
  }

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
        Authorization:`Bearer ${token}`,
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

   const columns = [
    {
      name: "Note",
      selector: (row) => row.description,
    },
   // {
    //  name: "Image",
    //  selector: (row) => row.image,
    //},
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
              toast.success('Note deleted');
               axios({
                method: "delete",
                url: `diaries/delete?email=${email}&date=${date}`,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization:`Bearer ${token}`,
                },
              }).then((response) => {
                console.log(`Deleted info:${JSON.stringify(response.data)}`);
                refreshcomponentdiary();
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

  const formSchema = Yup.object().shape({
    description: Yup.string().min(5,"Description length should be atleast 5").max(2000,"Description max length is 2000").required("Required"),
  });

  const handleOnSubmit = (values, actions) => {
    console.log("Inside handleonSubmit");
    console.log(JSON.stringify(values.image));
    console.log(`submitting details:${JSON.stringify(values)}`);
   
    axios({
      method: "POST",
      url: `/diaries/add?email=${email}&date=${moment(date).format(
        "YYYY/MM/DD"
      )}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
      },
      data: {
        email: email,
        description: values.description,
        date: moment(date).format("YYYY/MM/DD"),
        image:values.image,
      },
    })
      .then((response) => {
        console.log(response.data);

        actions.setSubmitting(true);
        actions.resetForm();
        if(response.data.data==='Note already added'){
          alert("Note already added.Please update to change the note")
        }
        else{toast.success('Note added succesfully.');}
        refreshcomponentdiary();
      })
      .catch((error) => {
        actions.setSubmitting(false);
        console.log(error);
      });
  };

  return (
    <div> 
      
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
        initialValues={{ description:""
        ,image:""
      }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting}) => (
          <Form className="addNote-card">
            <Field id="description" type="textarea" name="description" placeholder="Write a note"
            label="description"
            style={{ width: "30em", height: "8em" }} className="addNote-input"/>
            <ErrorMessage name="description" />
          {/* <input
            type="file"
            name="image"
            accept="image/*"/> */} 
           
            <button type="submit" className="addNote-button">Add Note</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Diary;
