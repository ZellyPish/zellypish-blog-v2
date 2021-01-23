import React, { createRef, useEffect, useContext } from "react";
import { UserColorMode } from "./Layout";

const Comments = () => {
  const colorMode = useContext(UserColorMode);
  const commentRef = createRef();

  useEffect(() => {
    const utterances = document.createElement("script");

    const isComment = commentRef.current.firstChild;

    if (isComment) {
      commentRef.current.removeChild(isComment);
    }
    const utterancesConfig = {
      src: "https://utteranc.es/client.js",
      repo: "ZellyPish/zellypish-blog-comments",
      "issue-term": "pathname",
      theme: colorMode === "dark" ? "photon-dark" : "github-light",
      crossorigin: "anonymous",
      async: true,
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    commentRef.current.appendChild(utterances);
  }, [colorMode, commentRef]);

  return <div className="comments" ref={commentRef}></div>;
};

export default Comments;
