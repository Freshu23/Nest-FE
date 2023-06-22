import { IArticle } from "../types/article";

export const getArticles = async () => {
  const res = await fetch("http://localhost:3000/api/articles");

  return res.json();
};

export const deleteArticle = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

export const createArticle = async (article: IArticle) => {
  const res = await fetch("http://localhost:3000/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  return res.json();
};

export const updateArticle = async (article: IArticle) => {
  const res = await fetch(`http://localhost:3000/api/articles/${article.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: article.title, body: article.body }),
  });

  return res.json();
};
