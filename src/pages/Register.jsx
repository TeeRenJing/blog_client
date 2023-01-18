import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, VStack, Text, Button } from "@chakra-ui/react";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <VStack>
      <Text as="b">Register</Text>
      <form>
        <Input
          required
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
        />
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
          Register
        </Button>
        {err && <p>{err}</p>}
        <Text>
          Have an account? <Link to="/login">Login</Link>
        </Text>
      </form>
    </VStack>
  );
};

export default Register;
