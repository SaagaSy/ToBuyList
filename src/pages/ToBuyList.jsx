import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Parse from "../services/parse";
import styled from "styled-components";
import InputForm from "../components/InputForm";
import ToDoItem from "../components/ToDoItem";
import BackButton from "../components/BackButton";

// Displays all tasks with controls for marking

const PageContainer = styled.div`
max-width: 60%;
width: 90%;
margin: 0 auto;
padding: 2rem,
background-color: white;
border-radius: 8px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
h2{
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
`;

export default function ToBuyList() {
  // State (store data)
  const [tasks, setTasks] = useState([]);
  const [listTitle, setListTitle] = useState("");

  // Get listId from the URL
  const { listId } = useParams();

  // Effect (runs whenever listId changes)
  useEffect(() => {
    readListTitle();
    readTodos();
  }, [listId]);

  // Database functions
  const readListTitle = async () => {
    const query = new Parse.Query("ToDoList");
    query.select("title");
    try {
      const specificList = await query.get(listId);
      setListTitle(specificList.get("title"));
    } catch (error) {
      console.error("Error reading list title: ", error);
      setListTitle("Shopping List"); // fallback
    }
  };

  const readTodos = async () => {
    const currentUser = Parse.User.current();
    const currenList = new Parse.Object("ToDoList"); // pointer to the current list
    currenList.id = listId;

    if (currentUser) {
      const query = new Parse.Query("ToDoItem");
      query.equalTo("owner", currentUser); // check to which user item belongs to
      query.equalTo("list", currenList); // check to which list item belongs to
      query.ascending("isPurchased"); // sort by if the item is bought
      query.addDescending("createdAt");
      query.select("task", "isPurchased", "createdAt");

      try {
        const results = await query.find();
        setTasks(results);
      } catch (error) {
        console.error("Error reading todos: ", error);
      }
    }
  };

  const toggleTask = async (task) => {
    try {
      task.set("isPurchased", !task.get("isPurchased"));
      await task.save();
      readTodos(); // refresh list
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const deleteTask = async (task) => {
    try {
      await task.destroy();
      readTodos(); // refresh list
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <PageContainer>
      <BackButton />
      <h2>{listTitle}</h2>
      <InputForm readTodos={readTodos} listId={listId} />

      <div style={{ marginTop: "20px" }}>
        {tasks.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#888",
              paddingBottom: "1.5rem",
            }}
          >
            No items added yet!
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 10 }}>
            {tasks.map((task) => (
              <ToDoItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task)}
                onDelete={() => deleteTask(task)}
              />
            ))}
          </ul>
        )}
      </div>
    </PageContainer>
  );
}
