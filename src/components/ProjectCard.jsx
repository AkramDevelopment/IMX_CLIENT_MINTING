import React from "react";
import styled from "styled-components";

export default function Project({ img, job, role }) {
  return (
    <ProjectStyle data-aos="fade-up">
      <div className="imgHolder">
        <img src={img} alt="" />
      </div>
      <div className="details">
        <h4>{job}</h4>
        <p>{role}</p>
      </div>
    </ProjectStyle>
  );
}

const ProjectStyle = styled.article`
  width: 376px;
  background: linear-gradient(180deg, #1e1552 0%, rgba(30, 21, 82, 0) 100%);
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .imgHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 210px;
    min-height: 210px;
    background: linear-gradient(180deg, #7361e3 0%, rgba(30, 21, 82, 0) 100%);
    border-radius: 10px;
    margin-bottom: 30px;
    img {
      border-radius: 12px;
    }
  }
  .details {
    h4 {
      margin-bottom: 13px;
    }
  }
  @media (max-width: 768px) {
    padding: 30px;
    flex-direction: column;
    .imgHolder {
      margin-bottom: 40px;
    }
  }
`;
