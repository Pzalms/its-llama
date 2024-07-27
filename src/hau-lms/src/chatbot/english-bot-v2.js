import LlamaAI from 'llamaai';
//import dotenv from 'dotenv';
require('dotenv').config();

const API_TOKEN = process.env.VUE_APP_API_TOKEN;
const DEFAULT_RESPONSE = "Sorry, I don't understand that. Please focus on topics related to AI and Innovation";

// Initialize the Llama API
const llamaAPI = new LlamaAI(API_TOKEN);

async function getLlamaResponse(prompt) {
  try {
    // Build the request
    const apiRequestJson = {
      "messages": [
        { "role": "user", "content": prompt }
      ],
      "stream": false
    };

    // Execute the request
    const response = await llamaAPI.run(apiRequestJson);

    if (response && response.choices && response.choices.length > 0) {
      return response.choices[0].message.content.trim();
    } else {
      return DEFAULT_RESPONSE;
    }
  } catch (error) {
    console.error("Error getting response from LlamaAPI:", error);
    return DEFAULT_RESPONSE;
  }
}

export async function getResponse(msg) {
  let cleansed = cleanseInput(msg);
  return await getLlamaResponse(cleansed);
}

function cleanseInput(str) {
  let temp = str.replace(/[^a-zA-Z0-9 ]/g, "");
  return temp.trim().toLowerCase();
}

// Example usage in an async function
async function handleMessage(msg) {
  const response = await getResponse(msg);
  console.log(response);
}

// Call handleMessage with an example message
handleMessage("Tell me about AI");

// Example usage in a non-async context
getResponse("Tell me about AI")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
