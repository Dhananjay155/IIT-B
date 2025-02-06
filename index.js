document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("animalTables");
    const categories = ["Big Cats", "Dogs", "Big Fish"];
    const baseUrl = "http://localhost:3000/";

    categories.forEach(category => {
        fetch(baseUrl + encodeURIComponent(category))
            .then(response => response.json())
            .then(data => {
                if (!data.length) return; 

                let tableHTML = `
                    <div class="category-header">${category}</div>
                    <table class="table"><tbody>`;

                data.forEach((animal, index) => {
                    if (index % 2 === 0) tableHTML += `<tr>`;
                    tableHTML += `
                        <td>
                            <div class="animal-card">
                                <p><strong>Species:</strong> ${animal.Species}</p>
                                <p><strong>Name:</strong> ${animal.Name}</p>
                                <p><strong>Size:</strong> ${animal.Size}</p>
                                <p><strong>Location:</strong> ${animal.Location}</p>
                                <img src="${animal.img}" alt="${animal.Name}">
                            </div>
                        </td>`;
                    if (index % 2 === 1 || index === data.length - 1) tableHTML += `</tr>`;
                });

                tableHTML += `</tbody></table>`;
                container.innerHTML += tableHTML;
            })
            .catch(error => console.error(`Error loading ${category}:`, error));
    });
});
