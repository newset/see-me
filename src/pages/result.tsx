import React from "react";
import { types, factor, getIndex } from "../data/char";
import { sum } from "../utils";
import "./result.less";
const Result: React.FC<{}> = () => {
  function getScore(index: number): number[] {
    const data = localStorage.getItem("score:vote");
    console.log("data");
    if (!data) {
      return [];
    }
    const values = JSON.parse(data);
    const indexes = Array(7)
      .fill(1)
      .map((_, i) => factor[i * 8 + index]);
    const items = indexes.map((cur, index) => values[index][getIndex(cur)]);
    return items;
  }

  function getTotal(name: string): number[] {
    const index = types.indexOf(name);
    return getScore(index);
  }

  const scores = types.map((type) => {
    const data = getTotal(type);
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
