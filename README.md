# Node.js CLI Web Crawler

A JavaScript-based CLI web crawler that takes a base URL as input, crawls the website for specified data, and saves the results in JSON format. The crawler captures the page title, description, image links , and links found on each page, and supports depth-level searching up to two levels. All results are saved in a zip archive for easy access and storage.

## Technologies Used

- **JavaScript**: Core language for scripting and logic.
- **Puppeteer**: Handles URL data fetching and DOM manipulation.
- **Winston**: Provides robust logging functionality.
- **Archiver**: Creates zip archives of the results.
- **fs & path**: Native Node.js modules for file system and path operations.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To start the web crawler:

```bash
node index.js
```

1. The crawler will prompt you to enter a base URL.
2. It will then process the base URL, fetching the title, description, images, and links from the page and any linked pages up to a depth of 2 (this depth level can be adjusted in the code).
3. The results are saved as JSON files in the `data` folder, which are then archived into `results.zip`.

### Changing Depth Level

The crawler currently supports depth-level searching up to 2 levels. To change this depth, adjust the appropriate depth setting in `crawler.js` (or the relevant file).

## Logging

Logs are saved in the `logs` folder:

- `combined.log`: Contains general logs.
- `error.log`: Logs errors encountered during execution.
- `todo_links.txt` and `done_links.txt`: Track URLs that are yet to be processed and those that have been crawled.

## Output

- JSON data for each page is stored in the `data` folder.
- All JSON files are archived into `results.zip` for easy access and transfer.

This `README.md` should give users a clear understanding of the project, its setup, and how to use it. Let me know if there are any other details you’d like to include!
