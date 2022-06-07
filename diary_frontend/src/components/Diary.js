import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/Diary.css'
import moment from 'moment'

const Diary = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const email=location.state.email;
    console.log(`User email is:${email}`);
    const user_token=localStorage.getItem("token");
    const token=user_token.replaceAll('"','');
    console.log(`token is:${token}`);
    const [userdata,setuserdata]=useState([]);
    const [date,setDate]=useState(new Date());

    const onChange=date=>{
        setDate(date)
    }

    useEffect(()=>{
        async function getUsersData(){
            const userdataResponse=await axios({
                method:"get",
                url:`/diaries/${email}`,
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:token,
                },
            }).then((response)=>{
                console.log(`userdata:${JSON.stringify(response.data.data)}`);
                setuserdata(response.data.data);
            })
        }
        getUsersData();
    },[])
    const columns = [
        {
          name: "Note",
          selector: (row) =>row.description
        //  <EdiText type='text' value={row.description} saveButtonContent="Apply" ></EdiText>
            },
        {
          name: "Date",
          selector: (row) => row.date,
        },
       // {name: 'Action',
         // selector:(row)=>
          //<button
        //  onClick={()=>{
         //   const id=row.id
         //   const dataUpdate= deleteEntry(token,id)
         //    window.location.reload(true);
         // }}
        //  >Delete</button>}
      ];
      const customStyles = {
        rows: {
          style: {
            minHeight: '62px',
          }
        },
        headCells: {
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        },
        cells: {
          style: {
            fontSize: '17px',
          },
        },
      };
  return (
    <div>
        <DataTable
        columns={columns}
        data={userdata}
        customStyles={customStyles}/>
        <div className='calendar-div'>
        <Calendar onChange={onChange} value={date} onClick={()=>{
          navigate("/note");
        }}
/>
        </div>
      {date.toDateString(date)}
      <p>Current selected date is <b>{moment(date).format('MMMM Do YYYY')}</b></p>
    </div>
  )
}

export default Diary;