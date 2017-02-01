This is a simple app using node.js to scrape the front page of the Hacker News website.

The scrape returns all the top ranking links as well as the following metadata: 

1. title
2. URL 
3. Number of points/comments it received

The app mainly uses a module called cheerio by Matthew Mueller which implements a subset of jQuery specifically designed for server use.

The app will also make use of the request module as a simplified HTTP client.