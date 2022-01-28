import React from "react";
import styled, { css } from "styled-components";

export default function State({ state }) {
  return (
    <StateStyle className="txHistory" state={state}>
      {state}
    </StateStyle>
  );
}

const StateStyle = styled.span`
  padding: 10px 30px;
  border-radius: 20px;
  background: #ff6d36;
  ${({ state }) => state === "complete" && backgroundComplete}
  text-transform: capitalize;
`;

const backgroundComplete = css`
  background: linear-gradient(90.66deg, #5e44ff 8.53%, #c76bff 94.11%);
`;
