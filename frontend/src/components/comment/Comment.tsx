import React from "react";
import "./Comment.css";

interface CommentProps {
  author: string;
  avatar: string;
  date: string;
  content: string;
}

const Comment = ({ author, avatar, date, content }: CommentProps) => {
  return (
    <div className="comment-container">
      <div className="comment-avatar">
        <img src={avatar} alt={author} />
      </div>
      <div className="comment-body">
        <div className="comment-header">
          <span className="comment-author">{author}</span>
          <span className="comment-date">{date}</span>
        </div>
        <div className="comment-content">{content}</div>
      </div>
    </div>
  );
};

export { Comment };
