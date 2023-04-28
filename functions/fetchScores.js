import fetch from 'node-fetch';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

export async function handler(event, context) {
  const username = event.queryStringParameters.username;
  const targetUrl = `https://www.jetpunk.com/users/${username}`;

  const response = await fetch(targetUrl);
  const data = await response.text();

  const { document } = new JSDOM(data).window;
  const scoreElement = document.querySelector('.shield-total .level-points');

  if (scoreElement) {
    const score = parseInt(scoreElement.textContent.replace(/,/g, ''), 10);
    return {
      statusCode: 200,
      body: JSON.stringify({ score }),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'User not found' }),
  };
}