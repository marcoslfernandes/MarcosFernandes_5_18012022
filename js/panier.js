

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

  //

  function deleteProduct(){
    let deleteItem = document.getElementsByClassName('deleteItem');
    console.log(deleteItem.length);
    for(i=0;i<deleteItem.length;i++){
      deleteItem[i].addEventListener('click',function(e){
        let target=e.target;
        let art=target.closest("article");
        console.log(art.dataset.id);
        console.log(art.dataset.color);
       
      });
    }





    
  }

  
  

  //

  // let deleteBtn = document.getElementById("deleteItem")
  // let deleteCart = JSON.parse (localStorage.getItem("cart"));
  // console.log(deleteCart[0].color);
 

  // function removeItem(id, color) {

  //   for (k = 0; k < deleteCart[0].length; k++) {
  //     if (deleteCart[0][k].id == id && deleteCart[0][k].color == color) {
  //       deleteCart.splice([0], k, 1);
  //       localStorage.setItem("cart", deleteCart);
  //       window.location.reload();
  //     }
  //   }
  // }

  // deleteBtn.addEventListener("click", function(){
  //   removeItem();
  //   window.location.reload();
  // })

//







let totalQuantity = document.getElementById("totalQuantity")
totalQuantity.innerHTML += `${cartItem.quantity}` 


//

let totalPrice = document.getElementById("totalPrice")
totalPrice.innerHTML += `${cartItem.quantity}` * `${product.price}`


}


let nameError = document.getElementById("firstNameErrorMsg")
let lastNameError = document.getElementById("lastNameErrorMsg")
let firstName = document.getElementById("firstName").value

  function validateFirstName(firstName){
    let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
    if (regex.test(firstName) == false || firstName == ""){
      return false
    } else{nameError.textContent = "";
      return true}

  }


  let order = document.getElementById("order")

  order.addEventListener("click", (event) =>{
    event.preventDefault();
    errorHandler(firstName);

  })
  

  function validateLastName(lastName){
    let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
    if (regex.test(lastName) == false || lastName == ""){
      return false
    } else{lastNameError.textContent = "";
      return true}

  }
 
  function errorHandler(firstName) {
    if (!validateFirstName(firstName)) {
      document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez saisir un prénom valide sans chiffre.";
    }}


loadCart();





// let monPanier = JSON.parse(localStorage.getItem("Mon panier"))
// let cartItems = document.getElementById("cart__items")



// function displayItems(){

//  cartItems.innerHTML = `<article class="cart__item" data-id="${monPanier}" data-color="${monPanier}">
//   <div class="cart__item__img">
//   <img src="" alt="Photographie d'un canapé">
//   </div>
//   <div class="cart__item__content">
//   <div class="cart__item__content__description">
//   <h2>Nom du produit</h2>
//   <p>${monPanier}</p>
//   <p>42,00 €</p>
//   </div>` }

//   displayItems()



  // Formulaire


  // let nameError = document.getElementById("firstNameErrorMsg")
  // let firstName = document.getElementById("firstName").value

  // function validateFirstName(firstName){
  //   let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
  //   if (regex.test(firstName) == false || firstName == ""){
  //     return false
  //   } else{nameError.textContent = "";
  //     return true}

  // }

  // validateFirstName()


//   Code panier 


// let cart=JSON.parse(localStorage.cart);

// async function loadCart(){
//     for(i=0;i<cart.length;i++){
//         let item=await getProduct(cart[i].id);
//         if(item!=null)
//             displayProduct(item,cart[i]);
//     }
// }

// async function getProduct(id){
//     try{
//         // await response of fetch call
//         let response = await fetch("http://localhost:3000/api/products/"+id);
//         // only proceed once promise is resolved
//         let data = await response.json();
//         return data;
//     }catch(err){
//         console.log(err);
//     }
//     return null;
// }

// function displayProduct(product,cartItem){
//     console.log(product._id);
//     console.log(cartItem);
//     let items=document.getElementById('cart__items');
//     let article='<article class="cart__item" data-id="'+cartItem.id+'" data-color="'+cartItem.colors+'">'+
//     '<div class="cart__item__img"><img src="'+product.imageUrl+'" alt="'+product.altTxt+'"></div>'+
//     '<div class="cart__item__content">'+
//       '<div class="cart__item__content__description">'+
//         '<h2>'+product.name+'</h2>'+
//         '<p>'+cartItem.colors+'</p>'+
//         '<p>'+product.price+' €</p>'+
//       '</div>'+
//       '<div class="cart__item__content__settings">'+
//         '<div class="cart__item__content__settings__quantity">'+
//           '<p>Qté : '+cartItem.qty+'</p>'+
//           '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+cartItem.qty+'">'+
//         '</div>'+
//         '<div class="cart__item__content__settings__delete">'+
//           '<p class="deleteItem">Supprimer</p>'+
//         '</div>'+
//       '</div>'+
//     '</div>'+
//   '</article>';
//   items.innerHTML+=article;
// }

// loadCart();