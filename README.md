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
   git clone https://github.com/D3athSkulll/WebCrawler
   cd <repository-folder>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To start the web crawler:

```bash
npm start
```

1. The crawler will prompt you to enter a base URL.
![image](https://github.com/user-attachments/assets/4ae40b55-5313-4590-a93b-10d04c6c47a4)

2. It will then process the base URL, fetching the title, description, images, and links from the page and any linked pages up to a depth of 2 (this depth level can be adjusted in the code).
![image](https://github.com/user-attachments/assets/e7c1f3bf-fb4d-4256-932e-4eaa7c8374be)

3. The results are saved as JSON files in the `data` folder, which are then archived into `results.zip`.
   ![image](https://github.com/user-attachments/assets/8ea063ab-bc56-44c5-a311-2cb8ca2b1aed)


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
