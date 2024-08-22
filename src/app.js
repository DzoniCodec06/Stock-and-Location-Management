const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database/database.sqlite");

const table = document.getElementById("tabla");

const addBtn = document.getElementById("add");

const closeBtn = document.getElementById("close");

const addProductField = document.getElementById("addProduct");
const containerField = document.querySelector(".container");

let deleteBtn;

let listOfAllProducts;

// ADD items

const nameInput = document.getElementById("name_input");
const barcodeInput = document.getElementById("barcode_input");
const descInput = document.getElementById("desc_input");
const skuInput = document.getElementById("sku_input");
const locationInput = document.getElementById("location_input");
const qtyInput = document.getElementById("qty_input");

const saveBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
    addProductField.classList.replace("add-product-false", "add-product");
    containerField.classList.replace("container", "container-false");
});

closeBtn.addEventListener("click", () => {
    addProductField.classList.replace("add-product", "add-product-false");
    containerField.classList.replace("container-false", "container");
});

function deleteFunc(e) {
    let selectedRow = e.target.id.split("-")[1];

    db.run(`DELETE FROM Product WHERE productId=${selectedRow};`);

    db.all("SELECT productId FROM Product ORDER BY productId;", (err, products) => {
        if (err) console.error(err);
        else {
            let newId = 1;
            products.forEach(product => {
                db.run(`UPDATE Product SET productId = ? WHERE productId = ?;`, [newId, product.productId], (err) => {
                    if (err) console.error(err);
                    else {
                        console.log(`Updated ID from ${product.productId} to ${newId}`);
                    }
                });
                newId++;
            });

            db.run(`UPDATE SQLITE_SEQUENCE SET SEQ=${products.length} WHERE NAME='Product';`, (err) => {
                if (err) console.error(err);
            });
        }
    });


    setTimeout(() => {
        let n = 0;
        n++;
    }, 2000);

    window.location.reload();
}

function setProducts() {
    db.each("SELECT * FROM Product;", (err, product) => {
        if(err) console.error(err);
        else {
            console.log(product);
            /*
            const createArticle = () => {
                
            }
            createArticle();*/
            let tr = document.createElement("tr");
            tr.classList.add("article");
    
            let tdNum = document.createElement("td");
            tdNum.innerHTML = `${product.productId}`;
            tdNum.classList.add("num");
    
            let tdSKU = document.createElement("td");
            tdSKU.innerHTML = `${product.sku}`;
            tdSKU.classList.add("sku");
    
            let tdName = document.createElement("td");
            tdName.innerHTML = `${product.name}`;
            tdName.classList.add("name");
    
            let tdBarcode = document.createElement("td");
            tdBarcode.innerHTML = `${product.barcode}`;
            tdBarcode.classList.add("barcode");
    
            let tdQty = document.createElement("td");
            tdQty.innerHTML = `${product.qty}`;
            tdQty.classList.add("qty");
    
            let tdLoc = document.createElement("td");
            tdLoc.innerHTML = `${product.location}`;
            tdLoc.classList.add("loc");
    
            let tdDesc = document.createElement("td");
            tdDesc.innerHTML = `${product.description}`;
            tdDesc.classList.add("desc");
    
            let tdEditBtn = document.createElement("td");
            tdEditBtn.classList.add("btns");
            tdEditBtn.id = "edit";
            tdEditBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    
            
            let tdDelBtn = document.createElement("td");
            tdDelBtn.classList.add("btns");
            tdDelBtn.id = `delete-${product.productId}`;
            tdDelBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            tdDelBtn.addEventListener("click", deleteFunc);

            deleteBtn = tdDelBtn;
            
            let listOfTds = [tdNum, tdSKU, tdName, tdBarcode, tdQty, tdLoc, tdDesc, tdEditBtn, tdDelBtn];

            listOfAllProducts = listOfTds;
    
            listOfTds.forEach(td => {
                tr.append(td);
            });
            
            table.append(tr);
        }
    });    
}

function refreshProducts() {
    db.get("SELECT * FROM Product WHERE productID = (SELECT MAX(productID) FROM Product);", (err, product) => {
        if (err) console.error(err);
        else {
            let tr = document.createElement("tr");
            tr.classList.add("article");
    
            let tdNum = document.createElement("td");
            tdNum.innerHTML = `${product.productId}`;
            tdNum.classList.add("num");
    
            let tdSKU = document.createElement("td");
            tdSKU.innerHTML = `${product.sku}`;
            tdSKU.classList.add("sku");
    
            let tdName = document.createElement("td");
            tdName.innerHTML = `${product.name}`;
            tdName.classList.add("name");
    
            let tdBarcode = document.createElement("td");
            tdBarcode.innerHTML = `${product.barcode}`;
            tdBarcode.classList.add("barcode");
    
            let tdQty = document.createElement("td");
            tdQty.innerHTML = `${product.qty}`;
            tdQty.classList.add("qty");
    
            let tdLoc = document.createElement("td");
            tdLoc.innerHTML = `${product.location}`;
            tdLoc.classList.add("loc");
    
            let tdDesc = document.createElement("td");
            tdDesc.innerHTML = `${product.description}`;
            tdDesc.classList.add("desc");
    
            let tdEditBtn = document.createElement("td");
            tdEditBtn.classList.add("btns");
            tdEditBtn.id = "edit";
            tdEditBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    
            
            let tdDelBtn = document.createElement("td");
            tdDelBtn.classList.add("btns");
            tdDelBtn.id = `delete-${product.productId}`;
            tdDelBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

            tdDelBtn.addEventListener("click", deleteFunc);
            
            let listOfTds = [tdNum, tdSKU, tdName, tdBarcode, tdQty, tdLoc, tdDesc, tdEditBtn, tdDelBtn];

            listOfAllProducts = listOfTds;
    
            listOfTds.forEach(td => {
                tr.append(td);
            });
            
            table.append(tr);
        }
    });

    console.log("Refreshed");
}

window.onload = () => {
    //db.run("DROP TABLE Product");
    /*
    db.run("CREATE TABLE Product (productId INTEGER PRIMARY KEY AUTOINCREMENT, sku varchar(255), name varchar(255), barcode INTEGER, qty INTEGER, location varchar(255), description varchar(255));", err => {
        if (err) console.error(err);
        else console.log("table created");
    })*/

    setProducts();
}


saveBtn.addEventListener("click", () => {
    let barCode = barcodeInput.value;
    let name = nameInput.value;
    let description = descInput.value;
    let sku = skuInput.value;
    let qty = qtyInput.value;
    let location = locationInput.value;

    console.log(`Barcode: ${barCode} | Name: ${name} | Description: ${description} | SKU: ${sku} | Qty: ${qty} | Location: ${location} `);

    db.run(`INSERT INTO Product (sku, name, barcode, qty, location, description) VALUES (${sku}, '${name}', ${barCode}, ${qty}, '${location}', '${description}');`);

    barcodeInput.value = "";
    nameInput.value = "";
    descInput.value = "";
    skuInput.value = "";
    qtyInput.value = "";
    locationInput.value = "";

    addProductField.classList.replace("add-product", "add-product-false");
    containerField.classList.replace("container-false", "container");

    refreshProducts();
})

