import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export default function Button({ to, children, variant, ...rest }) {
  if (to)
    return (
      <LinkStyle to={to} variant={variant} {...rest}>
        {children}
      </LinkStyle>
    );
  return (
    <ButtonStyle variant={variant} {...rest}>
      <span>{children}</span>
    </ButtonStyle>
  );
}

const Style = css`
  font-family: "Montserrat Bold", sans-serif;
  border: unset;
  white-space: nowrap;
  border-radius: 10px;
  padding: 23px 50px;
  display: inline-block;
  cursor: pointer;
  line-height: 1.1;
  letter-spacing: 0.8px;
  font-size: 1rem;
  text-transform: uppercase;
  transition: all 300ms ease-in-out;
  &:hover {
    background: linear-gradient(90.66deg, #5e44ff 8.53%, #c76bff 94.11%);
    span {
      background: #fff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    transition: all 300ms ease-in-out;
  }
`;

const ButtonStyle = styled.button`
  ${Style}
  ${({ variant }) => (variant === "secondary" ? Secondary : Primary)};
`;
const LinkStyle = styled(Link)`
  ${Style}
  ${({ variant }) => (variant === "secondary" ? Secondary : Primary)};
`;

const Primary = css`
  color: #fff;
  background: linear-gradient(90.33deg, #ffa24d -1.51%, #ff6332 99.75%);
`;

const Secondary = css`
padding: 23px 50px;



  background #800000;
  span {
    background: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover {
    background: 	#8B0000;
    span {
      background: #fff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
`;
