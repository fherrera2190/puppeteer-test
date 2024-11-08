import fs from "fs";
const busqueda = encodeURIComponent("coca cola 500");
const url = `https://www.comodinencasa.com.ar/api/catalog_system/pub/products/search/busca?O=OrderByTopSaleDESC&ft=${busqueda}`;
console.log(url);
const response = await fetch(url);

let products = await response.json();
products = products.map((product) => {
  return product.items[0];
});

products = products.map((product) => {
  let { itemId, name, nameComplete, ean, images, sellers } = product;

  images = images[0];
  sellers = sellers[0];

  return { itemId, name, nameComplete, ean, images, sellers };
});

fs.writeFileSync("comodin.json", JSON.stringify(products, null, 2));
