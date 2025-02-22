class AnimalTable {
    constructor() {
        this.container = document.getElementById("animalTables");
        this.sortSelect = document.getElementById("sort-by");
        this.animalForm = document.getElementById("animal-form");

        this.animalData = {
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
    this.animalForm.addEventListener("submit", (e) => this.addOrEditAnimal(e));
    this.sortSelect.addEventListener("change", () => this.renderTables());
    this.renderTables();
}
sortAnimals(data) {
    const sortBy = this.sortSelect.value;

    return data.sort((a, b) => {
        if (sortBy === "name") return a.Name.localeCompare(b.Name);
        if (sortBy === "size") return parseInt(a.Size) - parseInt(b.Size);
        return 0; // Default order
    });
}

addOrEditAnimal(e) {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const species = document.getElementById("species").value;
    const name = document.getElementById("name").value;
    const size = document.getElementById("size").value;
    const location = document.getElementById("location").value;
    const image = document.getElementById("image").value;
    const editIndex = document.getElementById("edit-index").value;

    const newAnimal = { Species: species, Name: name, Size: size, Location: location, img: image };

    if (editIndex !== "") {
        this.animalData[category][parseInt(editIndex)] = newAnimal;
        document.getElementById("edit-index").value = "";
    } else {
        if (!this.animalData[category]) this.animalData[category] = [];
        this.animalData[category].push(newAnimal);
    }

    
    this.animalForm.reset();
    this.renderTables();
}

renderTables() {
    this.container.innerHTML = "";
    Object.keys(this.animalData).forEach((category) => {
        let data = [...this.animalData[category]];
        data = this.sortAnimals(data);

        let tableHTML = `<div class="category-header">${category}</div><table class="table"><tbody>`;
        data.forEach((animal, index) => {
            if (index % 2 === 0) tableHTML += `<tr>`;
            tableHTML += `
                <td>
                    <div class="animal-card">
                        <div class="card-actions">
                            <button class="edit-btn" data-category="${category}" data-index="${index}">✎</button>
                            <button class="delete-btn" data-category="${category}" data-index="${index}">✖</button>
                        </div>
                        <div class="card-content" id="content-${category}-${index}">
                            <img src="${animal.img}" alt="${animal.Name}">
                            <div class="card-text">
                            <p><strong>Species:</strong> ${animal.Species}</p>
                            <p><strong>Name:</strong> ${animal.Name}</p>
                            <p><strong>Size:</strong> ${animal.Size}</p>
                            <p><strong>Location:</strong> ${animal.Location}</p>
                            </div>
                        </div>
                        <div class="edit-form" id="edit-${category}-${index}" style="display: none;">
                            <input type="text" name="species" value="${animal.Species}">
                            <input type="text" name="name" value="${animal.Name}">
                            <input type="text" name="size" value="${animal.Size}">
                            <input type="text" name="location" value="${animal.Location}">
                            <button class="save-btn" data-category="${category}" data-index="${index}">Save</button>
                            <button class="cancel-btn" data-category="${category}" data-index="${index}">Cancel</button>
                        </div>
                    </div>
                </td>`;
            if (index % 2 === 1 || index === data.length - 1) tableHTML += `</tr>`;
        });

        tableHTML += `</tbody></table>`;
        this.container.innerHTML += tableHTML;
    });

    this.addEventListeners();
}

addEventListeners() {
    document.querySelectorAll(".edit-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => this.toggleEditForm(e))
    );

    document.querySelectorAll(".save-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => this.saveEdit(e))
    );

    document.querySelectorAll(".cancel-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => this.cancelEdit(e))
    );

    document.querySelectorAll(".delete-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => this.deleteAnimal(e))
    );
}

toggleEditForm(e) {
    const category = e.target.dataset.category;
    const index = parseInt(e.target.dataset.index);
    document.getElementById(`content-${category}-${index}`).style.display = "none";
    document.getElementById(`edit-${category}-${index}`).style.display = "block";
}

saveEdit(e) {
    const category = e.target.dataset.category;
    const index = parseInt(e.target.dataset.index);
    const editDiv = document.getElementById(`edit-${category}-${index}`);
    const inputs = editDiv.getElementsByTagName("input");

    this.animalData[category][index] = {
        Species: inputs[0].value,
        Name: inputs[1].value,
        Size: inputs[2].value,
        Location: inputs[3].value,
        img: this.animalData[category][index].img // Preserve image
    };

    this.renderTables();
}

cancelEdit(e) {
    const category = e.target.dataset.category;
    const index = parseInt(e.target.dataset.index);
    document.getElementById(`content-${category}-${index}`).style.display = "block";
    document.getElementById(`edit-${category}-${index}`).style.display = "none";
}

deleteAnimal(e) {
    const category = e.target.dataset.category;
    const index = parseInt(e.target.dataset.index);
    if (confirm("Are you sure you want to delete this animal?")) {
        this.animalData[category].splice(index, 1);
        this.renderTables();
    }
}
}

document.addEventListener("DOMContentLoaded", () => new AnimalTable());