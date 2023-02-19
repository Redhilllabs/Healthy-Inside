// import axios from 'axios';
// const product = [
//     {
//         id: 0,
//         image: 'image/gg-1.jpg',
//         title: 'Shirt',
//         price: 120,
//     },
//     {
//         id: 1,
//         image: 'image/hh-2.jpg',
//         title: 'Shirt',
//         price: 60,
//     },
//     {
//         id: 2,
//         image: 'image/ee-3.jpg',
//         title: 'Shirt',
//         price: 230,
//     },
//     {
//         id: 3,
//         image: 'image/aa-1.jpg',
//         title: 'Shirt',
//         price: 100,
//     }
// ];
// const categories = [...new Set(product.map((item)=>
//     {return item}))]
//     let i=0;
// document.getElementById('root').innerHTML = categories.map((item)=>
// {
//     var {image, title, price} = item;
//     return(
//         `<div class='box'>
//             <div class='img-box'>
//                 <img class='images' src=${image}></img>
//             </div>
//         <div class='bottom'>
//         <p>${title}</p>
//         <h2>$ ${price}.00</h2>`+
//         "<a onclick='addtocart("+(i++)+")'>Add to cart</a>"+
//         // "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
//         `</div>
//         </div>`
//     )
// }).join('')

// var cart =[];

// function addtocart(a){
//     cart.push({...categories[a]});
//     displaycart();
// }
// function delElement(a){
//     cart.splice(a, 1);
//     displaycart();
// }

// function displaycart(){
//     let j = 0, total=0;  /*, balance=200 */
//     // document.getElementById("count").innerHTML=cart.length;
//     if(cart.length==0){
//         document.getElementById('cartItem').innerHTML = "Your cart is empty";
//         document.getElementById("total").innerHTML = "$ "+0+".00";
//     }
//     else{
//         document.getElementById("cartItem").innerHTML = cart.map((items)=>
//         {
//             var {image, title, price} = items;
//             total=total+price;

//             // if(total>balance){
//             //     alert("Limit Exceed!!");
//             //     return
//             // }
//             document.getElementById("total").innerHTML = "$ "+total+".00";

//             return(
//                 `<div class='cart-item'>
//                 <div class='row-img'>
//                     <img class='rowimg' src=${image}>
//                 </div>
//                 <p style='font-size:12px;'>${title}</p>
//                 <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
//                 "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
//             );

//         }).join('');
//     }

// }

// function checkout(){
//     let total = document.getElementById("total").innerHTML;
//     total = total.substring(1);
//     let balance = 200;
//     if(total<=balance){
//         alert("Order Placed");
//     }
//     else{
//         alert("Limit exceed");
//     }
// }

// const { MongoClient } = require('mongodb');

// import { MongoClient } from 'mongodb';
// import { MongoClient } from 'mongodb';
// const { MongoClient } = require('mongodb');
// import axios from "axios";
const product = [
  {
    id: 0,
    image: "image/aa1.jpeg",
    title: "Brown Rice Idli",
    price: 120,
  },
  {
    id: 1,
    image: "image/aa2.jpeg",
    title: "Oil Free Chole",
    price: 60,
  },
  {
    id: 2,
    image: "image/aa3.jpeg",
    title: "Tofu Flatbread",
    price: 230,
  },
  {
    id: 3,
    image: "image/aa4.jpeg",
    title: "Coco Poha",
    price: 100,
  },
  {
    id: 4,
    image: "image/aa5.jpeg",
    title: "Amaranth Upma",
    price: 100,
  },
  {
    id: 5,
    image: "image/aa6.jpeg",
    title: "Kababi Soya",
    price: 100,
  },
  {
    id: 6,
    image: "image/aa7.jpeg",
    title: "Kheel Bhel Makhani",
    price: 100,
  },
  {
    id: 7,
    image: "image/aa8.jpeg",
    title: "Jeera Brown Rice",
    price: 100,
  },
  {
    id: 8,
    image: "image/aa9.jpeg",
    title: "Rasam-e-Chaat",
    price: 100,
  },
  {
    id: 9,
    image: "image/aa10.jpeg",
    title: "Ragi Rolls",
    price: 100,
  },
  {
    id: 10,
    image: "image/aa11.jpeg",
    title: "Varuge Upma",
    price: 100,
  },
  {
    id: 11,
    image: "image/aa12.jpeg",
    title: "Rasam Sambhar",
    price: 100,
  },
  {
    id: 12,
    image: "image/ff1.jpeg",
    title: "Cricket Bat",
    price: 100,
  },
  {
    id: 13,
    image: "image/ff2.jpeg",
    title: "Dumbbells",
    price: 100,
  },
  {
    id: 14,
    image: "image/ff3.jpeg",
    title: "Dart Board",
    price: 100,
  },
  {
    id: 15,
    image: "image/ff4.jpeg",
    title: "Jumping Rope",
    price: 100,
  },
  {
    id: 16,
    image: "image/ff5.jpeg",
    title: "Badminton",
    price: 100,
  },
  {
    id: 17,
    image: "image/ff1.jpeg",
    title: "Cricket Bat",
    price: 100,
  },
];
const categories = [
  ...new Set(
    product.map((item) => {
      return item;
    })
  ),
];
let i = 0;

document.getElementById("shop-section1").innerHTML = categories
  .slice(0, 6)
  .map((item) => {

    var { id, image, title, price, discription } = item;
    return `<div class="pro card">
        <img src=${image} alt="">
        <div class="box" >
            <div class="des">
              <h5>${title}</h5>
              <h4>$ ${price}</h4>
            </div>
            <a onclick='addtocart(${id})'>
            <i class="fa-solid fa-plus floating-button"></i>
              Add
            </a>
            </div>
      </div>`;
  })
  .join("");
// document.getElementById('shop-section2').innerHTML = categories.slice(2, 4).map((item)=>
document.getElementById("shop-section2").innerHTML = categories
  .slice(6, 12)
  .map((item) => {
    // console.log("Yes");
    var { id, image, title, price } = item;
    return `<div class="pro card">
            <img src=${image} alt="">
            <div class="box" >
            <div class="des">
              <h5>${title}</h5>
              <h4>$ ${price}</h4>
            </div>
            <a onclick='addtocart(${id})'>
            <i class="fa-solid fa-plus floating-button"></i>
              Add
            </a>
            </div>
          </div>`;
  })
  .join("");

document.getElementById("shop-section3").innerHTML = categories
  .slice(12, 18)
  .map((item) => {
    // console.log("Yes");
    var { id, image, title, price } = item;
    return `<div class="pro card" key=${item.id}>
            <img src=${image} alt="">
            <div class="box" >
            <div class="des">
              <h5>${title}</h5>
              <h4>$ ${price}</h4>
            </div>
            <a onclick='addtocart(${id})'>
            <i class="fa-solid fa-plus floating-button"></i>
              Add
            </a>
            </div>
            
          </div>`;
  })
  .join("");


var cart = [];

async function addtocart(a) {
console.log(cart)
  const existingProductIndex = cart.findIndex((item) => item.id === a);
  if (existingProductIndex === -1) {
    // If the product is not in the cart, add it
    cart.push({ ...categories[a], quantity: 1 });
  } else {
    // If the product is already in the cart, increase its quantity
    cart[existingProductIndex].quantity++;
  }

  if (cart.length != 0) {
    document.getElementById("floatingButton").classList.add("button-position");
  }
  var alertBox = document.getElementById("alert-box");
  alertBox.innerHTML = "<p>Item Added</p>";
  alertBox.style.display = "block";
  setTimeout(function () {
    alertBox.style.display = "none";
  }, 1000);

  // displaycart();
}
function delElement(a) {
  var cart2 = [];
  cart2 = JSON.parse(localStorage.getItem("cart-data"));
  cart2.splice(a, 1);
  localStorage.setItem("cart-data", JSON.stringify(cart2));
  displaycart();
}

function displaycart() {
  console.log("display cart");
  var cart2 = [];
  cart2 = JSON.parse(localStorage.getItem("cart-data"));

  let j = 0,
    total = 0; /*, balance=200 */
  // document.getElementById("count").innerHTML=cart.length;
  if (cart2.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
    document.getElementById("cartItem").innerHTML = cart2
      .map((items) => {
        var { image, title, price } = items;
        total = total + price;

        // if(total>balance){
        //     alert("Limit Exceed!!");
        //     return
        // }
        document.getElementById("total").innerHTML = "$ " + total + ".00";

        return (
          `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:17px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
          "<i class='fa-solid fa-trash' onclick='delElement(" +
          j++ +
          ")'></i></div>"
        );
      })
      .join("");
  }
}

function checkout() {
  var alertBox = document.getElementById("alert-box");
  if (document.getElementById("address-display").innerHTML === "") {
    alertBox.innerHTML = "<p>Add Your Address</p>";
    alertBox.style.display = "block";
    setTimeout(function () {
      alertBox.style.display = "none";
    }, 1000);
  } else {
    let total = document.getElementById("total").innerHTML;
    total = total.substring(1);
    let balance = 200;
    if (total <= balance) {
      alertBox.innerHTML = "<p>🎉 Order Placed</p>";
      alertBox.style.display = "block";
      setTimeout(function () {
        alertBox.style.display = "none";
      }, 1000);
      balance = balance - total;
    } else {
      alertBox.innerHTML = "<p>😣 Limit Exceeded</p>";
      alertBox.style.display = "block";
      setTimeout(function () {
        alertBox.style.display = "none";
      }, 1000);
    }
  }
}

function savedata() {
  if (localStorage.getItem("cart-data") == null) {
    localStorage.setItem("data", "[]");
  }
  localStorage.setItem("cart-data", JSON.stringify(cart));
}

function savedata1() {
  if (localStorage.getItem("cart-data1") == null) {
    localStorage.setItem("data1", "[]");
  }
  var cart2 = [];
  cart2 = JSON.parse(localStorage.getItem("cart-data"));
  localStorage.setItem("cart-data1", JSON.stringify(cart2));
}

function reload() {
  if (localStorage.getItem("cart-data1") == null) {
  } else {
    cart = JSON.parse(localStorage.getItem("cart-data"));
    console.log(cart);
    if (cart.length != 0) {
      document
        .getElementById("floatingButton")
        .classList.add("button-position");
    }
  }
}

var addAddressBtn = document.querySelector(".add-address-btn");
var addressForm = document.querySelector(".address-form");

// Attach a click event listener to the button
// addAddressBtn.addEventListener("click", function () {
//   // Toggle the visibility of the form
//   addressForm.classList.add(".address-form-display");
// });
