const axios = require("axios");
const cheerio = require("cheerio");

const {outputPath} = require("../config/settings");
const logger = require("./logger");

async function fetchHTML(url) {
  try {
    
    logger.info(`Fetching URL`);
    const res = await axios.get(url);
    const data = res.data;
    const dataSize = data.length;
    

    logger.info(`URL: ${url}, Data size: ${dataSize} bytes`, );
    return data;
  } catch (error) {
    logger.error(`Error fetching HTML from URL: ${url}`, {
      stack: error.stack,
    });
    throw error;
  }
}

async function parseHTML(url) {
  const html = await fetchHTML(url);
  if (!html) {
    console.error("Failed to retrieve HTML");
    return;
  }

  const $ = cheerio.load(html);

  // Fetch title and description
  const title = $("title").text();
  const description = $('meta[name="description"]').attr("content");

  // Fetch images
  const images = [];
  $("img").each((i, elem) => {
    images.push($(elem).attr("src"));
  });

  // Fetch links with text
  const links = [];
  $("a").each((i, elem) => {
    const link = $(elem).attr("href");
    const text = $(elem).text();
    links.push({ link, text });
  });

  // Combine all data
  const data = {
    title,
    description,
    images,
    links,
  };

  
  return data;
}

module.exports = {
  fetchHTML,
  parseHTML,
};
