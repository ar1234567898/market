async function getObjectsFromFile(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the file:", error);
  }
}

function add_good(
  name,
  id,
  real_price,
  new_price,
  coupon_price,
  paw,
  circle,
  imageName = "default"
) {
  const formattedRealPrice = real_price.toLocaleString("fr-FR");
  const formattedNewPrice = new_price.toLocaleString("fr-FR");
  const formattedCouponPrice = coupon_price.toLocaleString("fr-FR");

  let goodDiv = document.createElement("div");
  goodDiv.classList.add("good");
  goodDiv.setAttribute("data-id", id); // Add a unique identifier for removal

  goodDiv.innerHTML = `
    <div class="good-container">
      <h3 class="good-name">${name}</h3>
      <img class="good-img" src='img/goods/${imageName}.png' alt="${name}" onerror="this.onerror=null;this.src='img/goods/default.png';" />
      <div class="payment">
        <div><img class="payment-img" src="img/other/paw.png" alt="monobank" onerror="this.onerror=null;this.src='img/payment/default.png';" />${paw}</div>
        <div><img class="payment-img" src="img/other/diagramm.png" alt="privatbank" onerror="this.onerror=null;this.src='img/payment/default.png';" />${circle}</div>
      </div>
      <div class="price-div" role="button" tabindex="0"> 
        <p class="real-price">${formattedRealPrice} <span class="currency-span">грн</span></p>
        <p class="good-price">${formattedNewPrice} <span class="currency-span">грн</span></p>
      </div>
      <div class="coupon-price-div" role="button" tabindex="0">
        <p class="coupon-p">Ціна за <br>купоном</p>
        <p class="coupon-price">${formattedCouponPrice} <span class="currency-span">грн</span></p>
      </div>
    </div>
  `;

  // Add event listeners to make divs behave like buttons
  goodDiv.querySelector(".price-div").addEventListener("click", () => {
    console.log(`Price div clicked for good ID: ${id}`);

  });

  goodDiv.querySelector(".coupon-price-div").addEventListener("click", () => {
    console.log(`Coupon price div clicked for good ID: ${id}`);

  });

  document.getElementById("goods").appendChild(goodDiv);
}

let arrayOfImages = [
  "акумуляторний_обприскувач",
  "газонокосарка",
  "електричний_тример",
  "мотокоса",
];

async function buildGoods() {
  const goods = await getObjectsFromFile("js/goods.json");

  if (!goods) {
    console.error("Failed to load goods data.");
    return;
  }
  goods
    .forEach((good, index) => {
      add_good(
        good.name,
        good.id,
        good.real_price,
        good.new_price,
        good.coupon_price,
        good.paw,
        good.circle,
        arrayOfImages[index]
      );
    }).catch((error) => {
      console.error("Error fetching goods data:", error);
    });

  };

  buildGoods()




function remove_good(id) {
  const goodDiv = document.querySelector(`.good[data-id="${id}"]`);
  if (goodDiv) {
    goodDiv.remove();
  } else {
    console.warn(`Good with ID ${id} not found.`);
  }
}
