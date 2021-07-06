'use strict'


let totalQty = 0 ;
let totalPrice = 0;
const Order =function(item, quantity, price) {
  this.item = item;
  this.quantity = quantity;
  this.price = price;

  Order.allOrders.push(this);
}
Order.allOrders = [];

let form = document.getElementById('form')

form.addEventListener('submit', submitHandel)

function submitHandel(e) {
  e.preventDefault();

  let item = e.target.order.value;
  let quantity = e.target.qty.value;
  let price = getRandomPrice()

  new Order(item, quantity, price)

  

 setData();
 createTable();
}

function setData() {

  localStorage.setItem('Food', JSON.stringify(Order.allOrders))
}

function getData() {
  
  let data = JSON.parse(localStorage.getItem('Food')) || []
  if (data) {
    Order.allOrders = [];
    for (let i = 0; i < data.length; i++) {
      new Order(data[i].item, data[i].quantity, data[i].price)

    }

  }
  createTable();
}

function createTable(){
  table.innerHTML = ''
  tableHead();
   render();
   tableFooter();
}

 

let table = document.getElementById('table')


function tableHead() {

  let trHead = document.createElement('thead')
 

  let thHItem = document.createElement('th')
  trHead.appendChild(thHItem)
  thHItem.textContent = "Items"

  let thHqty = document.createElement('th')
  trHead.appendChild(thHqty)
  thHqty.textContent = "Quantity"

  let thHPrice = document.createElement('th')
  trHead.appendChild(thHPrice)
  thHPrice.textContent = "Price";

  let thHX = document.createElement('th')
  trHead.appendChild(thHX)
  thHX.textContent = " "
  table.appendChild(trHead)
}

function tableFooter() {

  

  let trF = document.createElement('tr')
  table.appendChild(trF)

  let thFItem = document.createElement('th')
  trF.appendChild(thFItem)
  thFItem.textContent ="Total"
  
  let thFooterQty = document.createElement('th')
  trF.appendChild(thFooterQty)
  thFooterQty.textContent =totalQty;

  let thFPrice = document.createElement('th')
  trF.appendChild(thFPrice)
  thFPrice.textContent =totalPrice;

  let thFX = document.createElement('th')
  trF.appendChild(thFX)
  thFX.textContent =" "
}


function render() {
  totalPrice = 0
  totalQty = 0
  let data = JSON.parse(localStorage.getItem('Food')) || []
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement('tr')
    table.appendChild(tr);

    let itemTD = document.createElement('td')
    tr.appendChild(itemTD)
    itemTD.textContent = data[i].item;

    let qtyTD = document.createElement('td')
    tr.appendChild(qtyTD)
    qtyTD.textContent = data[i].quantity
    totalQty = totalQty + Number( data[i].quantity)
    let priceTD = document.createElement('td')
    tr.appendChild(priceTD)
    priceTD.textContent = data[i].price;
   totalPrice += data[i].price
    let tdR = document.createElement('td')
    tr.appendChild(tdR)
    tdR.innerHTML = `<a onclick="rowDelete(${i})">X</a>`
  }
  
}


function rowDelete(index) {
  Order.allOrders.splice(index, 1)
  setData();
  getData();
}

let btn = document.getElementById('clear')

btn.addEventListener('click', clearLS)

function clearLS() {
  localStorage.removeItem('Food');
  Order.allOrders = [];
  table.innerHTML = " "
  
}

function getRandomPrice() {
  return Math.floor(Math.random() * (25 - 1 + 1)) + 1;
}
getData();


