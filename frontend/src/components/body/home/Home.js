import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Fragment,
} from "react";
import { useNavigate } from "react-router-dom";
import articleContext from "../../../context/articles/ArticleContext";
import AddArticle from "./articles/AddArticle";
import ArticleItem from "./articles/ArticleItem";

const Articles = () => {
  const context = useContext(articleContext);
  let navigate = useNavigate();
  const { articles, getUserArticles, editArticle } = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [article, setArticle] = useState({
    id: "",
    earticle_ID: "",
    elink: "",
    estatus: Boolean,
    ecomment: "",
  });

  const updateArticle = (currentArticle) => {
    ref.current.click();
    setArticle({
      id: currentArticle._id,
      earticle_ID: currentArticle.article_ID,
      elink: currentArticle.link,
      estatus: currentArticle.status,
      ecomment: currentArticle.comment,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editArticle(
      article.id,
      article.earticle_ID,
      article.elink,
      article.estatus,
      article.ecomment
    );
    refClose.current.click();
    alert("Article Updated Successfully");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserArticles();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main id="site-main">
        <div className="container">
          <AddArticle />
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Article ID</th>
                <th style={{ width: "21.25em" }}>Try Here</th>
                <th>Current Status</th>
                <th className="WIDCOM">Comments</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td
                    className="fw-bold text-uppercase d-flex justify-content-center text-light"
                    style={{ letterSpacing: "1px", position: "relative" }}
                  >
                    {articles.length === 0 && "No articles to display"}
                  </td>
                </tr>
              ) : (
                ""
              )}
              {articles.map((article) => (
                <Fragment>
                  <ArticleItem
                    key={article._id}
                    updateArticle={updateArticle}
                    article={article}
                  />
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Article
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <form className="my-3 pt-0">
                <div className="mb-3">
                  <label htmlFor="earticle_ID" className="form-label">
                    Article ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="earticle_ID"
                    name="earticle_ID"
                    value={article.earticle_ID}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="elink" className="form-label">
                    Article Link
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="elink"
                    name="elink"
                    value={article.elink}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3 d-flex">
                  <label htmlFor="estatus" style={{ marginRight: "10px" }}>
                    Article Status
                  </label>
                  <input
                    type="radio"
                    id="estatus"
                    className="mx-1"
                    name="estatus"
                    value={true}
                    onChange={onChange}
                    required
                  />
                  <span className="mx-1">YES</span>
                  <input
                    type="radio"
                    id="estatus"
                    name="estatus"
                    className="mx-1"
                    value={false}
                    onChange={onChange}
                    required
                  />
                  <span className="mx-1">NO</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="ecomment">Comment</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ecomment"
                    name="ecomment"
                    value={article.ecomment}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  article.elink.length < 5 || article.ecomment.length < 4
                }
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Update Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
