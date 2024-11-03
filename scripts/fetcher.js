const axios = require("axios");
const cheerio = require("cheerio");
const { logError } = require("./helper");
const { url, outputPath } = require("../config/settings");

async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching HTML: ", error);
  }
}

async function parseHTML() {
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

  console.log(data);
  return data;
}

module.exports = {
  fetchHTML,
  parseHTML,
};
