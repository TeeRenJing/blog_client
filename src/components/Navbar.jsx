import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import { HStack } from "@chakra-ui/react";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <HStack>
      <div className="logo">
        <Link to="/">
          <h6>HOME</h6>
        </Link>
      </div>

      <Link className="link" to="/?category=Art">
        <h6>ART</h6>
      </Link>
      <Link className="link" to="/?category=Science">
        <h6>SCIENCE</h6>
      </Link>
      <span>{currentUser?.name}</span>
      {currentUser ? (
        <Link onClick={logout}>Logout</Link>
      ) : (
        <Link className="link" to="/login">
          Login
        </Link>
      )}
      <span className="write">
        <Link className="link" to="/write">
          Write
        </Link>
      </span>
    </HStack>
  );
};

export default Navbar;
