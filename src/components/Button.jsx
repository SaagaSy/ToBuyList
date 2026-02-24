import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0 20px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
  transition: opacity 0.2s ease-in-out;

  ${(props) =>
    props.$variant === "secondary"
      ? ` /* Secondary */
  background-color: transparent;
  border: 2px solid #c0392b;
  color: #c0392b;
  &:hover {
  background-color: #c0392b;
  border-color: 2px solid #a93226;
  color: white;
  }
    `
      : `
    /* Primary */
  background-color: #eb8a02;
  border: none;
  color: white;
  &:hover {
  background-color: #d35400;
  }
  `}

  /* Neutral */
  ${(props) =>
    props.$variant === "neutral" &&
    `
  background-color:#8ab8b8;
  border: none;
  color: white;
  &:hover {
  background-color:rgb(113, 140, 140);
  }
    `}
`;

export default function Button({
  onClick,
  text,
  type = "button",
  variant = "primary",
}) {
  return (
    <StyledButton onClick={onClick} type={type} $variant={variant}>
      {text}
    </StyledButton>
  );
}
