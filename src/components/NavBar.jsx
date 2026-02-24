import { Link } from "react-router-dom";
import { logoutUser } from "../services/authService";
import styled from "styled-components";
import Button from "./Button";

// Styled components
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  background-color: #9adbdb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  margin-bottom: 2rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.2 rem;
  &:hover {
    color: white;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export default function NavBar({ currentUser }) {
  const handleLogOut = async () => {
    try {
      await logoutUser();
      window.location.href = "/"; // force browser to reload
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <NavContainer>
      {/* Left side */}
      <LeftSection>
        <img
          src="/TBL_logo.png"
          alt="Logo"
          style={{ height: "40px", width: "auto", objectFit: "contain" }}
        ></img>
        {!currentUser && <NavLink to="/">Home</NavLink>}
      </LeftSection>

      {/* Right side */}
      <RightSection>
        {currentUser ? (
          <>
            <NavLink to="/lists">My Lists</NavLink>
            <Button onClick={handleLogOut} text="Log Out" />
          </>
        ) : null}
      </RightSection>
    </NavContainer>
  );
}
