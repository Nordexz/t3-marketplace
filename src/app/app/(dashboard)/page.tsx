"use client";

import { Button } from "@/lib/components/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { EditCard } from "./components/edit-card";
import { useState } from "react";
import { v4 } from "uuid";

export interface PostType {
  id: string;
  title: string;
  author: string;
  description: string;
}

export default function HomePage() {
  const { data } = useSession();
  console.log(data);

  const { mutate: create } = useMutation({
    mutationFn: () =>
      axios.post("/api/sites", {
        name: data?.user.name,
        userId: data?.user.id,
      }),
  });
  // const { data: postsData } = useQuery({
  //   queryKey: ["postsData"],
  //   queryFn: () => axios.post("api/site", { id: data?.user.id }),
  // });
  // console.log(postsData?.data);

  const [posts, setPosts] = useState<PostType[]>([]);

  const deletePostHandler = (id: string) => {
    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
  };

  const createPostHandler = () => {
    const newPost = {
      id: v4(),
      title: "",
      author: "",
      description: "",
    } as PostType;
    setPosts((prevState) => [...prevState, newPost]);
  };

  const changePostHandler = (post: PostType) => {
    const indexPost = posts.findIndex(
      (currentPost) => currentPost.id === post.id,
    );
    const newPostsArr = [...posts];
    newPostsArr[indexPost] = post;
    setPosts(newPostsArr);
  };
  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <button onClick={() => create()}>CREATE SITE</button>
      <Button onClick={createPostHandler} className="mb-3">
        Create new post
      </Button>
      <div className="flex w-full max-w-5xl flex-col gap-4">
        {posts.map((post) => (
          <EditCard
            key={post.id}
            post={post}
            onPostHandler={changePostHandler}
            onDelete={deletePostHandler}
          />
        ))}
      </div>
    </main>
  );
}
