import React, { useContext, useState } from "react";
import articleContext from "../../../../context/articles/ArticleContext";

function AddArticle() {
  const context = useContext(articleContext);
  const { addArticle } = context;

  const [article, setArticle] = useState({
    article_ID: "",
    link: "",
    status: Boolean,
    comment: "",
  });

  const handleSubmit = (e) => {
    addArticle(
      article.article_ID,
      article.link,
      article.status,
      article.comment
    );
    setArticle({ article_ID: "", link: "", status: "", comment: "" });
    alert("Article Added Successfully");
    e.preventDefault();
  };

  const onChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3 className="text-light my-3">Add Article</h3>
        <div className="mb-3 d-flex">
          <label htmlFor="article_ID" className="form-label">
            <h5 className="mt-2 text-light">
              <span className="ARCHOP">Article</span> ID
            </h5>
          </label>
          <input
            type="number"
            className="form-control ADDARC"
            id="article_ID"
            name="article_ID"
            aria-describedby="emailHelp"
            value={article.article_ID}
            onChange={onChange}
            minLength={1}
            required
          />
        </div>
        <div className="mb-3 d-flex">
          <label htmlFor="link" className="form-label">
            <h5 className="mt-2 text-light">
              <span className="ARCHOP">Article</span> Link
            </h5>
          </label>
          <input
            type="url"
            className="form-control ADDSTAT ADDLINC"
            id="link"
            name="link"
            value={article.link}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3 d-flex">
          <h5 className="mt-2 text-light">
            <span className="ARCHOP">Article</span> Status
          </h5>
          <label htmlFor="status" className="form-label mt-2">
            <input
              type="radio"
              id="status"
              name="status"
              className="ADDSTAT"
              value={true}
              onChange={onChange}
              required
            />
            <span className="ADDSTATS" id="status">
              YES
            </span>
          </label>
          <label htmlFor="status" className="form-label mt-2">
            <input
              type="radio"
              id="status"
              name="status"
              value={false}
              onChange={onChange}
              className="ADDSTAT"
              required
            />
            <span className="ADDSTATS" id="status">
              NO
            </span>
          </label>
        </div>
        <div className="mb-3 d-flex">
          <label htmlFor="comment" className="form-label">
            <h5 className="mt-2 text-light">Comment</h5>
          </label>
          <input
            type="text"
            className="form-control ADDCOM"
            id="comment"
            name="comment"
            value={article.comment}
            onChange={onChange}
            minLength={4}
            required
          />
        </div>
        <button
          disabled={article.link.length < 5 || article.comment.length < 4}
          type="submit"
          className="ADDARCHBUTTON"
        >
          <span>Add Article</span> <i></i>
        </button>
      </form>
    </div>
  );
}

export default AddArticle;
