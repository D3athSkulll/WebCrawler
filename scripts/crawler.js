const logger = require("./logger");
const {  fetchPagewithPuppeteer } = require("./fetcher");
const { saveData } = require("./savedata");
const { outputPath } = require("../config/settings");
const { isEmptyObject, getLinks, isValidUrl } = require("./utils");
const {} = require("../config/settings");
const { addToTodoLinks, moveToDoneLinks } = require('./savedata');

// Main function to crawl  URL
async function crawl(url,depth = 1 , maxDepth = 3) {
    if(depth>maxDepth) {
        
        return;}
    else{
        logger.info("Crawler Initialized");
    try {
        // const data = await parseHTML(url);
        
        logger.info(`Crawling URL: ${url} at depth: ${depth}`);
        addToTodoLinks(url,depth,maxDepth);
        

        const data = await fetchPagewithPuppeteer(url);
        if (data && !isEmptyObject(data)) {
            saveData(data, outputPath);
            const links = getLinks(data.links);

            for (const link of links)
            {

                     // Add the link to "todo" list for further crawling
                    await crawl(link, depth + 1, maxDepth); // Recursive crawl with increased depth
                    
            }
        } else {
            throw new Error("Parsed data is empty. No data to save.");
        }
        moveToDoneLinks(url);
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