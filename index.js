const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://nahoradoocio.lowlevel.com.br/";

async function main() {
  const response = await axios(URL);
  const html = response.data;
  const $ = cheerio.load(html);
  const YouMayLike = [];
  const GridBlog = [];

  //   You may like
  $(".related-posts section").each(function () {
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
    const title = $(this).find("article .post-header .post-title a").html();
    const category = $(this)
      .find("article .post-header .post-categories a")
      .html();
    const comments = $(this)
      .find("article .post-header .post-meta .post-comments")
      .html();
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

  console.log(YouMayLike);
  console.log(GridBlog);
}

main();
