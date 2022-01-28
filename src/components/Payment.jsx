import React from "react";
import styled from "styled-components";

import { ReactComponent as ArrowTop } from "../assets/img/icons/arrowTop.svg";
import { ReactComponent as ArrowBottom } from "../assets/img/icons/arrowBottom.svg";

const Payment = ({ value, change }) => {
  // function min() {

  //   resolve new Promise((resolve,reject)=> { 
  //   console.log("Hello")
  //   resolve("hello")
  //   })
   
  // }

  const IMX = () => {
   change("IMX")
  
  }
  
  const LayerOne = () => {
  
     change("ETH")
    
  }
  
  return (
    <Style>
      <input  value={value}/>
      <div>
        <button onClick={IMX}>
          <ArrowTop />
        </button>
        <button onClick={LayerOne}>
          <ArrowBottom />
        </button>
      </div>
    </Style>
  );
};

export default Payment;

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
