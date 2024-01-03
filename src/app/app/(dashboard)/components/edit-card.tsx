import { Button } from "@/lib/components/button";
import { Card } from "@/lib/components/card";
import { Input } from "@/lib/components/input";
import { Textarea } from "@/lib/components/textarea";
import React, { useState } from "react";
import type { PostType } from "../page";

export const EditCard = ({
  post,
  onDelete,
  onPostHandler,
}: {
  post: PostType;
  onDelete: (id: string) => void;
  onPostHandler: (post: PostType) => void;
}) => {
  const [newPost, setNewPost] = useState(post);
  return (
    <Card className="h-full min-h-[200px] w-full p-3">
      <div
        onClick={() => onDelete(post.id)}
        className="mb-2 flex cursor-pointer justify-end"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash-2"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </div>
      <div className="flex h-full flex-grow flex-col gap-2">
        <Input
          onChange={(e) =>
            setNewPost((prevState) => ({ ...prevState, title: e.target.value }))
          }
          placeholder="Title"
          defaultValue={post.title}
        />
        <Input
          onChange={(e) =>
            setNewPost((prevState) => ({
              ...prevState,
              author: e.target.value,
            }))
          }
          placeholder="Author"
          defaultValue={post.author}
        />
        <Textarea
          onChange={(e) =>
            setNewPost((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          className="min-h-[150px]"
          placeholder="Description"
          defaultValue={post.description}
        />
      </div>
      <Button
        onClick={() => onPostHandler(newPost)}
        variant="default"
        className="mt-2 w-full"
      >
        Save
      </Button>
    </Card>
  );
};
