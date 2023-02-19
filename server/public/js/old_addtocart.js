var cart =[];
console.log("chala");
console.log(cart);

const product = [
    {
        id: 0,
        image: ' image/gg-1.jpg',
        title: 'Minty Appe',
        price: 120000,
    },
    {
        id: 1,
        image: ' image/hh-2.jpg',
        title: 'Jau Pulao',
        price: 600000,
    },
    {
        id: 2,
        image: ' image/ee-3.jpg',
        title: 'Roti Tacos',
        price: 230000,
    },
    {
        id: 3,
        image: ' image/aa-1.jpg',
        title: 'Brown Rice Idli with <br> Rasam Sambhar',
        price: 100000,
    }
];

const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;

document.getElementById('shop-section').innerHTML = categories.map((item)=>
{
    console.log("Yes");
    var {image, title, price} = item;
    return(
    `<div class="pro">
                <img src=${image} alt="">
                <div class="des">
                     
                    <h5>${title}</h5>
                     
                    <h4> ${price}</h4>
                </div>`+
                "<a onclick='addtocart("+(i++)+")'><i class='fa-solid fa-plus cart'></i></a>"+
            `</div>`
    )
}).join('')

// var cart =[];
// console.log("chala");


 
function addtocart(a){
    
    console.log(cart);
    cart.push({...categories[a]});
    if(cart.length!=0){
        document.getElementById("floatingButton").classList.add("button-position");
    }
    var alertBox = document.getElementById("alert-box");
    alertBox.innerHTML = '<p> ✨ Item Added</p>';
    alertBox.style.display = "block";
    setTimeout(function() {
        
        alertBox.style.display = "none";
    }, 1000);
    
    // displaycart();
}
function delElement(a){
    var cart2 = [];
    cart2 = JSON.parse(localStorage.getItem('cart-data'));
    cart2.splice(a, 1);
    localStorage.setItem('cart-data', JSON.stringify(cart2));
    displaycart();
}

function displaycart(){
    console.log("display cart");
    if(localStorage.getItem('cart-data')==null){
        localStorage.setItem('cart-data','[]');
    }
    var cart2 = [];
    
    cart2 = JSON.parse(localStorage.getItem('cart-data'));
    let j = 0, total=0;  
    console.log(cart2);
    var pid = [];
    
    for(i=0;i<cart2.length;i++){
        pid.push(cart2[i].id);
    }
    console.log(pid);
    const jsonpid = JSON.stringify(pid);
    console.log(jsonpid);
    if(cart2==null){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = 0;
    }
    else{
        document.getElementById("cartItem").innerHTML = cart2.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = total;
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:17px;'>${title}</p>
                <h2 style='font-size: 15px;'>${price}</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
            
        }).join('');
    }
    
    
}

function checkout(){
    var alertBox = document.getElementById("alert-box");
    if(document.getElementById("address-display").innerHTML === ''){
        alertBox.innerHTML = '<p>Add Your Address</p>';
        alertBox.style.display = "block";
        setTimeout(function() {
            alertBox.style.display = "none";
        }, 1000);
    } else{
        var total = document.getElementById("total").innerHTML;
        // total = total.substring(1);
        var balance = document.getElementById("balance").innerHTML;
        total = Number(total);
        balance = Number(balance);
        if (total <= balance){
            var cart2 = JSON.parse(localStorage.getItem('cart-data'));
            var pid = [];
    
            for(i=0;i<cart2.length;i++){
                pid.push(cart2[i].id);
            }
            console.log(pid);
            const jsonpid = JSON.stringify(pid);
            fetch("/checkout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({jsonpid, total})
            })
            .then(response => response.json())
            .then(response => {
              console.log(response);
            });
            localStorage.setItem("cart-data", null);
            document.getElementById("checkoutLink").click();
            
            // alertBox.innerHTML = '<p>🎉 Order Placed</p>';
            // alertBox.style.display = "block";
            // setTimeout(function() {
                
            //     alertBox.style.display = "none";
            // }, 1000);
            // balance = balance - total;
            
        }
        else{
            alertBox.innerHTML = '<p>😣 Limit Exceeded</p>';
            alertBox.style.display = "block";
            setTimeout(function() {
                
                alertBox.style.display = "none";
            }, 1000);
            
        }
    }
}

function savedata() {
    if(localStorage.getItem('cart-data')==null){
        localStorage.setItem('cart-data','[]');
    }
    localStorage.setItem('cart-data', JSON.stringify(cart));
}

// function savedata1(){
    
//     if(localStorage.getItem('cart-data1')==null){
//         localStorage.setItem('cart-data1','[]');
//     }
//     var cart2 = [];
//     cart2 = JSON.parse(localStorage.getItem('cart-data'));
//     localStorage.setItem('cart-data1', JSON.stringify(cart2));
// }

function reload(){
    console.log("reload chala");
    if(localStorage.getItem('cart-data')==null){
        console.log("reload ka if chala");
    }
    else{
        console.log("reload ka else chala");
        if(localStorage.getItem('cart-data')!='null'){
            console.log("All OK");
            cart = JSON.parse(localStorage.getItem('cart-data'));
        }
        
        console.log(cart);
        if(cart.length!=0){
            document.getElementById("floatingButton").classList.add("button-position");
        }
    }

}

// var addAddressBtn = document.querySelector(".add-address-btn");
// var addressForm = document.querySelector(".address-form");

//       // Attach a click event listener to the button
//       addAddressBtn.addEventListener("click", function() {
//         // Toggle the visibility of the form
//         addressForm.classList.add(".address-form-display");
//       });
