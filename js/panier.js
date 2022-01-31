// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const Id = urlParams.get('id');



// fetch("http://localhost:3000/api/products/")
// .then(function(res) {
//   if (res.ok) {
//     return res.json();
//   }
// })
// .then(function(product){

// ImgEl.innerHTML = `<div class="cart__item__img">
// <img src="${product.imageUrl}" alt="Photographie d'un canapé"/>
// </div>
// `

// console.log(product)

// })

// console.log(monPanier)

let monPanier = JSON.parse(localStorage.getItem("Mon panier"))
let cartItems = document.getElementById("cart__items")

console.log(monPanier)

for(i = 0 ; i < monPanier.lenght ; i++){


}

   fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(product){
 console.log(product)})



//     cartItems.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />` 
//     cartItems.textContent = monPanier



    // for(i=0; i<product.lenght; i++){
    //     if(monPanier.includes(product)){
    //     cartItems.innerHTML = `<img src="${product[i].ImageUrl}" alt="Photographie d'un canapé" />`


    //     }

    // }

//   });

  

 



// function render(Items){
//     let listItems = ""
//   for(i=0; i<Items.length; i++){
  
//   // listItems += "<li><a target='_blank' href='" + myLeads[i]+ "'>" + myLeads[i] + "</a></li>"
  
//   listItems += `
  
//   <li>
//   <a target='_blank' href='${Items[i]}'> 
//   ${Items[i]}</a>
//   </li>
  
//   `
  
//   }
  
//   ulEl.innerHTML = listItems}
