
const puppeteer = require("puppeteer");
const {outputPath} = require("../config/settings");
const logger = require("./logger");



async function fetchPagewithPuppeteer(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url,{waitUntil: 'domcontentloaded'});

    const data = await page.evaluate(()=>{
      return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content || '',
            images: [...document.images].map(img => img.src),
            links: [...document.links].map(link => link.href)
        };
      
    });

    await browser.close();
    return data;
    
  } catch (error) {
    logger.error(`Failed to fetch data for URL: ${url}. Error: ${error.message}`);
    
    return null;
    
  } finally {
    await browser.close();
  }
  
}






module.exports = {
 
  fetchPagewithPuppeteer
};
