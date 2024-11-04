const logger = require("./logger");
const { parseHTML, fetchPagewithPuppeteer } = require("./fetcher");
const { saveData } = require("./savedata");
const { outputPath } = require("../config/settings");
const { isEmptyObject, getLinks, isValidUrl } = require("./utils");
const {} = require("../config/settings");

// Main function to crawl  URL
async function crawl(url,depth = 1 , maxDepth = 3) {
    if(depth>maxDepth) {
        
        return;}
    else{
        logger.info("Crawler Initialized");
    try {
        // const data = await parseHTML(url);
        logger.info(`Crawling URL: ${url} at depth: ${depth}`);
        const data = await fetchPagewithPuppeteer(url);
        if (data && !isEmptyObject(data)) {
            saveData(data, outputPath);
            const links = getLinks(data.links);

            for (const link of links)
            {
                await crawl(link,depth+1,maxDepth);
            }
        } else {
            throw new Error("Parsed data is empty. No data to save.");
        }
    } catch (error) {
        logger.error(`Error in main function : ${error.message}`, {
            stack: error.stack,
        });
    }
    }
    
}

module.exports = {
    crawl,
};