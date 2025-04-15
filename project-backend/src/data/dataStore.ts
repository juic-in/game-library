import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, '');

let data = {};

export function save() {
  const dataJson = JSON.stringify(data, null, 2);
  fs.writeFileSync(DATA_FILE, dataJson, 'utf8');
}

export function load() {
  if (!fs.existsSync(DATA_FILE)) {
    save();
    return;
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  const parsedData = JSON.parse(data.toString())
  setData(parsedData);
}

export const getData = () => data;

export const setData(newData) {
  data = newData;
}