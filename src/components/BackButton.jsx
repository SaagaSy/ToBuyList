import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  padding: 20px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    color: #d35400;
  }
`;

export default function BackButton() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // goes one step back on history stack
  };

  return <StyledButton onClick={handleBackClick}>← Back</StyledButton>;
}
