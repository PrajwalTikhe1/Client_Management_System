import ArticleContext from "./ArticleContext";
import { useState } from "react";

const ArticleState = (props) => {
  const host = "http://localhost:5000";
  const articlesInitial = [];
  const [articles, setArticles] = useState(articlesInitial);

  // Get all articles
  const getArticles = async () => {
    // API
    const response = await fetch(`${host}/api/articles/fetchallarticles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setArticles(json);
  };

  // Get all articles
  const getUserArticles = async () => {
    // API
    const response = await fetch(`${host}/api/articles/fetchuserarticles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setArticles(json);
  };

  // Add a article
  const addArticle = async (article_ID, link, status, comment) => {
    // API Call
    const response = await fetch(`${host}/api/articles/addarticle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ article_ID, link, status, comment }),
    });

    const article = await response.json();
    setArticles(articles.concat(article));
  };

  // Delete a article
  const deleteArticle = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/articles/deletearticle/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const newArticles = articles.filter((article) => {
      return article._id !== id;
    });
    setArticles(newArticles);
  };

  // Edit a article
  const editArticle = async (id, article_ID, link, status, comment) => {
    // API Call
    const response = await fetch(`${host}/api/articles/updatearticle/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ article_ID, link, status, comment }),
    });
    const json = await response.json();

    let newArticles = JSON.parse(JSON.stringify(articles));
    // Logic to edit in client
    for (let index = 0; index < newArticles.length; index++) {
      const element = newArticles[index];
      if (element._id === id) {
        newArticles[index].article_ID = article_ID;
        newArticles[index].link = link;
        newArticles[index].status = status;
        newArticles[index].comment = comment;
        break;
      }
    }
    setArticles(newArticles);
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        addArticle,
        deleteArticle,
        editArticle,
        getArticles,
        getUserArticles,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};
export default ArticleState;
