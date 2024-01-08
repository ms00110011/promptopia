"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();

  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({ prompt: "", tag: "" });

  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");
  console.log(promptID);

  useEffect(() => {
    const getPromptDetails = async () => {
      console.log("useEffect says hi");

      const response = await fetch(`/api/prompt/${promptID}`);
      const data = await response.json();

      setpost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptID) {
      getPromptDetails();
    }
  }, [promptID]);

    const updatePrompt = async (e) => {
      e.preventDefault();
      setsubmitting(true);

      if(!promptID) {
        return alert("Prompt Id not found.")
      }

      try {
        const response = await fetch(`/api/prompt/${promptID}`, {
          method: "PATCH",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            
          }),
        });

        console.log(response)

        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setsubmitting(false);
      }
    };

  return (
    <Form
      type="Edit"
      post={post}
      setpost={setpost}
      submitting={submitting}
      setsubmitting={setsubmitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
