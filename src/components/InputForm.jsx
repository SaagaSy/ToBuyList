// Handles adding new items to buy

import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px;
`;

const StyledInput = styled.input`
  padding: 0 15px;
  height: 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
`;

export default function InputForm({ onSubmit, placeholder, buttonText }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents default behavior of the form, i.e. submitting
    try {
      await onSubmit(inputValue);
      setInputValue(""); /// clear input box
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder={placeholder || "Add item"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <Button type="submit" text={buttonText || "Add"} />
    </FormContainer>
  );
}
