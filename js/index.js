
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









// fetch("http://localhost:3000/api/products/")
//   .then(function(res) {
//     console.log(res);
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then(function(value) {
//     console.log(value);
//     let items=document.getElementById("items");
//     value.forEach(item  => {
//       // à quoi correspond le item ici ?
//       let child=document.createElement("a");
//       child.href="./product.html?id="+item._id;
//       child.innerHTML='<article><img src="'+item.imageUrl+'" alt="'+item.altTxt+'" />'+
//       '<h3 class="productName">'+item.name+'</h3>'+
//       '<p class="productDescription">'+item.description+'</p>'+
//       '</article>';
//       items.appendChild(child);
//       // pourquoi utiliser appendChild et pas append ?
//     });
//   })
//   .catch(function(err) {
//     // à quoi correspond le catch ?
//     console.log(err);
//   }); 

