import fs from "fs";

const __pickRuntime = `appsEtag%2Cblocks%2CblocksTree%2Ccomponents%2CcontentMap%2Cextensions%2Cmessages%2Cpage%2Cpages%2Cquery%2CqueryData%2Croute%2CruntimeMeta%2Csettings`;
const busqueda = encodeURIComponent("apostoles");
const url =
  "https://www.carrefour.com.ar/" +
  busqueda +
  "?__pickRuntime=" +
  __pickRuntime;

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
  let { name, ean, images, sellers } = product.items[0];

  images = images[0].imageUrl;

  const { sellerName, commertialOffer } = sellers[0];
  const { teasers, Price, ListPrice } = commertialOffer;
  const ofertas = [];

  teasers.forEach((teaser) => {
    if (!teaser.name.toLowerCase().includes("tarjeta")) {
      ofertas.push(teaser);
    }
  });

  const seller = {
    sellerName,
    ofertas,
  };

  return { name, ean, images, seller, Price, ListPrice };
});
console.log(products.length);

fs.writeFileSync("carrefour.json", JSON.stringify(products, null, 2));
