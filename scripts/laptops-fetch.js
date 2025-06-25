/**
 * laptops-fetch.js – refreshes /data/laptops.json
 * Icecat categoryId for "Notebooks" ≈ 796     (double-check in Icecat!)
 */
import fs from 'fs/promises';
import fetch from 'node-fetch';
import dayjs from 'dayjs';

const CATEGORY_ID = 796;
const FIELDS = 'brand,name,product_code,short_description,ean_upcs';
const DEST = 'data/laptops.json';

const ICECAT_AUTH = process.env.ICECAT_AUTH;          // b64 creds injected by CI

async function run() {
  const url = `https://api.icecat.biz/products?icecat_id=${CATEGORY_ID}&fields=${FIELDS}&limit=10000`;
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${ICECAT_AUTH}` }
  });
  if (!res.ok) throw new Error(`Icecat HTTP ${res.status}`);
  const json = await res.json();

  await fs.writeFile(
    DEST,
    JSON.stringify({ updated: dayjs().toISOString(), items: json.data }, null, 2)
  );
  console.log(`Wrote ${json.data.length} laptop entries to ${DEST}`);
}

run().catch(e => { console.error(e); process.exit(1); });