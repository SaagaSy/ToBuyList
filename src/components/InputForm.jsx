// Handles adding new items to buy

import { useState } from "react";
import { createToDoItem } from "../services/toBuyService";
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

function InputForm({ onTaskAdded, listId }) {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents default behavior of the form, i.e. submitting
    try {
      await createToDoItem(task, listId);
      onTaskAdded(); // refresh list
      setTask(""); /// clear input box
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Add item"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <Button type="submit" text="Add" />
    </FormContainer>
  );
}

export default InputForm;
