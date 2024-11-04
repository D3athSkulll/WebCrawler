require('dotenv').config();

module.exports = {
    maxDepth: 2,
    
    outputPath: process.env.OUTPUT_PATH || './data'
}