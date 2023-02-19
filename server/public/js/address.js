var addAddress = document.getElementById("add-address");
var addressClose = document.getElementById("address-close");

addAddress.addEventListener("click", function(){
    var addressForm = document.getElementById("address-form");
    addressForm.classList.add("address-form-display");
});
addressClose.addEventListener("click", function(){
    var addressForm = document.getElementById("address-form");
    addressForm.classList.remove("address-form-display");
});

var form = document.getElementById("address-form");

fetch('/addressData')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(typeof(JSON.parse(data)));
    var addressDetail = JSON.parse(data);
    console.log(addressDetail.name);
    if(data!= null){
      document.getElementById("add-address").style.display = "none";
      document.getElementById("address-display").innerHTML = '<p>Deliver To:</p> <div class="details"> <p>'+addressDetail.name+'</p> <p>'+addressDetail.addressLine1+'</p> <p>'+addressDetail.addressLine2+'</p> <p>'+addressDetail.city+'</p> <p>'+addressDetail.state+'</p> <p>'+addressDetail.zip+'</div';

    }
  });

// Listen for the form submit event
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the values from the form inputs
    var name = document.getElementById("name").value;
    var addressLine1 = document.getElementById("address-line1").value;
    var addressLine2 = document.getElementById("address-line2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;

    const addressData = {name, addressLine1, addressLine2, city, state, zip};
    
    fetch("/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(addressData)
    })
        .then(response => response.json())
        .then(response => {
          console.log(response);
        });
    // Log the values to the console
    console.log("Name: " + name);
    console.log("Address Line 1: " + addressLine1);
    console.log("Address Line 2: " + addressLine2);
    console.log("City: " + city);
    console.log("State: " + state);
    console.log("Zip Code: " + zip);


    document.getElementById("address-display").innerHTML = '<p>Deliver To:</p> <div class="details"> <p>'+name+'</p> <p>'+addressLine1+'</p> <p>'+addressLine2+'</p> <p>'+city+'</p> <p>'+state+'</p> <p>'+zip+'</div';
    document.getElementById("address-form").classList.remove("address-form-display");
    document.getElementById("add-address").style.display = "none";
});

