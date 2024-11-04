
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




module.exports = {
    getLinks, 
    isValidUrl,
    isEmptyObject,
};