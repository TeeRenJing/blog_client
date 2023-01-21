import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Heading,
  Text,
  Button,
  Tag,
} from "@chakra-ui/react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const search = useLocation().search;
  const category = new URLSearchParams(search).get("category");
  console.log(category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts`);
        category
          ? setPosts(res.data.data.filter((post) => post.category == category))
          : setPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <Card key={post.ID}>
            <CardHeader>
              <Heading size="3xl"> {post.title}</Heading>
              <Heading size="sm"> Posted by {post.User.name}</Heading>
              <Tag>{post.category}</Tag>
            </CardHeader>
            <CardBody>
              <Text fontSize="2xl">{post.content}</Text>
            </CardBody>
            <CardFooter>
              <Link className="link" to={`/post/${post.ID}`}>
                View More
              </Link>
            </CardFooter>
          </Card>

          // <div className="post" key={post.ID}>
          //   <div className="img">
          //     <img src={`../upload/${post.img}`} alt="" />
          //   </div>
          //   <div className="content">
          //     <Link className="link" to={`/post/${post.ID}`}>
          //       <h1>{post.title}</h1>
          //     </Link>
          //     <p>{getText(post.desc)}</p>
          //     <button>Read More</button>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
