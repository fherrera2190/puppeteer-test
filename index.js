import fs from "fs";
const nnt = encodeURIComponent("mayonesa hellman 500");
const url = `https://api.cotodigital.com.ar/sitios/cdigi/categoria?Ntt=${nnt}&format=json`;

const response = await fetch(url);

const data = await response.json();

fs.writeFileSync("productos.json", JSON.stringify(data, null, 2));
