import fs from 'fs';
import path from 'path';
import { DataStore } from '../interface';

const DATA_FILE = path.join(__dirname, 'data.json');

let data: DataStore = {
  users: [],
  games: [],
  sessions: [],
};


export function save() {
  try {
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(DATA_FILE, dataJson, 'utf8');
  }  catch (e) {
    console.error('Error saving data:', e);
  }
}

export function load() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsedData = JSON.parse(data.toString())
      setData(parsedData);
    } else {
      save();
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
}

export const getData = () => data;

export const setData = (newData) => {
  if (!newData) {
    data = newData;
  }
}