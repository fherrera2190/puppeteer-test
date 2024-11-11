import fs from "fs";
const busqueda = encodeURIComponent("apostoles");
const url = `https://www.comodinencasa.com.ar/api/catalog_system/pub/products/search/busca?O=OrderByTopSaleDESC&ft=${busqueda}`;
// console.log(url);
const response = await fetch(url);

// console.log(decodeURIComponent("%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%220ef2c56d9518b51f912c2305ac4b07851c265b645dcbece6843c568bb91d39ff%22%2C%22sender%22%3A%22vtex.store-resources%400.x%22%2C%22provider%22%3A%22vtex.search-graphql%400.x%22%7D%2C%22variables%22%3A%22eyJwcm9kdWN0T3JpZ2luVnRleCI6dHJ1ZSwic2ltdWxhdGlvbkJlaGF2aW9yIjoiZGVmYXVsdCIsImhpZGVVbmF2YWlsYWJsZUl0ZW1zIjp0cnVlLCJhZHZlcnRpc2VtZW50T3B0aW9ucyI6eyJzaG93U3BvbnNvcmVkIjp0cnVlLCJzcG9uc29yZWRDb3VudCI6MiwicmVwZWF0U3BvbnNvcmVkUHJvZHVjdHMiOmZhbHNlLCJhZHZlcnRpc2VtZW50UGxhY2VtZW50IjoiYXV0b2NvbXBsZXRlIn0sImZ1bGxUZXh0IjoiVGUgTGEgVmlyZ2luaWEgMjUgc2EiLCJjb3VudCI6Mywic2hpcHBpbmdPcHRpb25zIjpbXSwidmFyaWFudCI6bnVsbH0%3D%22%7D"))

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
