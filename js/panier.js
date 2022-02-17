
// Afficher produits panier 

let cart=JSON.parse(localStorage.cart);
let totalMont = 0
let totalArt = 0
let totalPrice = document.getElementById("totalPrice")
let totalQuantity = document.getElementById("totalQuantity")

async function loadCart(){
    for(i=0;i<cart.length;i++){
        let item=await getProduct(cart[i].id);
        if(item!=null){

          totalArt += parseInt(cart[i].quantity)
          totalMont += parseInt(cart[i].quantity) * parseInt(item.price)
          cart[i].price = parseInt(item.price)
            displayProduct(item,cart[i]);
          }
    } 

      localStorage.setItem("cart", JSON.stringify(cart))


    totalPrice.innerHTML = totalMont
    totalQuantity.innerHTML = totalArt

    addEvent(); 
    changeQty();

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


}



  

function changeQty(){
  
  let itemQuantity = document.getElementsByClassName("itemQuantity")
  for (let j = 0 ; j < itemQuantity.length; j++) {
    itemQuantity[j].addEventListener('change', function(e){
      let targetChange=e.target;
      let change=targetChange.closest("article");
      changeItem(change.dataset.id, change.dataset.color)

    }) ; 
 }
}

function changeItem(id, color) {
  let quantityEl = document.getElementsByClassName("itemQuantity")
  let changeCart = JSON.parse (localStorage.getItem("cart"))
    for (l = 0; l < changeCart.length; l++) {
      if (changeCart[l].id == id && changeCart[l].color == color) {
        let cartIndex = changeCart[l]
         totalArt -= parseInt(cartIndex.quantity)
         totalMont -= parseInt(cartIndex.price) * parseInt(cartIndex.quantity)
         cartIndex.quantity = parseInt(quantityEl[l].value)
         changeCart[l] = cartIndex
        totalMont += cartIndex.price * parseInt(quantityEl[l].value)
        totalArt += parseInt(quantityEl[l].value)
        totalQuantity.innerHTML = totalArt
        totalPrice.innerHTML = totalMont
        localStorage.setItem("cart", JSON.stringify(changeCart));
       break;
      }
    }
  }



  // Function supprimer item panier 

  function removeItem(id, color) {
    let deleteCart = JSON.parse (localStorage.getItem("cart"))
      for (k = 0; k < deleteCart.length; k++) {
        if (deleteCart[k].id == id && deleteCart[k].color == color) {
          totalArt -= parseInt(deleteCart[k].quantity)
          totalMont -= parseInt(deleteCart[k].price) * parseInt(deleteCart[k].quantity)
          deleteCart.splice(k, 1);
          totalQuantity.innerHTML = totalArt
          totalPrice.innerHTML = totalMont
          localStorage.setItem("cart", JSON.stringify(deleteCart));
          break;
          // window.location.reload();
        }
      }
    }
  
  function addEvent(){
      var els = document.getElementsByClassName('deleteItem');
      console.log(els.length);
      for(i=0;i<els.length;i++){
        els[i].addEventListener('click',function(e){
          let target=e.target;
          let art=target.closest("article");
          removeItem(art.dataset.id, art.dataset.color)
          art.parentNode.removeChild(art)
        });
      }}

  function displayTotal(){
  let changeCart = JSON.parse (localStorage.getItem("cart"))
  for(m=0; m<changeCart.length; m++){
    console.log(changeCart[m].quantity)
  }
}


  // validation formulaire 
  const button = document.getElementById("order")
  button.addEventListener("click", (event) => {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    // function prénom
    function validateFirstName(firstName) {
      // objet regex pour tester la chaîne de caractères 
      let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
      if (regex.test(firstName) == false || firstName == "") {
        return false;
      } else {
        document.getElementById("firstNameErrorMsg").innerText = "";
        return true;
      }
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
      let regex = /^[0-9a-zA-Z\-_\s]{1,}$/;
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
    // function pour envoyer message d'erreur si champs n'est pas valide 
    function errorHandler(email, firstName, lastName, address, city) {
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
      }
      let productsApi = [];
      let cartPanier = JSON.parse(localStorage.getItem("cart"))
      for (m = 0; m < cartPanier.length; m++) {
        productsApi.push(cartPanier[m].id);
      }
      // envoi des données à l'API
      console.log(productsApi)
      console.log(contact)
      fetch(("http://localhost:3000/api/products/order"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json", "Accept": "application/json"
        },
        body: JSON.stringify({ contact: contact, products: productsApi })
      })
        .then((res) => res.json())
        .then((order) => {
          //enleve les produits du panier
          // localStorage.clear();
          //renvoi a la page confirmation
          console.log(order.orderId)
          window.location = "confirmation.html?orderId=" + order.orderId
        })
        .catch(function (error) {
          console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
    }
  });


displayTotal();

loadCart();

