import React from "react";
import { types, factor, getIndex } from "../data/char";
import { sum } from "../utils";
import "./result.less";

const data = localStorage.getItem("score:vote");

const Result: React.FC<{}> = () => {
  function getScore(name: string): number[] {
    if (!data) {
      return [];
    }
    const values = JSON.parse(data);
    const index = types.indexOf(name);

    const items = factor.map((row, vote) => {
      const key = row[index];
      const opt = getIndex(key);
      console.log("key: ", opt, key);
      return values[vote][opt];
    });
    console.log("test: ", items, index);
    return items;
  }

  const scores = types.map((type) => {
    const data = getScore(type);
    return {
      data,
      type,
      total: sum(data),
    };
  });

  return (
    <div style={{ padding: 10 }}>
      {scores
        .sort((a, b) => b.total - a.total)
        .map((row, index) => {
          return (
            <div key={index} style={{ fontSize: 15, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 100, fontWeight: "bold" }}>{row.type}</div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div>{row.total}</div>
                  <div style={{}} className="sub-scores">
                    {row.data.map((item, index) => (
                      <span key={index} style={{}}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Result;
