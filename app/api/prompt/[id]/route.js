import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

//GET
export const GET = async (request, { params }) => {
  try {
    connectTODB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    return new Response(JSON.stringify(prompt), { staus: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to fetch Prompts", { staus: 500 })
    );
  }
};

//PATCH
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectTODB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

//DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectTODB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt Deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to Deleted Prompt", { status: 500 });
  }
};
