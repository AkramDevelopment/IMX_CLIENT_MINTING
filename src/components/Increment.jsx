import React from "react";
import styled from "styled-components";

import { ReactComponent as ArrowTop } from "../assets/img/icons/arrowTop.svg";
import { ReactComponent as ArrowBottom } from "../assets/img/icons/arrowBottom.svg";

const Increment = ({ value, change }) => {
  // function min() {

  //   resolve new Promise((resolve,reject)=> { 
  //   console.log("Hello")
  //   resolve("hello")
  //   })
   
  // }

  const decrease = () => {
    if(value === 1){
  
        change(1)
    }
  
    else 
    { 
      change(value - 1)
      console.log(value)
    }
  
  }
  
  const increase = () => {
  
      if (value === 10)
       {
         change(10)
       }
       else 
       { 
        change(value + 1)
      
       }
    
  }
  
  return (
    <Style>
      <input type="number" min="1" value={value} />
      <div>
        <button onClick={increase}>
          <ArrowTop />
        </button>
        <button onClick={decrease}>
          <ArrowBottom />
        </button>
      </div>
    </Style>
  );
};

export default Increment;

const Style = styled.div`
  position: relative;
  input {
    border: none;
    background: #433395;
    border-radius: 16px;
    color: #fff;
    padding: 20px 30px;
    width: 100%;
    font-family: "Montserrat Bold";
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    :focus {
      outline: none;
    }
  }
  > div {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0px 16px 16px 0px;
    button {
      cursor: pointer;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 30px;
      line-height: 1;
      border-radius: 0;
      background-color: transparent;
      border: none;
      :hover {
        background-color: #2875e2;
      }
    }
  }
`;
