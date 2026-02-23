// Landing page
import React from "react";
import { Link } from "react-router-dom";
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
text-align: center;
padding-bottom: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  padding: 2rem 2rem 0 2rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  padding: 0 2rem 0 2rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

export default function Welcome() {
  return (
    <PageContainer>
      <Title>Welcome to the To Buy List</Title>
      <Subtitle>
        Manage your shopping lists effortlessly. <br />
        Login or sign up to get started!
      </Subtitle>
      <Link to="/auth">
        <Button type="button" text="Login / Sign Up" />
      </Link>
    </PageContainer>
  );
}
