console.log("Crawler Initialized");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// const url = 'https://www.wikipedia.org/';
const url = 'https://www.ubisoft.com/en-gb/';

async function fetchHTML(url) {
    try {
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error('Error fetching HTML: ', error);
        
    }
}

async function parseHTML() {
    const html = await fetchHTML(url);
    if (!html) {
        console.error('Failed to retrieve HTML');
        return;
    }

    const $ = cheerio.load(html);

    // Fetch title and description
    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');

    // Fetch paragraphs
    const paragraphs = [];
    $('p').each((i, elem) => {
        paragraphs.push($(elem).text());
    });

    // Fetch images
    const images = [];
    $('img').each((i, elem) => {
        images.push($(elem).attr('src'));
    });

    // Fetch product information
    const products = [];
    $('.product').each((i, elem) => {
        const productName = $(elem).find('.product-name').text();
        const price = $(elem).find('.price').text();
        products.push({ name: productName, price: price });
    });

    // Fetch links with text
    // const links = [];
    // $('a').each((i, elem) => {
    //     const link = $(elem).attr('href');
    //     const text = $(elem).text();
    //     links.push({ link, text });
    // });

    // Combine all data
    const data = {
        title,
        description,
        paragraphs,
        images,
        products,
        // links
    };

    console.log(data);
    return data;
}

function saveData(data)
{
    fs.writeFileSync('./data/results.json',JSON.stringify(data,null,2))
    console.log("Data Saved");
}


async function main(){
    const data = await parseHTML();
    saveData(data);

}

main();