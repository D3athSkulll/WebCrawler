console.log("Crawler Initialized");

const { url, outputPath } = require('./config/settings');
const { fetchHTML, parseHTML } = require('./scripts/fetcher');
const { saveData } = require('./scripts/helper');

async function main() {
    const html = await fetchHTML(url);
    const data = await parseHTML(html);
    
    if (data) {
        saveData(data, outputPath);
    } else {
        console.error("No data to save.");
    }
}

main();