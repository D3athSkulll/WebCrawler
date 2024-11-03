
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

module.exports = {
    isEmptyObject,
};