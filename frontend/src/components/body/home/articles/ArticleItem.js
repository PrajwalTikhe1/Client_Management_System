import React, { useContext } from "react";
import articleContext from "../../../../context/articles/ArticleContext";
import { Link } from "react-router-dom";

const ArticleItem = (props) => {
  const context = useContext(articleContext);
  const { deleteArticle } = context;
  const { article, updateArticle } = props;
  return (
    <tr>
      <td>
        <p className="text-light" name="article_ID">
          {article.article_ID}
        </p>
      </td>
      <td>
        <Link className="text-light artlink" to={article.link}>
          {article.link}
        </Link>
      </td>
      <td>
        {article.status === false ? (
          <button className="btn border-shadow BUTTS">
            <span className="text-gradient">NO</span>
          </button>
        ) : article.status === true ? (
          <button className="btn border-shadow BUTTS">
            <span className="text-gradient">YES</span>
          </button>
        ) : (
          <button className="btn border-shadow BUTTS">
            <span className="text-gradient">Default</span>
          </button>
        )}
      </td>
      <td>
        <div className="card p-2" style={{ width: "100%" }}>
          {article.comment}
        </div>
      </td>
      <td>
        <div
          className="row"
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            color: "whitesmoke",
          }}
        >
          <span
            onClick={() => {
              updateArticle(article);
            }}
          >
            Edit
            <i
              className="fa-solid fa-pen-to-square"
              style={{ marginLeft: "1em" }}
            ></i>
          </span>
        </div>
        <hr />
        <div
          className="row"
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            color: "whitesmoke",
          }}
        >
          <span
            onClick={() => {
              deleteArticle(article);
            }}
          >
            Delete
            <i
              className="fa-regular fa-trash-can"
              style={{ marginLeft: "1em" }}
            ></i>
          </span>
        </div>
      </td>
    </tr>
  );
};

export default ArticleItem;
