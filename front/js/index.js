fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    let items=document.getElementById("items");
    value.forEach(item => {
      let child=document.createElement("a");
      child.href="./product.html?id="+item._id;
      child.innerHTML='<article><img src="'+item.imageUrl+'" alt="'+item.altTxt+'" />'+
      '<h3 class="productName">'+item.name+'</h3>'+
      '<p class="productDescription">'+item.description+'</p>'+
      '</article>';
      items.appendChild(child);
    });
  })
  .catch(function(err) {
    console.log(err);
  }); 

