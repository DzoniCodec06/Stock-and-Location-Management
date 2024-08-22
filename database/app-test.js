const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database/database.sqlite");

//db.run("CREATE TABLE Article (num INT, sku INT, name varchar(255), barcode INT, qty INT, location varchar(255), description varchar(255))");
//console.log("Table created");
/*
db.run("CREATE TABLE Product (productId INT AUTO_INCREMENT, sku INT, name varchar(255), barcode INT, qty INT, location varchar(255), description varchar(255), PRIMARY KEY (productId))", err => {
    if (err) console.error(err);
    else console.log("table created");
})*/

const barCodeField = document.getElementById("barCode");
const nameField = document.getElementById("name");
const descField = document.getElementById("desc");
const skuField = document.getElementById("sku");
const qtyField = document.getElementById("qty");

const locations = document.getElementById("locs");

const addBtn = document.getElementById("add");
const logdbBtn = document.getElementById("logdb");

let n = 1;

addBtn.addEventListener("click", () => {
    let barCode = barCodeField.value;
    let name = nameField.value;
    let description = descField.value;
    let sku = skuField.value;
    let qty = qtyField.value;
    let location = locations.value;

    //console.log(`Barcode: ${barCode} | Name: ${name} | Description: ${description} | SKU: ${sku} | Qty: ${qty} | Location: ${location} `);

    db.run(`INSERT INTO Article VALUES (${n}, ${sku}, '${name}', ${barCode}, ${qty}, '${location}', '${description}');`);

    barCodeField.value = "";
    nameField.value = "";
    descField.value = "";
    skuField.value = "";
    qtyField.value = "";

    n++;
});

logdbBtn.addEventListener("click", () => {
    db.all("SELECT * FROM Article", (err, articles) => {
        if (err) console.error(err);
        else console.log(articles);
    })
})