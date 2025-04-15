let arrayOfImages = [
    "акумуляторний_обприскувач",
    "газонокосарка",
    "електричний_тример",
    "мотокоса"
  ];

fetch('js/goods.json')
  .then((response) => response.json()) // Fixed parentheses
  .then((data) => {
    data.forEach((good, index) => { // Fixed arrow function syntax
      const formattedRealPrice = good.real_price.toLocaleString('fr-FR');
      const formattedNewPrice = good.new_price.toLocaleString('fr-FR');
      const formattedCouponPrice = good.coupon_price.toLocaleString('fr-FR');
      
      let goodDiv = document.createElement("div");
      goodDiv.classList.add("good");

      // Append the good div to the container
      document.getElementById("goods").appendChild(goodDiv);

      // Populate the good div with content
      goodDiv.innerHTML = `
        
        <div class = "good-container">
          
          <h3 class = "good-name">${good.name}</h3>
          <img class = "good-img" src='img/goods/${arrayOfImages[index]}.png' alt="${good.name}" onerror="this.onerror=null;this.src='img/goods/default.png';" />
          <div class = "price-div"> 
            <p class = "real-price">${formattedRealPrice} <span class = "currency-span">грн</span> </p>
            <p class = "good-price">${formattedNewPrice} <span class = "currency-span">грн</span></p>
          </div>
          
          <div class = "coupon-price-div">
            <p class = "coupon-p">Ціна за <br>купоном</p>
            <p class = "coupon-price">${formattedCouponPrice} <span class = "currency-span">грн</span></p>
          </div>
          
        
        </div>
      `;
    });
  })
  .catch((error) => {
    console.error("Error fetching goods data:", error);
  });