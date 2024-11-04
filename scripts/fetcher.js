const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
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


async function fetchPagewithPuppeteer(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url,{waitUntil: 'networkidle2'});

    const data = await page.evaluate(()=>{
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        images: Array.from(document.querySelectorAll('img')).map(img=>img.src),
        links: Array.from(document.querySelectorAll('a')).map(link=>({
          href: link.href,
          text: link.innerText.trim()
        })),
      };
    });

    await browser.close();
    return data;
    
  } catch (error) {
    logger.error('Error fetching page with puppeteer:',error);
    await browser.close();
    throw error;
    
  }
  
}






module.exports = {
  fetchHTML,
  parseHTML,
  fetchPagewithPuppeteer
};
