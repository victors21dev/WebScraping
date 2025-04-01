/* The code snippet `const axios = require("axios"); const cheerio = require("cheerio"); const mysql =
require("mysql2"); require("dotenv").config();` is importing and setting up the necessary libraries
and modules for the JavaScript script to perform web scraping and interact with a MySQL database. */
const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require("mysql2");
require("dotenv").config();

/* The code snippet `const connection = mysql.createConnection({ ... });` is establishing a connection
to a MySQL database using the `mysql` library in Node.js. It creates a connection object
`connection` with the specified configuration parameters: */
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/* The code snippet `connection.connect(function (err) { ... });` is establishing a connection to a
MySQL database using the `mysql` library in Node.js. */
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

/* The line `const URL = "https://nahoradoocio.lowlevel.com.br/";` is declaring a constant variable
named `URL` and assigning it the value of the URL "https://nahoradoocio.lowlevel.com.br/". This URL
is used as the target website from which the script will fetch data using Axios and then parse the
HTML content using Cheerio. */
const URL = "https://nahoradoocio.lowlevel.com.br/";

async function main() {
  /* This JavaScript code is a web scraping script that fetches data from a specific website
(https://nahoradoocio.lowlevel.com.br/) using Axios to make an HTTP request and Cheerio to parse the
HTML content of the response. */
  const response = await axios(URL);
  const html = response.data;
  const $ = cheerio.load(html);

  /* The lines `const YouMayLike = [];` and `const GridBlog = [];` are initializing two empty arrays
named `YouMayLike` and `GridBlog` respectively. These arrays are used to store the extracted data
from the web scraping process for the "You may like" section and the "GridBlog" section of the
target website. */
  const YouMayLike = [];
  const GridBlog = [];

  //   You may like
  $(".related-posts section").each(function () {
    /* The code snippet you provided is part of a web scraping script written in JavaScript using Axios
 and Cheerio libraries. In this specific part of the script, the code is targeting elements within
 the HTML structure of the fetched webpage to extract specific information related to posts in the
 "You may like" section. */
    const title = $(this).find("h4 a").html();
    const url = $(this).find("a").attr("href");
    const img_gif_src = $(this).find("a img").attr("src");
    const publication_date = $(this).find(".related-post-date").html();
    //
    YouMayLike.push({
      title,
      url,
      img_gif_src,
      publication_date,
    });
  });

  //   GridBlog
  $(".blog-grid li").each(function () {
    /* The provided code snippet is part of a web scraping script written in JavaScript using Axios and
Cheerio libraries. In this specific part of the script, the code is targeting elements within the
HTML structure of the fetched webpage to extract specific information related to posts in the
"GridBlog" section. */
    const title = $(this).find("article .post-header .post-title a").html();
    const category = $(this)
      .find("article .post-header .post-categories a")
      .html();
    let comments = $(this)
      .find("article .post-header .post-meta .post-comments")
      .html();
    if (comments.length < 14) {
      comments = Number(comments.slice(0, 1));
    } else {
      comments = Number(comments.slice(0, 2));
    }
    const url = $(this).find("article .post-header .post-title a").attr("href");
    const img_gif_src = $(this).find("li article .post-media img").attr("src");
    //
    GridBlog.push({
      title,
      category,
      comments,
      url,
      img_gif_src,
    });
  });

  /* The code snippet you provided is iterating over each element in the `YouMayLike` array using the
`forEach` method. For each element in the array, it is executing a SQL query to insert data into a
MySQL database table named `you_may_like`. */
  YouMayLike.forEach((element) => {
    connection.query(
      `INSERT INTO you_may_like(title, url, img_gif_src, publication_date) VALUES ('${element.title}', '${element.url}','${element.img_gif_src}','${element.publication_date}')`,
      function (err, results) {}
    );
  });

  /* The code snippet you provided is iterating over each element in the `GridBlog` array using the
`forEach` method. For each element in the array, it is executing a SQL query to insert data into a
MySQL database table named `you_may_like`. */
  GridBlog.forEach((element) => {
    connection.query(
      `INSERT INTO gridblog(title, category, comments, url, img_gif_src) VALUES ('${element.title}', '${element.category}','${element.comments}','${element.url}', '${element.img_gif_src}')`,
      function (err, results) {}
    );
  });
}

main();
