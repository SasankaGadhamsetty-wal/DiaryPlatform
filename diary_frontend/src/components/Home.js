import React from "react";
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Diary from "./Diary";
import Credentials from "./Credentials";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import diary_pic from "../images/diary_pic.png";
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [selectedIndex, setStateofIndex] = useState(0);
  const handleSelect = (index) => {
    setStateofIndex({ selectedIndex: index });
  };
  //console.log(new Date().toISOString().slice(0, 10));
  const handleButtonClick = () => {
    setStateofIndex({ selectedIndex: 0 });
  };
  return (
    <div>
      <img src={diary_pic} alt="diary_pic" className="img_diary" />
      <h3 className="heading">Diary Platform</h3>

      <Tabs className="Tabs" indicatorColor="primary" textColor="primary">
        <TabList className="TabList-container">
          <Tab>Dairy</Tab>
          <Tab>Credentials</Tab>
          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            {" "}
            Logout{" "}
          </Button>
        </TabList>
        <TabPanel>
          <Diary />
        </TabPanel>
        <TabPanel>
          <Credentials />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Home;
