const { promptForURL } = require("./scripts/inputHandler");
const { crawl } = require("./scripts/crawler");

async function main(){
    const url = await promptForURL();
    await crawl(url);
}

main();