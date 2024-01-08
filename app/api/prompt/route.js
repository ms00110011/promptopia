import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    connectTODB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { staus: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to fetch Prompts", { staus: 500 })
    );
  }
};
