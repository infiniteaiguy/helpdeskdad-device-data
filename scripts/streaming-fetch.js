/**
 * streaming-fetch.js – refreshes /data/streaming.json
 * Example: categoryId  842 ("Digital media players") – adjust if needed
 */
import fs from 'fs/promises';
import fetch from 'node-fetch';
import dayjs from 'dayjs';

const CATEGORY_ID = 842;
const FIELDS = 'brand,name,product_code,short_description,ean_upcs';
const DEST = 'data/streaming.json';
const ICECAT_AUTH = process.env.ICECAT_AUTH;

(async () => {
  const res = await fetch(
    `https://api.icecat.biz/products?icecat_id=${CATEGORY_ID}&fields=${FIELDS}&limit=5000`,
    { headers: { Authorization: `Basic ${ICECAT_AUTH}` } }
  );
  const json = await res.json();
  await fs.writeFile(
    DEST,
    JSON.stringify({ updated: dayjs().toISOString(), items: json.data }, null, 2)
  );
  console.log(`Streaming-device rows: ${json.data.length}`);
})();