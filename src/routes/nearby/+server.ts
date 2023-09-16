import axios from 'axios';
import { COHERE_API_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({request}) => {
  const { location } = await request.json();
  const options = {
    method: 'POST',
    url: 'https://api.cohere.ai/v1/generate',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${COHERE_API_KEY}`,
    },
    data: {
      max_tokens: 100,
      temperature: 0,
      truncate: 'END',
      return_likelihoods: 'NONE',
      prompt: `Provide a list in order of preference of the top 10 places to go on your next vacation to ${location}. Do not display numbering and line breaks.`
    }
  }
  const response = await axios.request(options);
  const text: string = response.data.generations[0].text;
  if (text.indexOf('1.') !== -1) {
    return json({ data: text.slice(1).split('\n').slice(0, -1).map((place: string) => place.slice(3)) }, { status: 200 })
  } else {
    return json({ data: text.slice(1).split('\n').slice(0, -1) }, { status: 200 })
  }
}
