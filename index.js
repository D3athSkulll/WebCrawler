const logger = require("./scripts/logger");


const readline = require('readline');
const { url, outputPath } = require("./config/settings");
const { fetchHTML, parseHTML } = require("./scripts/fetcher");
const { saveData } = require("./scripts/helper");

function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object') return true;
    const { title, images, links } = obj;
    return (
      !title && 
      (!Array.isArray(images) || images.length === 0) && 
      (!Array.isArray(links) || links.length === 0)
    );
  }




const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the URL to crawl: ', async (url) => {
    if (!url) {
        logger.error("No URL provided. Exiting.");
        rl.close();
        process.exit(1);
    }
    rl.close();


    
    logger.info("Crawler Initialized");
    try {
        
        const data = await parseHTML(url);
    
        if (data && !isEmptyObject(data)) {
          saveData(data, outputPath);
        //   logger.info("Data saved successfully");
        } else {
            throw new Error("Parsed data is empty. No data to save.");
        }
      } catch (error) {
        logger.error(`Error in main function : ${error.message}`, {
          stack: error.stack,
        });
      }finally{
        rl.close();
      }
});





