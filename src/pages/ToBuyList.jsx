import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createToDoItem,
  getListTitle,
  getToDoItems,
  toggleItem,
  deleteItem,
} from "../services/toBuyService";
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
  const [loading, setLoading] = useState(true);

  // Get listId from the URL
  const { listId } = useParams();

  // Effect (runs whenever listId changes)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [listData, itemsData] = await Promise.all([
          getListTitle(listId),
          getToDoItems(listId),
        ]);

        setListTitle(listData.title);
        setTasks(itemsData);
      } catch (error) {
        console.error("Error loading data: " + error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [listId]);

  const refreshItems = async () => {
    const items = await getToDoItems(listId);
    setTasks(items);
  };

  const handleAddItem = async (taskName) => {
    await createToDoItem(taskName, listId);
    refreshItems();
  };

  const handleToggle = async (task) => {
    try {
      await toggleItem(task.id);
      refreshItems(); // refresh list
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleDelete = async (task) => {
    try {
      await deleteItem(task.id);
      refreshItems(); // refresh list
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <PageContainer>
      {!loading && (
        <>
          <BackButton />
          <h2>{listTitle}</h2>
          <InputForm
            onSubmit={handleAddItem}
            placeholder="Add item"
            buttonText="Add"
          />

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
                    onToggle={() => handleToggle(task)}
                    onDelete={() => handleDelete(task)}
                  />
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </PageContainer>
  );
}
