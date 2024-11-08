const { promptForURL } = require("./scripts/inputHandler");
const { crawl } = require("./scripts/crawler");
const settings = require("./config/settings");
const {clearTodoAndDoneFiles,clearToFile} = require ('./scripts/utils');
const logger= require('./scripts/logger');
const {archiveDataFolder} = require('./scripts/archiver');

async function main(){
    const url = await promptForURL();
    clearTodoAndDoneFiles();
    await crawl(url,1,settings.maxDepth);
    logger.info(`Job Complete`);// logger has job complete as it has come out of recursive call but links further in maxdepth were also added in recursive stack
    archiveDataFolder();
    // clearToFile();
}

main();