/**
 * tvs-fetch.js – refreshes /data/tvs.json
 * Icecat categoryId for "TVs" ≈ 669
 */
import fs from 'fs/promises';
import fetch from 'node-fetch';
import dayjs from 'dayjs';

const CATEGORY_ID = 669;
const FIELDS = 'brand,name,product_code,screen_size,short_description,ean_upcs';
const DEST = 'data/tvs.json';
const ICECAT_AUTH = process.env.ICECAT_AUTH;

(async () => {
  const res = await fetch(
    `https://api.icecat.biz/products?icecat_id=${CATEGORY_ID}&fields=${FIELDS}&limit=10000`,
    { headers: { Authorization: `Basic ${ICECAT_AUTH}` } }
  );
  const json = await res.json();
  await fs.writeFile(
    DEST,
    JSON.stringify({ updated: dayjs().toISOString(), items: json.data }, null, 2)
  );
  console.log(`TV items fetched: ${json.data.length}`);
})();