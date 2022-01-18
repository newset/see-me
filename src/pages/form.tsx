import React from "react";
import votes from "../data/votes";
const form = () => {
  return (
    <div>
      <div className="votes">
        {votes.map((vote, index) => {
          return (
            <div key={index}>
              <h4>{vote.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default form;
