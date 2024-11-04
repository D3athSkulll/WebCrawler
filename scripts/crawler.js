const logger = require("./logger");
const { parseHTML, fetchPagewithPuppeteer } = require("./fetcher");
const { saveData } = require("./savedata");
const { outputPath } = require("../config/settings");
const { isEmptyObject } = require("./utils");


// Main function to crawl  URL
async function crawl(url) {
    logger.info("Crawler Initialized");
    try {
        // const data = await parseHTML(url);
        const data = await fetchPagewithPuppeteer(url);
        if (data && !isEmptyObject(data)) {
            saveData(data, outputPath);
        } else {
            throw new Error("Parsed data is empty. No data to save.");
        }
    } catch (error) {
        logger.error(`Error in main function : ${error.message}`, {
            stack: error.stack,
        });
    }
}

module.exports = {
    crawl,
};