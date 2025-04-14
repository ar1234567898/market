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
      let goodDiv = document.createElement("div");
      goodDiv.classList.add("good");

      // Append the good div to the container
      document.getElementById("goods").appendChild(goodDiv);

      // Populate the good div with content
      goodDiv.innerHTML = `
        
        <div class = "good-container">
          
          <h3 class = "good-name">${good.name}</h3>
          <img src='img/goods/${arrayOfImages[index]}.png' alt="${good.name}" onerror="this.onerror=null;this.src='img/goods/default.png';" />
        
        </div>
      `;
    });
  })
  .catch((error) => {
    console.error("Error fetching goods data:", error);
  });