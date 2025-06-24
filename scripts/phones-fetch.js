// Simple updater: ensures iPhone 16 models are present in phones.json
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';

const NEW_MODELS = [
  'iPhone 16 Pro', 'iPhone 16 Pro Max',
  'iPhone 16', 'iPhone 16 Plus', 'iPhone 16e'
];

const file = path.resolve('data/phones.json');
const json = JSON.parse(fs.readFileSync(file, 'utf8') || '{}');

json['Apple'] = json['Apple'] || [];
NEW_MODELS.forEach(m => {
  if (!json['Apple'].includes(m)) json['Apple'].push(m);
});

fs.writeFileSync(file, JSON.stringify(json, null, 2));
console.log('phones.json updated', dayjs().format());