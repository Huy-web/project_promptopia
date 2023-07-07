"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";  //to know where it's coming from

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, SetSubmitting]= useState(false);
  const [post, setPost] = useState({
    prompt:'',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    SetSubmitting(true);

    if (!promptId) return alert("Prompt ID not found!");

    try{
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}

    />
  )
}

export default EditPrompt