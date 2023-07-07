"use client";

import { useState } from "react";
import { useSession } from "next-auth/react"; //to know which user to login
import { useRouter } from "next/navigation";  //to know where it's coming from

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session} = useSession();

  const [submitting, SetSubmitting]= useState(false);
  const [post, setPost] = useState({
    prompt:'',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    SetSubmitting(true);

    try{
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

    if (response.ok) {
      router.push("/");
    }
 } catch (error) {
      console.log(error);
    } finally {
      SetSubmitting(false);
    }
  }

  return (
    <Form 
    type='Create'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}

    />
  )
}

export default CreatePrompt