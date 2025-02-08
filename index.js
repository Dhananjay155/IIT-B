document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("animalTables");
    
    const animalData = {
        "Big Cats": [
            {
                "Species": "Big Cats",
                "Name": "Tiger",
                "Size": "10 ft",
                "Location": "Asia ",
                "img": "assets/bigcat/Tiger.png"
            },
            {
                "Species": "Big Cats",
                "Name": "Lion",
                "Size": "8 ft",
                "Location": "Africa",
                "img": "assets/bigcat/Lion.png"
            },
            {
                "Species": "Big Cats",
                "Name": "Leopard",
                "Size": "5 ft",
                "Location": "Africa and Asia",
                "img": "assets/bigcat/Leopard.png"
            },
            {
                "Species": "Big Cats",
                "Name": "Cheetah",
                "Size": "5 ft",
                "Location": "Africa",
                "img": "assets/bigcat/Cheetah.png"
            },
            {
                "Species": "Big Cats",
                "Name": "Caracal",
                "Size": "3 ft",
                "Location": "Africa",
                "img": "assets/bigcat/Caracal.png"
            },
            {
                "Species": "Big Cats",
                "Name": "Jaguar",
                "Size": "5 ft",
                "Location": "Amazon",
                "img": "assets/bigcat/Jaguar.png"
            }
        ],
        "Dogs": [
            {
                "Species": "Dog",
                "Name": "Rotwailer",
                "Size": "2 ft",
                "Location": "Germany",
                "img": "assets/dogs/Rotwailer.png"
            },
            {
                "Species": "Dog",
                "Name": "German Shepherd",
                "Size": "2 ft",
                "Location": "Germany",
                "img": "assets/dogs/German.png"
            },
            {
                "Species": "Dog",
                "Name": "Labrodar",
                "Size": "2 ft",
                "Location": "UK",
                "img": "assets/dogs/Labrodar.png"
            },
            {
                "Species": "Dog",
                "Name": "Alabai",
                "Size": "4 ft",
                "Location": "Turkey",
                "img": "assets/dogs/Alabai.png"
            }
        ],
        "Big Fish": [
            {
                "Species": "Big Fish",
                "Name": "Humpback Whale",
                "Size": "15 ft",
                "Location": "Atlantic Ocean",
                "img": "assets/bigfish/Humpback.png"
            },
            {
                "Species": "Big Fish",
                "Name": "Killer Whale",
                "Size": "12 ft",
                "Location": "Atlantic Ocean",
                "img": "assets/bigfish/Killer.png"
            },
            {
                "Species": "Big Fish",
                "Name": "Tiger Shark",
                "Size": "8 ft",
                "Location": "Ocean",
                "img": "assets/bigfish/Tiger.png"
            },
            {
                "Species": "Big Fish",
                "Name": "Hammerhead Shark",
                "Size": "8 ft",
                "Location": "Ocean",
                "img": "assets/bigfish/Hammerhead.png"
            }
        ]
    };

    const categories = Object.keys(animalData);

    categories.forEach(category => {
        const data = animalData[category];
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
    });
});