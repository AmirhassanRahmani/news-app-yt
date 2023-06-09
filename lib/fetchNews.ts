import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // GraphQl query
  const query = gql`
  query MyQuery(
    $access_key: String!
    $categories: String!
    $keywords: String
  ) {
    myQuery(
      access_key: $access_key
      categories: $categories
      countries: "gb"
      sort: "published_desc"
      keywords: $keywords
    ) {
      data {
        author
        category
        country
        description
        image
        language
        source
        published_at
        title
        url
      }
      pagination {
        count
        limit
        offset
        total
      }
    }
  }
  `;
  // fetch function with Next.js 13 cathing ...
  const res = await fetch(
    "https://rwamagana.stepzen.net/api/icy-narwhal/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "content-type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );
  console.log("loading new data from api for category >>>", category, keywords);
  const newsResponse = await res.json();
  // sort function by images vs not images present
  const news = sortNewsByImage(newsResponse.data.myQuery);
  // return news
  return news;
};

export default fetchNews;
