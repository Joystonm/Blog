// const { ModelClient, isUnexpected } = require("@azure-rest/ai-inference");
// const { AzureKeyCredential } = require("@azure/core-auth");
// require("dotenv").config(); // Ensure this is at the top
// const token = process.env["GITHUB_TOKEN"]; // Now using environment variable

// // Make sure to use your actual GitHub token here.
// const endpoint = "https://models.github.ai/inference";
// const model = "openai/gpt-4.1-mini";

// // Summarize text function
// async function summarizeText(text) {
//   const client = ModelClient(endpoint, new AzureKeyCredential(token));

//   try {
//     const response = await client.path("/chat/completions").post({
//       body: {
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: `Summarize the following text:\n\n${text}` },
//         ],
//         temperature: 0.5,
//         top_p: 1,
//         model: model,
//       },
//     });
//     console.log("API response:", response);
//     if (isUnexpected(response)) {
//       console.error("Unexpected response from API:", response.body);
//       throw response.body.error;
//     }

//     return response.body.choices[0].message.content;
//   } catch (error) {
//     console.error("Error in summarizeText function:", error);
//     throw new Error("Failed to summarize text");
//   }
// }

// // Export the summarizeText function using CommonJS
// module.exports = { summarizeText };



// Import necessary Azure modules
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// Set up Azure API credentials and endpoint
const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-mini";

// Function to summarize text
export async function summarizeText(text) {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Summarize the following text:\n\n${text}` },
        ],
        temperature: 0.5,
        top_p: 1,
        model: model,
      },
    });

    if (isUnexpected(response)) {
      console.error("Unexpected response from API:", response.body);
      throw response.body.error;
    }

    return response.body.choices[0].message.content;
  } catch (error) {
    console.error("Error in summarizeText function:", error);
    throw new Error("Failed to summarize text");
  }
}
