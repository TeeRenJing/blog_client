import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Input, VStack, Text, Button } from "@chakra-ui/react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <VStack>
      <Text as="b">Login</Text>
      <form>
        <Input
          required
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <Input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <Button mt={4} colorScheme="teal" onClick={handleSubmit} type="submit">
          Login
        </Button>
        {err && <Text>{err}</Text>}
        <Text>
          Don't have an account? <Link to="/register">Register</Link>
        </Text>
      </form>
    </VStack>
  );
};

export default Login;
