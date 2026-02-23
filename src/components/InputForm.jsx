// Handles adding new items to buy

import { useState } from "react";
import Parse from "../services/parse";
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

function InputForm({ readTodos, listId }) {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents default behavior of the form, i.e. submitting
    try {
      const ToDoItem = Parse.Object.extend("ToDoItem");
      const toDoItem = new ToDoItem();

      toDoItem.set("task", task);
      toDoItem.set("isPurchased", false);
      const currentUser = Parse.User.current();
      toDoItem.set("owner", currentUser);

      // Pointer to match item with specific list
      const ListPointer = new Parse.Object("ToDoList");
      ListPointer.id = listId; // id passed from parent
      toDoItem.set("list", ListPointer);

      await toDoItem.save();
      readTodos(); // refresh list
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
