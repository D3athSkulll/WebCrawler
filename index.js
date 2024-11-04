const { promptForURL } = require("./scripts/inputHandler");
const { crawl } = require("./scripts/crawler");
const settings = require("./config/settings");

async function main(){
    const url = await promptForURL();
    
    await crawl(url,1,settings.maxDepth);
    logger.info(`Job Complete`);
}

main();