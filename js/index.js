// Affichage produits dans la page d'accueil

fetch("http://localhost:3000/api/products/")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(products) {
  console.log(products);
  let items = document.getElementById("items")
  for(i=0; i<products.length; i++){
    items.innerHTML += `
    <a href="./product.html?id=${products[i]._id}">
    <article><img src="${products[i].imageUrl}" />
    <h3 class="productName">${products[i].name}</h3>
    <p class="productDescription">${products[i].description}</p>
    </article>
    </a>
    `}
});