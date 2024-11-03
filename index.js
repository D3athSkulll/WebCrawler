const logger = require("./scripts/logger");

logger.info("Crawler Initialized");

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
async function main() {
  try {
    const html = await fetchHTML(url);
    const data = await parseHTML(html);

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
  }
}

main();
