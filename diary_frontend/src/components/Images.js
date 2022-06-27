import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Images = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const user_token = localStorage.getItem("token");
  const token = user_token.replaceAll('"', "");
  console.log(`token is:${token}`);
  const diary_id=location.state.diary_id;
  const email=location.state.email;
  console.log(`diary_id:${diary_id},email:${email}`);
  const [files,setFiles]=useState([]);

  const onInputChange=(e)=>{
    setFiles(e.target.files)
  };

  const onSubmit=(e)=>{
    e.preventDefault();
    console.log("Inside onSubmit");
    const data=new FormData();
    data.append('diary_id',diary_id);
    for(let i=0;i<files.length;i++){
      data.append('file',files[i]);
    }
    console.log(data);
    console.log(files);
    axios({
      method:"POST",
      url:`images/${diary_id}`,
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`,
      },
      data
    }).then((response)=>{
      console.log(response);
      navigate(-1,{
        state:{email:email}
      })
    }).catch((error)=>{
      console.log(error);
    })
  };
  return (
    <form method='post' action="#" id="#" onSubmit={onSubmit}>
    <div>
      <label>Upload your image</label>
      <input type="file"
              onChange={onInputChange}
              className="form-control"
              multiple/>
    </div>
    <button type="submit">Submit</button>
    <button onClick={()=>{
      {console.log(email)}
    }}>Cancel</button>
    </form>
  )
}

export default Images