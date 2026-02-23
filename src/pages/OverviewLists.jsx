import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Parse from "../services/parse";
import styled from "styled-components";
import Button from "../components/Button";

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

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 2rem;
`;

const StyledInput = styled.input`
  padding: 10px;
  height: 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
`;

const ListLink = styled(Link)`
  display: block;
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
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    readLists();
  }, []);

  // Database functions
  const readLists = async () => {
    const user = Parse.User.current();
    const query = new Parse.Query("ToDoList");
    query.equalTo("owner", user); // check for privacy
    query.descending("createdAt");
    const results = await query.find();
    setLists(results);
  };

  const createList = async (e) => {
    e.preventDefault();
    if (!newListName) return;

    const ToDoList = Parse.Object.extend("ToDoList");
    const newList = new ToDoList();
    newList.set("title", newListName);
    newList.set("owner", Parse.User.current());
    await newList.save();
    setNewListName("");
    readLists();
  };

  return (
    <PageContainer>
      <h2>My Shopping Lists</h2>

      {/* Form to create a new list */}
      <Form onSubmit={createList}>
        <StyledInput
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name (e.g. Groceries)"
        />
        <Button type="submit" text="Create" />
      </Form>

      {/* Show user's lists */}
      <ul style={{ listStyle: "none", padding: "1rem" }}>
        {lists.map((list) => (
          <li key={list.id}>
            <ListLink to={`/list/${list.id}`}>{list.get("title")}</ListLink>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
