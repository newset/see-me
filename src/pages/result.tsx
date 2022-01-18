import React from "react";
import { Button, Space } from "antd-mobile";
import { types, factor, getIndex } from "../data/char";
import { sum, cacheKey } from "../utils";
import { useNavigate } from "react-router-dom";
import "./result.less";

const Result: React.FC<{}> = () => {
  const navigate = useNavigate();
  function getScore(name: string): number[] {
    const data = localStorage.getItem(cacheKey);

    if (!data) {
      return [];
    }
    const values = JSON.parse(data);
    const index = types.indexOf(name);

    const items = factor.map((row, vote) => {
      const key = row[index];
      const opt = getIndex(key);
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
    <div className="page">
      {scores
        .sort((a, b) => b.total - a.total)
        .map((row, index) => {
          return (
            <div key={index} className="result-item">
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
        <Space></Space>
    <Button block color="primary" onClick={()=>{
      navigate("/")
    }}>修改</Button>
    <Space></Space>
    
    </div>
  );
};

export default Result;
