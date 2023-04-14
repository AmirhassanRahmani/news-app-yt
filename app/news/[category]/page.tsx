import fetchNews from "@/lib/fetchNews";
import NewsList from "@/app/NewsList";
import { categories } from "@/constants";
type Props = {
  params: { category: Category };
};

async function NewsCategory({ params: { category } }: Props) {
  const news: NewsResponse = await fetchNews(category);
  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default NewsCategory;

export async function generationStaticParams() {
  return categories.map((category) => ({
    category: category,
  }));
}

// locallhost:3000/news/business
// locallhost:3000/news/entertainment
// locallhost:3000/news/general
// locallhost:3000/news/science
// locallhost:3000/news/sports
// locallhost:3000/news/technology
// ^^^ prebuild these pages
