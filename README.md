# JavaScript Web Crawler

This project is a modularized JavaScript web crawler that fetches, parses, and stores information from a specified URL. The crawler extracts titles, descriptions, paragraphs, images, and product information, saving the results in a structured JSON format.

## Features

- **Environment Variables**: The URL and path are stored in a `.env` file for easy configuration.
- **Data Parsing**: Extracts key elements (titles, descriptions, paragraphs, images, product info) from the HTML of the specified webpage.
- **JSON Output**: Stores the parsed data in `results.json` for further processing or analysis.

## Installation

1. Clone this repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with the target URL and path:
   ```env
   URL=<your_target_url>
   PATH=<your_desired_path>
   ```

## Usage

Run the crawler:
```bash
node index.js
```

The extracted data will be saved in `results.json`.

## Dependencies

This project uses libraries like `dotenv` for environment variable management and other packages relevant for web scraping and data handling.

---

This README should provide users with a quick overview and clear instructions for setup and execution!
