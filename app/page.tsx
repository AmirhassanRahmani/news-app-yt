import { categories } from "@/constants";
import fetchNews from "@/lib/fetchNews";
import React from "react";
import NewsList from "./NewsList";
async function HomePage() {
  // fetch news data
  const news: NewsResponse = await fetchNews(categories.join(","));
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div>
      <NewsList news={news} />
    </div>
  );
}

export default HomePage;
