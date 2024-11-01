require('dotenv').config();

module.exports = {
    url: process.env.URL|| 'https://www.ubisoft.com/en-gb/',
    outputPath: process.env.OUTPUT_PATH || './data/results.json'
}