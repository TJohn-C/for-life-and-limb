/*
  Minimal Gemini agent (CommonJS).
  Usage:
    node ai/agent.js "Describe the landscape of Ohmm under the light of the Earth and the moon."
*/

const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env');
  process.exit(1);
}

// Gemini REST endpoint (v1beta generateContent for a public key param)
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

async function queryGemini(prompt) {
  try {
    const body = {
      // minimal request shape — Gemini APIs may accept several forms.
      // We send a plain text prompt in the contents field.
      // If your API expects a different shape, we can adapt.
      input: {
        text: prompt
      },
      // optional: you can tune temperature, maxOutputTokens, safety settings here
      // (fields below are illustrative; adjust per the API docs you have)
      // parameters: { temperature: 0.7, maxOutputTokens: 300 }
    };

    const res = await axios.post(`${API_URL}?key=${API_KEY}`, body, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });

    // Best-effort extraction; actual field path can vary by model/API version
    const candidate = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const fallback = res.data?.output?.[0]?.content?.text;

    const text = candidate || fallback || JSON.stringify(res.data, null, 2);
    console.log('\\n🤖 Gemini says:\\n');
    console.log(text);
  } catch (err) {
    if (err.response) {
      console.error('API error:', err.response.status, err.response.data);
    } else {
      console.error('Request error:', err.message);
    }
  }
}

const userPrompt = process.argv.slice(2).join(' ') || 'Describe the landscape of Ohmm under the light of the Earth and the moon.';
queryGemini(userPrompt);
