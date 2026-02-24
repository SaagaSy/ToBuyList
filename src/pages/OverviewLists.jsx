import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLists, createList, deleteList } from "../services/toBuyService";
import styled from "styled-components";
import Button from "../components/Button";
import InputForm from "../components/InputForm";

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
  padding-top: 2rem;
  margin-bottom: 2rem;
}
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border-bottom: 1px solid #eee;
`;

const ListLink = styled(Link)`
  flex-grow: 1;
  background: #fffefb;
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  text-decoration: none;
  color: #333;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.2s;
  &:hover {
    background: #cee1e1;
  }
`;

export default function OverviewLists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    readLists();
  }, []);

  // Database functions
  const readLists = async () => {
    try {
      const myLists = await getLists();
      setLists(myLists);
    } catch (error) {
      console.error("Error fetching lists: ", error);
    }
  };

  const handleCreateList = async (listTitle) => {
    e.preventDefault();
    if (!listTitle) return;

    try {
      await createList(listTitle);
      readLists(); // refresh
    } catch (error) {
      alert("Error creating list: " + error.message);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      readLists();
    } catch (error) {
      alert("Error deleting list: " + error.message);
    }
  };

  return (
    <PageContainer>
      <h2>My Shopping Lists</h2>

      {/* Form to create a new list */}
      <InputForm
        onSubmit={handleCreateList}
        placeholder="New List Name (e.g. Groceries)"
        buttonText="Create"
      />

      {/* Show user's lists */}
      <ul style={{ listStyle: "none", padding: "1rem" }}>
        {lists.map((list) => (
          <ListItem key={list.id}>
            <ListLink to={`/list/${list.id}`}>{list.title}</ListLink>
            <Button
              text="Delete"
              variant="secondary"
              onClick={() => handleDeleteList(list.id)}
            />
          </ListItem>
        ))}
      </ul>
    </PageContainer>
  );
}
