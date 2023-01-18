import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Heading,
  Text,
  Button,
  Tag,
  VStack,
  Textarea,
  SimpleGrid,
  GridItem,
  Box,
  StackDivider,
  Flex,
} from "@chakra-ui/react";

const Single = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data.data);
        const commentsres = await axios.get(`/comments/${postId}`);
        setComments(commentsres.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  async function handlePublish() {
    try {
      await axios.post(`/comments/`, {
        comment: newComment,
        postID: parseInt(postId, 10),
        userID: currentUser.id,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card size="lg">
      <CardHeader>
        <Heading size="xl"> {post.title}</Heading>
        <Heading size="sm"> Posted by {post.User?.name}</Heading>
        <Tag>{post.category}</Tag>
      </CardHeader>
      <CardBody>
        <Text fontSize="5xl">{post.content}</Text>
      </CardBody>
      <CardFooter>
        <VStack>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {comments.map((comment) => (
              <Box
                minWidth="2000"
                borderWidth="1px"
                borderRadius="lg"
                p="5"
                key={comment.ID}
              >
                <Heading size="sm"> {comment.User?.name}: </Heading>
                <Text fontSize="sm"> {comment.comment}</Text>
              </Box>
            ))}
          </VStack>

          {/*       
          {comments.map((comment) => (
            <Card size="sm" key={comment.ID}>
              <CardHeader>
                <Heading size="sm"> By {comment.User?.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{comment.comment}</Text>
              </CardBody>
            </Card>
          ))} */}
          {currentUser && (
            <>
              <Textarea
                placeholder="New comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={handlePublish}>Publish</Button>
            </>
          )}
          {currentUser?.id === post.UserID && (
            <div className="edit">
              <Button>
                <Link to={`/write?edit=2`} state={post}>
                  Edit
                </Link>
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          )}
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default Single;
