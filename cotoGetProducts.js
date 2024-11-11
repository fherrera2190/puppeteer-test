import fs from "fs";
const nnt = encodeURIComponent("arroz crucero");
const url = `https://api.cotodigital.com.ar/sitios/cdigi/categoria?Ntt=${nnt}&format=json`;

const response = await fetch(url);

let data = await response.json();

data = data.contents[0].Main[1].contents[0].records;

data = data.map((item) => {
  return {
    ...item.records[0].attributes,
  };
});

let products = [];


const object = data[0];
for (const key in object) {
  if (Object.prototype.hasOwnProperty.call(object, key)) {
    products[key.split(".")[1] + ""] = object[key][0];
    console.log(key.split(".")[1]);
  }
}

fs.writeFileSync("coto.json", JSON.stringify(products, null, 2));
