const { promptForURL } = require("./scripts/inputHandler");
const { crawl } = require("./scripts/crawler");

(async () => {
    const url = await promptForURL();
    await crawl(url);
})();