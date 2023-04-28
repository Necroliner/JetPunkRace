const request = require('request');
const cheerio = require('cheerio');

exports.handler = async function(event, context, callback) {

  const userName = 'Tuperwak';
  const domain = 'www.jetpunk.com';
  const urlString = `${domain}/users/${userName}`;

  const options = {
    url: `https://cors-anywhere.herokuapp.com/${urlString}`,
    headers: { 'User-Agent': 'netlify_scraper' },
    followRedirect: false, // Disable redirection because we only care about the initial GET response
    encoding: null, // Don't set an explicit encoding, letting Node handle auto-detecting text encoding
  };
  const htmlContent = await requestGetWithOptions(options);

  const $ = cheerio.load(htmlContent);
  const pointsValue = $('div[class*="level-points"]').text();

  exports.callbackLogger((error, data, message) => {
    if (!error && !data) {
        console.info(message);
    }
  })("Log", `Shield Points: ${pointsValue}`);

  const jsonData = JSON.stringify({ shieldPoints: pointsValue });
  exports.send(jsonData);
}

async function requestGetWithOptions(options) {
  const res = await request(options);
  return res.body;
}

exports.callbackLogger = event => {
  console.log(arguments);
};


