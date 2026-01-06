import fetch from "node-fetch";
import fs from "fs";

async function scrape() {
  const url = "https://jessmiam.over-blog.com/tag/gouters/";
  const response = await fetch(url);
  const html = await response.text();

  // Extraction des titres d’articles
  const regex = /<h2 class="post-title">[\s\S]*?<a[^>]*>(.*?)<\/a>/g;

  const results = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    results.push({
      name: match[1].trim()
    });
  }

  fs.writeFileSync("gouters.json", JSON.stringify(results, null, 2));
}

scrape();

