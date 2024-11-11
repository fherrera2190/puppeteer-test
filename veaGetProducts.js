import fs from "fs";

const appsEtag = `appsEtag%2Cblocks%2CblocksTree%2Ccomponents%2CcontentMap%2Cextensions%2Cmessages%2Cpage%2Cpages%2Cquery%2CqueryData%2Croute%2CruntimeMeta%2Csettings`;
const map = `ft`;
const q = `pollo`;
const search = encodeURIComponent(q);

console.log(search);

let url = `https://www.vea.com.ar/${search}?_q=${search}&_map=${map}&__pickRuntime=${appsEtag}`;
console.log(url);

const response = await fetch(url);
const packageJSON = await response.json();

let queryData = packageJSON.queryData;

queryData = queryData.map((element) => {
  return JSON.parse(element.data);
});

let productSearch = queryData[0].productSearch;

let products = productSearch.products.map((product) => {
  return {
    ...product.items,
  };
});

products = productSearch.products.map((product) => {
  return { ...product };
});

products = productSearch.products.map((product) => {
  return product.items[0];
});

products = productSearch.products.map((product) => {
  let { itemId, name, nameComplete, ean, images, sellers } = product.items[0];

  images = images[0];

  return { itemId, name, nameComplete, ean, images, sellers };
});

fs.writeFileSync("vea.json", JSON.stringify(products, null, 2));
