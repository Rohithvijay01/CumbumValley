import fs from 'fs';
import path from 'path';
import https from 'https';

const products = [
  { name: 'Green Cardamom', wiki: 'Cardamom' },
  { name: 'Premium Cardamom', wiki: 'Cardamom' },
  { name: 'Bodinayakanur Cardamom Trading Batch', wiki: 'Cardamom' },
  { name: 'Black Pepper', wiki: 'Black_pepper' },
  { name: 'White Pepper', wiki: 'Black_pepper' },
  { name: 'Green Pepper', wiki: 'Black_pepper' },
  { name: 'Clove', wiki: 'Clove' },
  { name: 'Cinnamon', wiki: 'Cinnamon' },
  { name: 'Nutmeg', wiki: 'Nutmeg' },
  { name: 'Mace', wiki: 'Mace_(spice)' },
  { name: 'Turmeric', wiki: 'Turmeric' },
  { name: 'Ginger', wiki: 'Ginger' },
  { name: 'Tea Leaves', wiki: 'Tea' },
  { name: 'Coffee Beans', wiki: 'Coffee_bean' },
  { name: 'Arabica Coffee Beans', wiki: 'Coffea_arabica' },
  { name: 'Robusta Coffee Beans', wiki: 'Coffea_canephora' },
  { name: 'Cumbum Grapes', wiki: 'Grape' },
  { name: 'Banana', wiki: 'Banana' },
  { name: 'Mango', wiki: 'Mango' },
  { name: 'Guava', wiki: 'Guava' },
  { name: 'Papaya', wiki: 'Papaya' },
  { name: 'Pomegranate', wiki: 'Pomegranate' },
  { name: 'Jackfruit', wiki: 'Jackfruit' },
  { name: 'Orange', wiki: 'Orange_(fruit)' },
  { name: 'Tomato', wiki: 'Tomato' },
  { name: 'Onion', wiki: 'Onion' },
  { name: 'Garlic', wiki: 'Garlic' },
  { name: 'Chilli', wiki: 'Chili_pepper' },
  { name: 'Brinjal', wiki: 'Eggplant' },
  { name: 'Beans', wiki: 'Green_bean' },
  { name: 'Cabbage', wiki: 'Cabbage' },
  { name: 'Carrot', wiki: 'Carrot' },
  { name: 'Beetroot', wiki: 'Beetroot' },
  { name: 'Potato', wiki: 'Potato' },
  { name: 'Drumstick', wiki: 'Moringa_oleifera' },
  { name: 'Curry Leaves', wiki: 'Curry_tree' },
  { name: 'Tomato Seeds', wiki: 'Tomato' },
  { name: 'Chilli Seeds', wiki: 'Chili_pepper' },
  { name: 'Pepper Seeds', wiki: 'Black_pepper' },
  { name: 'Cardamom Seeds', wiki: 'Cardamom' },
  { name: 'Vegetable Seed Kits', wiki: 'Seed' },
  { name: 'Fruit Saplings', wiki: 'Orchard' },
  { name: 'Cardamom Plants', wiki: 'Cardamom' },
  { name: 'Pepper Vines', wiki: 'Black_pepper' },
  { name: 'Coconut Saplings', wiki: 'Coconut' },
  { name: 'Mango Saplings', wiki: 'Mango' },
  { name: 'Banana Plants', wiki: 'Banana' },
  { name: 'Coffee Saplings', wiki: 'Coffee_bean' },
  { name: 'Urea', wiki: 'Urea' },
  { name: 'DAP', wiki: 'Diammonium_phosphate' },
  { name: 'NPK', wiki: 'Fertilizer' },
  { name: 'Potash', wiki: 'Potash' },
  { name: 'Organic Fertilizer', wiki: 'Organic_fertilizer' },
  { name: 'Vermicompost', wiki: 'Vermicompost' },
  { name: 'Cow Manure', wiki: 'Manure' },
  { name: 'Neem Cake', wiki: 'Neem_cake' },
  { name: 'Bio Fertilizer', wiki: 'Biofertilizer' },
  { name: 'Micronutrient Mix', wiki: 'Micronutrient' },
  { name: 'Drip Irrigation Kit', wiki: 'Drip_irrigation' },
  { name: 'Mulching Sheet', wiki: 'Plastic_mulch' },
  { name: 'Organic Pepper', wiki: 'Black_pepper' },
  { name: 'Organic Cardamom', wiki: 'Cardamom' },
  { name: 'Organic Coffee', wiki: 'Coffee_bean' },
  { name: 'Organic Tea', wiki: 'Tea' },
  { name: 'Organic Honey', wiki: 'Honey' }
];

const destDir = path.resolve('../client/public/images/products');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';

const downloadFile = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const fetchWikipediaImage = async (wikiTitle, productName, retryCount = 0) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=500`;
  
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    
    if (res.status === 429) {
      if (retryCount < 3) {
        console.log(`⚠️ Rate limited on ${productName}, retrying in 5 seconds...`);
        await delay(5000);
        return fetchWikipediaImage(wikiTitle, productName, retryCount + 1);
      }
      throw new Error(`HTTP 429 Too Many Requests`);
    }
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    
    if (data.query && data.query.pages) {
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pages[pageId] && pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
        const imageUrl = pages[pageId].thumbnail.source;
        // console.log(`Found image for ${productName}: ${imageUrl}`);
        const filename = productName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.jpg';
        const filepath = path.join(destDir, filename);
        
        await downloadFile(imageUrl, filepath);
        console.log(`✅ Downloaded: ${filename}`);
        return true;
      }
    }
    console.log(`⚠️ No image found for ${productName} (Wiki: ${wikiTitle})`);
    return false;
  } catch (error) {
    console.error(`❌ Error fetching ${productName}:`, error.message);
    return false;
  }
};

const run = async () => {
  console.log('Starting image downloads...');
  for (const product of products) {
    await fetchWikipediaImage(product.wiki, product.name);
    // Be nice to Wikipedia API
    await delay(2500); 
  }
  
  // Also fetch for (Fresh Batch) variants for the specific popular ones
  const freshBatchItems = ['Tomato', 'Banana', 'Black Pepper', 'Green Cardamom', 'Tea Leaves', 'Onion'];
  for (const item of freshBatchItems) {
    const p = products.find(x => x.name === item);
    if (p) {
      await fetchWikipediaImage(p.wiki, item + ' (Fresh Batch)');
      await delay(2500);
    }
  }

  console.log('Done downloading images.');
};

run();
