import React from "react";
import { types, factor, getIndex } from "../data/char";
import { sum } from "../utils";
const Result: React.FC<{}> = (props) => {
  const [calced, setCalced] = React.useState([0, 0, 0, 0, 0, 0, 0, 0]);

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

  return (
    <div style={{ padding: 10 }}>
      {types.map((type, index) => {
        const s = getScore(index);
        return (
          <div key={index} style={{ fontSize: 15, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 100, fontWeight: "bold" }}>{type}</div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div>{sum(s)}</div>
                <div>
                  {s.map((item, index) => (
                    <span
                      key={index}
                      style={{ padding: 10, display: "inline-block" }}
                    >
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
