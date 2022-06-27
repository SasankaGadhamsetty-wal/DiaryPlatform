import React, { useState,useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { useLocation, useNavigate } from "react-router-dom";

const ImagesDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user_token = localStorage.getItem("token");
  const token = user_token.replaceAll('"', "");
  console.log(`token is:${token}`);
  const diary_id = location.state.diary_id;
  const email = location.state.email;
  const description=location.state.description;
  console.log(`diary_id:${diary_id},email:${email},description:${description}`);
  const [ImagesUploaded, setImagesUploaded] = useState();
  const [error, setError] = useState();

  const [slideIndex, setSlideIndex] = useState(1);
  const [millis, setMillis] = useState(5000);
  const [interval, setIntervalValue] = useState();

  useEffect(() => {
    async function getData() {
        console.log("Inside useEffect")
     await axios({
        method:"GET",
        url:`images/${diary_id}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
      }).then((response)=>{
        console.log(response)
        setImagesUploaded(response.data.data)
        console.log(ImagesUploaded);
         startSlides();
        return pauseSlides;
      })
     
    }
    getData();
  }, []);

  useEffect(() => {
    showSlide();
  }, [slideIndex]);

function nextSlide() {
    setSlideIndex((idx) => idx + 1); 
  }

  function currentSlide(idx) {
    setSlideIndex(idx);
  }

  function pauseSlides() {
    clearInterval(interval);
  }

  function startSlides() {
    nextSlide();
    const interval = setInterval(nextSlide, millis);
    setIntervalValue(interval);
  }

  function showSlide() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";

    if (slideIndex > slides.length) {
      setSlideIndex(1);
    } else if (slideIndex < 1) {
      setSlideIndex(slides.length);
    } else {
      for (let i = 0; i < dots.length; i++)
        dots[i].className = dots[i].className.replace(" active", "");
      console.log(slideIndex);
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  }

  const columns = [
    {
      name: "Note",
      selector: (row) => <p>{description}</p>
    },
    {
      name: "Images",
      selector: (row) =>
        <>
          <div
        className="slideshow-container"
        onMouseEnter={() => pauseSlides()}
        onMouseLeave={() => startSlides()}
      >
        <div className="mySlides">
          <img  src={row.imageurl[0]} alt="image not available" width="50%" height="50%"></img>
        </div>

        <div className="mySlides">
          <img  src={row.imageurl[1]} alt="image not available" width="50%" height="50%"></img>
        </div>

        <div className="mySlides">
          <img src={row.imageurl[2]} alt="image not available" width="50%" height="50%"></img>
        </div>
      </div>

      <div>
        <span className="dot" onClick={() => currentSlide(0)}></span>
        <span className="dot" onClick={() => currentSlide(1)}></span>
        <span className="dot" onClick={() => currentSlide(2)}></span>
      </div>
        </>
    }
  ]
  const customStyles = {
    rows: {
      style: {
        minHeight: '102px',
        minWidth: "50%",
        textAlign: 'center',
      }
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '#95A5A6',
        letterspacing: '0.03em',
      },
    },
    cells: {
      style: {
        fontSize: '17px',
        backgroundColor: "",
        boxShadow: "0px 0px 9px 0px rgba(0,0,0,0.1)",
        padding: " 40px ",
      },
    },
}; 
  return (
  <>
     <button className='cancelbutton'
            onClick={()=>navigate(-1, {
            state: { email: email }
          })}
            >Cancel</button>
            <button className='imagelogout'
          onClick={() => {
            localStorage.clear()
            navigate("/");
          }}>
          Logout
        </button>
      <DataTable 
      columns={columns}
      customStyles={customStyles}
      data={ImagesUploaded} />
      <p>{error}</p>
  </>
  );
};

export default ImagesDisplay;
