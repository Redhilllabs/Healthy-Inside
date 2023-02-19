var bar = document.getElementById("bar");
var close = document.getElementById("close");
var navbar = document.getElementById("navbar");
const scriptURL = 'https://script.google.com/macros/s/AKfycbymAQ6nUZY7obuzXKYwaZzCJ4xd04qbOFRd21g9tKcH2Adi6WuuW0qtGGHc8Qu5uDpt/exec'
const form = document.forms['kit-claim']
const kitclose = document.getElementById("login-close-kit");
const kitform = document.getElementById("popup-form-kit");
 


form.addEventListener('submit', e => {
  e.preventDefault()
  kitform.style.display = 'none';
  // var confirmationBox = document.getElementById("confirmation.box");
  document.getElementById("confirmation-box").innerHTML = `<div class="heading">
                      <h1>Please Confirm your details</h1>
                    </div>
                    <div class="content">
                      <p> Name : ${document.getElementById('nameofplayer').value}</p>
                      <p> Jersey Name : ${document.getElementById('nicknameofplayer').value} </p>
                      <p> Jersey Number : ${document.getElementById('jerseynumber').value}</p>
                      <p> Jersey Size : ${document.getElementById('jerseysize').value}</p>
                      <p> Address : ${document.getElementById('address2').value}</p>
                      <div class="buttons">` +
                        '<a onclick="confirm()"> Yes </a>' + '<a onclick="reject()"> No </a>' +
                      `</div>
                    </div>`
  document.getElementById("confirmation-box").style.display = 'block';

})

function confirm(){
  // e.preventDefault()
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert("Thank you! your form is submitted successfully." ))
    .then(() => {  window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
}

function reject(){
  document.getElementById("confirmation-box").style.display = 'none';
  kitform.style.display = 'block';
}

bar.addEventListener("click", function() {
    navbar.classList.add("active");
});

close.addEventListener("click", function() {
    navbar.classList.remove("active");
});


// slider

var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

    // Javascript for image slider manual navigation
    var manualNav = function(manual){
      slides.forEach((slide) => {
        slide.classList.remove('active');

        btns.forEach((btn) => {
          btn.classList.remove('active');
        });
      });

      slides[manual].classList.add('active');
      btns[manual].classList.add('active');
    }

    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i;
      });
    });

    var counter = 1;
    setInterval(function(){
      document.getElementById('radio' + counter).checked = true;
      counter++;
      if(counter > 3){
        counter = 1;
      }
    }, 5000);


// Card Slider
const cardSlider = document.querySelector('.card-slider');
const cards = document.querySelectorAll('.card');

let currentCard = 0;

function changeCard() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.transform = `translateX(${-100 * currentCard}%)`;
  }
}

function prevCard() {
  currentCard--;
  if (currentCard < 0) {
    currentCard = cards.length - 1;
  }
  changeCard();
}

function nextCard() {
  currentCard++;
  if (currentCard >= cards.length) {
    currentCard = 0;
  }
  changeCard();
}

cardSlider.addEventListener('click', (e) => {
  if (e.target.classList.contains('prevBtn')) {
    console.log(target.classList);
    prevCard();
  }
  if (e.target.classList.contains('nextBtn')) {
    nextCard();
  }
});

window.addEventListener('load', changeCard);


function kitfunction(){
  console.log("clicked");
  kitform.style.display = "block";
}

function closekitfunction(){
  kitform.style.display = "none";
}



    // Javascript for image slider autoplay navigation
    // var repeat = function(activeClass){
    //   let active = document.getElementsByClassName('active');
    //   let i = 1;

    //   var repeater = () => {
    //     setTimeout(function(){
    //       [...active].forEach((activeSlide) => {
    //         activeSlide.classList.remove('active');
    //       });

    //     slides[i].classList.add('active');
    //     btns[i].classList.add('active');
    //     i++;

    //     if(slides.length == i){
    //       i = 0;
    //     }
    //     if(i >= slides.length){
    //       return;
    //     }
    //     repeater();
    //   }, 10000);
    //   }
    //   repeater();
    // }
    // repeat();



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