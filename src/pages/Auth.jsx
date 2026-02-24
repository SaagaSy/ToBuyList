// Handles login and sign up

import React, { useState } from "react";
import { loginUser, signUpUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 2rem;
`;

const StyledInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding-bottom: 2rem;
`;

export default function Auth({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);
      setCurrentUser(user);
      navigate("/lists");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const user = await signUpUser(username, password);
      setCurrentUser(user);
      navigate("/lists");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <PageContainer>
      <BackButton />
      <h2>Login / Sign Up</h2>
      <InputGroup>
        <StyledInput
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={handleLogin} text="Log In" />
        <Button onClick={handleSignUp} text="Sign Up" />
      </ButtonGroup>
    </PageContainer>
  );
}
