function displayCharts() {
  fetch("http://localhost:9000/orion/charts")
    .then((response) => response.json())
    .then((d) => {
      const quantities = [],
        labels = [],
        price = [],
        trp = [];
      d.map((item) => {
        quantities.push(item.Quantity);
        trp.push(item.Total_Retail_Price);
        price.push(item.Price);
        labels.push(item.Product_Name);
      });
      drawChart(
        "pie",
        quantities,
        labels,
        "pieChart",
        "Produits en fonction de quantité"
      );
      drawChart(
        "bar",
        price,
        labels,
        "barChart",
        "Produits en fonction de prix"
      );
      drawChart(
        "line",
        trp,
        labels,
        "lineChart",
        "Produits en fonction de prix de vente total"
      );
    })
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
}

function drawChart(type, data, labels, id, label) {
  // Obtenez une référence à l'élément canvas
  const canvas = document.getElementById(id);

  // Créez un tableau de couleurs pour chaque secteur du graphique
  const colors = [];

  // Générer 10 couleurs aléatoires
  for (let i = 0; i < 10; i++) {
    const randomColor = getRandomColor();
    colors.push(randomColor);
  }

  // Créez la configuration du graphique
  const config = {
    type: type,
    data: {
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: colors,
        },
      ],
      labels: labels,
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white", // Couleur des étiquettes
          },
          align: "center",
        },
      },
    },
  };

  // Créez et affichez le graphique en utilisant la configuration
  new Chart(canvas, config);
}

// Fonction pour générer une couleur aléatoire en format hexadécimal
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
