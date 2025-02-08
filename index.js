document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("animalTables");
    const sortSelect = document.getElementById("sort-by");
    const animalForm = document.getElementById("animal-form");
    
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

    animalForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const category = document.getElementById("category").value;
        const species = document.getElementById("species").value;
        const name = document.getElementById("name").value;
        const size = document.getElementById("size").value;
        const location = document.getElementById("location").value;
        const image = document.getElementById("image").value;
        const editIndex = document.getElementById("edit-index").value;

        const newAnimal = {
            "Species": species,
            "Name": name,
            "Size": size,
            "Location": location,
            "img": image
        };

        if (editIndex !== "") {
            animalData[category][parseInt(editIndex)] = newAnimal;
            document.getElementById("edit-index").value = ""; 
        } else {
            if (!animalData[category]) {
                animalData[category] = [];
            }
            animalData[category].push(newAnimal);
        }
        
        animalForm.reset();
        renderTables();
    });

    function renderTables() {
        container.innerHTML = '';
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
                            <div class="card-actions">
                                <button class="edit-btn" onclick="editAnimal('${category}', ${index})" title="Edit">✎</button>
                                <button class="delete-btn" onclick="deleteAnimal('${category}', ${index})" title="Delete">✖</button>
                            </div>
                            <div class="card-content" id="content-${category}-${index}">
                                <p><strong>Species:</strong> ${animal.Species}</p>
                                <p><strong>Name:</strong> ${animal.Name}</p>
                                <p><strong>Size:</strong> ${animal.Size}</p>
                                <p><strong>Location:</strong> ${animal.Location}</p>
                                <img src="${animal.img}" alt="${animal.Name}">
                            </div>
                            <div class="edit-form" id="edit-${category}-${index}" style="display: none;">
                                <input type="text" name="species" value="${animal.Species}" placeholder="Species">
                                <input type="text" name="name" value="${animal.Name}" placeholder="Name">
                                <input type="text" name="size" value="${animal.Size}" placeholder="Size">
                                <input type="text" name="location" value="${animal.Location}" placeholder="Location">
                                <button onclick="saveEdit('${category}', ${index})">Save</button>
                                <button onclick="cancelEdit('${category}', ${index})">Cancel</button>
                            </div>
                        </div>
                    </td>`;
                if (index % 2 === 1 || index === data.length - 1) tableHTML += `</tr>`;
            });

            tableHTML += `</tbody></table>`;
            container.innerHTML += tableHTML;
        });
    }
    sortSelect.addEventListener('change', renderTables);
    
    renderTables();

    window.editAnimal = function(category, index) {
        const contentDiv = document.getElementById(`content-${category}-${index}`);
        const editDiv = document.getElementById(`edit-${category}-${index}`);
        contentDiv.style.display = 'none';
        editDiv.style.display = 'block';
    };

    window.saveEdit = function(category, index) {
        const editDiv = document.getElementById(`edit-${category}-${index}`);
        const inputs = editDiv.getElementsByTagName('input');
        
        animalData[category][index] = {
            Species: inputs[0].value,
            Name: inputs[1].value,
            Size: inputs[2].value,
            Location: inputs[3].value,
            img: animalData[category][index].img 
        };
        
        renderTables();
    };

    window.cancelEdit = function(category, index) {
        const contentDiv = document.getElementById(`content-${category}-${index}`);
        const editDiv = document.getElementById(`edit-${category}-${index}`);
        contentDiv.style.display = 'block';
        editDiv.style.display = 'none';
    };

    window.deleteAnimal = function(category, index) {
        if (confirm('Are you sure you want to delete this animal?')) {
            animalData[category].splice(index, 1);
            renderTables();
        }
    };
});