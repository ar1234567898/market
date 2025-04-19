let arrayOfImages = [
    "акумуляторний_обприскувач",
    "газонокосарка",
    "електричний_тример",
    "мотокоса"
  ];

  fetch('js/goods.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((good, index) => {
      add_good(good.name, good.id, good.real_price, good.new_price, good.coupon_price, arrayOfImages[index]);
    });
  })
  .catch((error) => {
    console.error("Error fetching goods data:", error);
  });

function add_good(name, id, real_price, new_price, coupon_price, imageName = "default") {
  const formattedRealPrice = real_price.toLocaleString('fr-FR');
  const formattedNewPrice = new_price.toLocaleString('fr-FR');
  const formattedCouponPrice = coupon_price.toLocaleString('fr-FR');

  let goodDiv = document.createElement("div");
  goodDiv.classList.add("good");
  goodDiv.setAttribute("data-id", id); // Add a unique identifier for removal

  goodDiv.innerHTML = `
    <div class="good-container">
      <h3 class="good-name">${name}</h3>
      <img class="good-img" src='img/goods/${imageName}.png' alt="${name}" onerror="this.onerror=null;this.src='img/goods/default.png';" />
      <div class="price-div"> 
        <p class="real-price">${formattedRealPrice} <span class="currency-span">грн</span></p>
        <p class="good-price">${formattedNewPrice} <span class="currency-span">грн</span></p>
      </div>
      <div class="coupon-price-div">
        <p class="coupon-p">Ціна за <br>купоном</p>
        <p class="coupon-price">${formattedCouponPrice} <span class="currency-span">грн</span></p>
      </div>
    </div>
  `;

  document.getElementById("goods").appendChild(goodDiv);
}

function remove_good(id) {
  const goodDiv = document.querySelector(`.good[data-id="${id}"]`);
  if (goodDiv) {
    goodDiv.remove();
  } else {
    console.warn(`Good with ID ${id} not found.`);
  }
}