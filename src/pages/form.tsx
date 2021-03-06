import React from "react";
import votes from "../data/votes";
import { useNavigate } from "react-router-dom";
import { Slider, Form, Dialog, Button, Space } from "antd-mobile";

import { sum, cacheKey } from "../utils";
import { clearImageViewer } from "antd-mobile/es/components/image-viewer/methods";
const marks = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
};

const defaultScores = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const cachedScore = localStorage.getItem(cacheKey);

const FormPage = () => {
  let navigate = useNavigate();

  const [scores, setScore] = React.useState<Array<Array<number>>>(cachedScore ? JSON.parse(cachedScore): defaultScores);

  function onFinish() {
    localStorage.setItem(cacheKey, JSON.stringify(scores));
    // 检查是否有未满足条件的条目
    let target: HTMLDivElement;
    let invalid = scores.some((row, index) => {
      // @ts-ignore
      target = document.getElementById(`vote-${index}`);
      return  sum(row) >10;
    });
    if(invalid) {
      Dialog.confirm({
        content: '存在比重超出的内容，请先修正',
        onConfirm:async () => {
          //@ts-ignore
          document.body.scrollIntoView(target);
        }
      })
      return
    }

    navigate("/result");
  }

  return (
    <Form onFinish={onFinish} initialValues={scores}>
      <div>
        <div
          className="div_title_cut_question"
          style={{ fontSize: 14, color: "#666", padding: 20 }}
        >
          <p>
            说明：对下列问题的回答，可能在不同程度上描绘了你在题干所述情景下的行为。每题有八句话，请将总分10分分配给每题的八个句子。
          </p>
          <p>
            {" "}
            分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况也可能是十分全部分配给其中的某一句话。请根据您的实际情况选择分数。
          </p>
          <div>
            提示：
            <p>1、请注意每题所选总分不要超过或少于10分。</p>
            <p>2、本量表是专业量表，仅供咨询过程使用或参考。</p>
          </div>
        </div>
      </div>
      <div style={{ padding: 10 }}>
        <div className="votes">
          {votes.map((vote, index) => {
            const total = sum(scores[index])
            return (
              <div key={index} style={{display: "unset"}}>
                <h3
                  id={`vote-${index}`}
                  style={{ borderLeft: "4px solid #006eff", paddingLeft: 10 }}
                >
                  {vote.title}
                </h3>
                <p style={{ fontSize: 14, color: "#aaa", zIndex: 1+index,}} className="hint sticky padding">
                    提示：总比重值必须为：10， 已分配比重：
                    <span style={
                      total > 10 ? {color: 'red'}: {}
                    }>{total}{total > 10 ? " 请修正": null}</span>
                  </p>
                <div>
                  {vote.list.map((item, idx) => {
                    return (
                      <div key={idx}>
                        <p>{item}</p>
                        <div style={{padding: "0 20px"}}>
                          <Form.Item
                            noStyle={true}
                            name={`vote[${index}][${idx}]`}
                            label="滑块选择"
                          >
                            <Slider
                              step={1}
                              max={10}
                              min={0}
                              ticks
                              defaultValue={scores[index][idx]}
                              onChange={(value) => {
                                const update = [...scores];
                                update[index][idx] = +value;
                                const row = update[index];
                                const total = sum(row);
                                setScore(update);
                              }}
                              marks={marks}
                            ></Slider>
                          </Form.Item>
                        </div>
                      </div>
                    );
                  })}
                
                </div>
              </div>
            );
          })}
          <Space></Space>
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default FormPage;
