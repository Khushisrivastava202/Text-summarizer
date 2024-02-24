import { useState, useEffect } from "react";
import { CiLink } from "react-icons/ci";

import { useLazyGetSummaryQuery } from "../services/article";
import { copy, linkIcon, loader, tick } from "../assets";


const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem(`articles`)
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem(`articles`, JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="w-full max-w-xl">
      <div className="text-center mb-8 ">
      <a href="#" className=" text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text text-xl hover:underline">Simplify your reading by just entering the URL</a>
      </div>
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <CiLink className="absolute left-0 my-2 ml-3 w-7 text-white"/>
          
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="block w-full rounded-md border text-white border-teal-400 bg-black py-2.5 pl-10 pr-12 text-sm  focus:border-teal-400 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-500 peer-focus:text-gray-500"
          >
            ↵
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mt-1">
          {allArticles.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <div className="w-7 h-7 rounded-full bg-white backdrop-blur flex justify-center items-center cursor-pointer" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <p className="flex-1  text-blue-700 font-medium text-sm truncate">
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-12 max-w-full flex justify-center items-center ">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-semibold text-white text-center">
            Well, that wasn't supposed to happen you may have made some mistake ...
            <br />
            <span className="font-normal text-gray-500">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 ">
              <h2 className="font-semibold text-white text-2xl text-center m-5">
              <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent ">Article Summary</span>
              </h2>
              <div className="rounded-2xl border border-teal-400 p-4">
                <p className="font-medium text-md text-white">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
