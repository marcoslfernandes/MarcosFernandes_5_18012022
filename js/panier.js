
// Afficher produits panier 

let cart=JSON.parse(localStorage.cart);

async function loadCart(){
    for(i=0;i<cart.length;i++){
        let item=await getProduct(cart[i].id);
        if(item!=null)
            displayProduct(item,cart[i]);
    }
}

async function getProduct(id){
    try{
        // await response of fetch call
        let response = await fetch("http://localhost:3000/api/products/"+id);
        // only proceed once promise is resolved
        let data = await response.json();
        return data;
    }catch(err){
        console.log(err);
    }
    return null;
}

function displayProduct(product,cartItem){
    // à quel moment le JSON est devenu product ?

    console.log(product._id);
    console.log(cartItem);
    let items=document.getElementById('cart__items');
    let article=`
    <article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.color}">
    <div class="cart__item__img"><img src="${product.imageUrl}" alt="${product.altTxt}"></div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${cartItem.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${cartItem.quantity}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  items.innerHTML+=article;

  // Function changer la quantité panier 
  
let itemQuantity = document.getElementsByClassName("itemQuantity")
  for (let i = 0 ; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener('change' , function(){
      totalQuantity.innerHTML = itemQuantity[i].value
      
      totalPrice.innerHTML = itemQuantity[i].value * `${product.price}`
    }) ; 
 }

  
 let totalQuantity = document.getElementById("totalQuantity")
 totalQuantity.innerHTML += `${cartItem.quantity}` 

 let totalPrice = document.getElementById("totalPrice")
totalPrice.innerHTML += `${cartItem.quantity}` * `${product.price}`




  // Function supprimer item panier 

  function removeItem(id, color) {
  let deleteCart = JSON.parse (localStorage.getItem("cart"))
    for (k = 0; k < deleteCart[0].length; k++) {
      if (deleteCart[k].id == id && deleteCart[k].color == color) {
        deleteCart.splice(k, 1);
        localStorage.setItem("cart", deleteCart);
        window.location.reload();
      }
    }
  }


// Formulaire validation 


}


    let nameError = document.getElementById("firstNameErrorMsg")
    let firstName = document.getElementById("firstName").value
  let order = document.getElementById("order")

  order.addEventListener("click", (event) =>{
    event.preventDefault();
    
      function validateFirstName(firstName){
        let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regex.test(firstName) == false || firstName == ""){
          return false
        } else{nameError.innerText = "";
          return true}
    
      }

       // function nom 
       function validateLastName(lastName) {
        let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regex.test(lastName) == false || lastName == "") {
          return false;
        } else {
          document.getElementById("lastNameErrorMsg").innerText = "";
          return true;
        }
      }
      // function adresse
      function validateAddress(address) {
        let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regex.test(address) == false || address == "") {
          return false;
        } else {
          document.getElementById("addressErrorMsg").innerText = "";
          return true;
        }
      }
      // function ville
      function validateCity(city) {
        let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regex.test(city) == false || city == "") {
          return false;
        } else {
          document.getElementById("cityErrorMsg").innerText = "";
          return true;
        }
      }

      // function mail 
      function validateEmail(email) {
        let regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexMail.test(email) == false) {
          return false;
        } else {
          document.getElementById("emailErrorMsg").innerText = "";
          return true;
        }

      }
  
 
  function errorHandler(firstName) {

    if (!validateEmail(email)) {
      document.getElementById("emailErrorMsg").innerText = "Veuillez saisir une adresse e-mail valide.";
    }
    if (!validateFirstName(firstName)) {
      document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez saisir un prénom valide sans chiffre.";
    }
    if (!validateLastName(lastName)) {
      document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez saisir un nom valide sans chiffre.";
    }
    if (!validateCity(city)) {
      document.getElementById("cityErrorMsg").innerHTML = "Veuillez saisir une commune valide sans chiffre.";
    }
    if (!validateAddress(address)) {
      document.getElementById("addressErrorMsg").innerHTML = "Veuillez saisir un adresse valide.";
    }
  }
  
  

    errorHandler(email, firstName, lastName, address, city);

    if (validateEmail(email) == true && validateFirstName(firstName) == true && validateLastName(lastName) == true
    && validateCity(city) == true && validateAddress(address) == true) {
    // si tout est valide soumettre résultat
    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    }}
   
  })

loadCart();
