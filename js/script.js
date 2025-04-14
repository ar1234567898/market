let arrayOfImages = [
    "good-a",
    "good-b",
    "good-c",
    "good-d",
    "good-e",
    "good-omega-3",
  ];

fetch('js/goods.json')
  .then((response) => response.json()) // Fixed parentheses
  .then((data) => {
    data.forEach((good, index) => { // Fixed arrow function syntax
      let goodDiv = document.createElement("div");
      goodDiv.classList.add("good");

      // Append the good div to the container
      document.getElementById("p-good").appendChild(goodDiv);

      // Populate the good div with content
      goodDiv.innerHTML = `
        
        <div class = "good-container">
          <p>${good.id}</p>
          <h3>${good.name}</h3>
          <img src='img/goods/${arrayOfPhotos[index]}.png' alt="${good.name}" onerror="this.onerror=null;this.src='img/goods/default.png';" />
          <div> 
            <p>${"💖".repeat(good.rating) + "🤍".repeat(5 - good.rating)}</p>
          </div>           
        </div>
      `;
    });
  })
  .catch((error) => {
    console.error("Error fetching goods data:", error);
  });