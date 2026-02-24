// Represents a single task that has actions (e.g. compeleted or active)

import React from "react";
import Button from "./Button";
import styled from "styled-components";

const ItemLine = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  border-bottom: 1px solid #eee;
`;

export default function ToDoItem(props) {
  const item = props.task;
  const deleteItem = props.onDelete;
  const toggleItem = props.onToggle;

  // read values
  const description = item.task;
  const isBought = item.isPurchased;

  return (
    <ItemLine>
      {/* Item text */}
      <span
        style={{
          textDecoration: isBought ? "line-through" : "none",
          color: "#333",
        }}
      >
        {description}
      </span>

      {/* Buttons */}
      <div>
        {/* Toggle button */}
        <Button
          text={isBought ? "Undo" : "Bought"}
          onClick={() => toggleItem(item)}
          variant={isBought ? "neutral" : "primary"}
        />

        {/* Delete button */}
        <Button
          text="Delete"
          onClick={() => deleteItem(item)}
          variant="secondary"
        />
      </div>
    </ItemLine>
  );
}
