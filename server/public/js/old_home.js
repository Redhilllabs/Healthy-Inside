var bar = document.getElementById("bar");
var close = document.getElementById("close");
var navbar = document.getElementById("navbar");

bar.addEventListener("click", function() {
    navbar.classList.add("active");
});

close.addEventListener("click", function() {
    navbar.classList.remove("active");
});

// document.addEventListener('click', (e) => {
//     let element = e.target;
//     console.log(element);
    
//     if(element === "<i class='fa-solid fa-plus cart'></i>"){
//         console.log("Yes");
//     }else{
//         console.log("No");
//     }
// });
// shopping section

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
// document.getElementById('shop-section').innerHTML = categories.map((item)=>
// {
//     var {id, image, title, price} = item;
//     return(
//     //     `<div class='box'>
//     //     <div class='img-box'>
//     //         <img class='images' src=${image}></img>
//     //     </div>
//     // <div class='bottom'>
//     // <p>${title}</p>
//     // <h2>$ ${price}.00</h2>`+
//     // "<a onclick='addtocart("+(i++)+")'>Add to cart</a>"+
//     // // "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
//     // `</div>
//     // </div>`
//     `<div class="pro">
//                 <img src=${image} alt="">
//                 <div class="des">
                     
//                     <h5>${title}</h5>
                     
//                     <h4>$ ${price}</h4>
//                 </div>`+
//                 "<a onclick='addtocart("+(i++)+")'><i class='fa-solid fa-plus cart'></i></a>"+
//             `</div>`
//     )
// }).join('')

// var cart =[];


// function addtocart(a){
//     console.log(cart);
//     cart.push({...categories[a]});
//     // displaycart();
// }
// function delElement(a){
//     cart.splice(a, 1);
//     displaycart();
// }

// function displaycart(){
//     console.log(cart);
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

{/* `<div class="pro">
                <img src=${image} alt="">
                <div class="des">
                     
                    <h5>${title}</h5>
                     
                    <h4>$ ${price}</h4>
                </div>
                <a onclick='addtocart("+(i++)+")'><i class="fa-solid fa-plus cart"></i></a>
            </div>` */}