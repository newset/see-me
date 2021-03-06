export const types = [
  "CW实干家",
  "CO协调员",
  "SH推进者",
  "PL智多星",
  "RI外交家",
  "ME监督员",
  "TW凝聚者",
  "FI完美主义者",
];

export const index = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const getIndex = (str: string) => index.indexOf(str);

export const factor = [
  ["G", "D", "F", "C", "A", "H", "B", "E"],
  ["A", "B", "E", "G", "C", "D", "F", "H"],
  ["H", "A", "C", "D", "F", "G", "E", "B"],
  ["D", "H", "B", "E", "G", "C", "A", "F"],
  ["B", "F", "D", "H", "E", "A", "C", "G"],
  ["F", "C", "G", "A", "H", "E", "B", "D"],
  ["E", "G", "A", "F", "D", "B", "H", "C"],
];
