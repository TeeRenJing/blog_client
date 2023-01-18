import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Textarea,
  Input,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

const Write = () => {
  const state = useLocation().state;
  const [content, setContent] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [category, setCategory] = useState(state?.category || "");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleClick = async (e) => {
    e.preventDefault();

    try {
      state
        ? await axios.patch(`/posts/${state.ID}`, {
            upvotes: state.upvotes,
            title,
            content,
            category,
          })
        : await axios.post(`/posts/`, {
            title,
            content,
            category,
            upvotes: 1,
            userID: currentUser.id,
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <VStack>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          className="editor"
          theme="snow"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <RadioGroup defaultValue={category} onChange={setCategory} mb={6}>
          <HStack spacing={5}>
            <Radio value="Art">Art</Radio>
            <Radio value="Science">Science</Radio>
          </HStack>
        </RadioGroup>
        <Button onClick={handleClick}>Publish</Button>
      </VStack>
    </Card>
  );
};

export default Write;
