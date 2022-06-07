import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormGroup, Button, Input, FormText } from "reactstrap";
const EditCredentials = () => {
  const location = useLocation();
  console.log(`user_email:${location.state.email}`);
  const navigate = useNavigate();
  const [platform, setPlatform] = useState(location.state.platform);
  const [email, setEmail] = useState(location.state.email);
  const [password, setPassword] = useState(location.state.password);
  const token = localStorage.getItem("token").replaceAll('"', "");
  console.log(token);
  return (
    <div>
     
        <input
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={()=>{
        const email=location.state.email;
        const platform=location.state.platform;
        console.log(`email:${email} and platfrom :${platform} password:${password}`);
           axios({
            method: "PUT",
            url: `/credentials/edit?email=${email}&platform=${platform}`,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: token,
            },
            data: {
              platform:platform,
              email:email,
              password:password,
            },
          }).then((response)=>{
              console.log(response);
              navigate(-1,{state:{email:location.state.email}});
          }).catch((errors)=>{
              console.log(`errors : ${errors.response}`);
          })
        }}>Edit Credentials</Button>
   
    </div>
  );
};

export default EditCredentials;
