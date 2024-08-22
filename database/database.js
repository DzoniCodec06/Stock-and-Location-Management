const { ipcRenderer } = require("electron");

const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database.sqlite");

ipcRenderer.on("hello", () => {
    console.log("hello");
})

//db.run("CREATE TABLE Article (num INT, sku INT, name TEXT, barcode INT, qty INT, location TEXT, description TEXT)");
//console.log("Table created");

//db.run(`INSERT INTO Article VALUES (${n}, ${sku}, ${name}, ${barCode}, ${qty}, ${location}, ${description})`);


/*
db.all("SELECT * FROM Article", (err, article) => {
    console.log(article);
})*/

//db.serialize(() => {
    /*db.run("INSERT INTO Article VALUES (0, 2, 'pasta', 5, 1, 'k1', 'lemljenje');", (err, data) => {
        if (err) {
            console.error(err);
        } else console.log(data);
    });*/

    /*db.all("SELECT * FROM Article", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    });*/
//})