const savedata = require ('./savedata')
const fs = require ('fs');
const path = require('path');
// contains utility functions
function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object') return true;
    const { title, images, links } = obj;
    return (
        !title &&
        (!Array.isArray(images) || images.length === 0) &&
        (!Array.isArray(links) || links.length === 0)
    );
}

function getLinks(links) {
    // Process links to remove duplicates and unwanted URLs
    const uniqueLinks = [...new Set(links)];
    return uniqueLinks.filter(link => isValidUrl(link));
}

function isValidUrl(url) {
    // Check if URL is valid and fits the desired pattern
    return url && url.startsWith('http');
}


// Helper function to clear a file
function clearFile(filePath) {
    fs.writeFileSync(filePath, ''); // Overwrite with an empty string
}
const todoFilePath = path.join(__dirname, '../logs/todo_links.txt');
const doneFilePath = path.join(__dirname, '../logs/done_links.txt');
// Function to clear both todo and done files
function clearTodoAndDoneFiles() {
    clearFile(todoFilePath);
    clearFile(doneFilePath);
}

function clearToFile()
{
    clearFile(todoFilePath);
}



module.exports = {
    getLinks, 
    isValidUrl,
    isEmptyObject,
    clearTodoAndDoneFiles,
    clearToFile
};