const searchButton = document.getElementById('search-btn');
const plantNameInput = document.getElementById('plant-name');
const plantInfoDiv = document.getElementById('plant-info');
const apiKey = 'sk-KWRL670e6b0f7a86b7266';  // Your API key

searchButton.addEventListener('click', async () => {
    const plantName = plantNameInput.value.trim();
    if (!plantName) {
        alert("Please enter a plant name or scientific name.");
        return;
    }

    try {
        const response = await fetch(`https://plantsearch.org/api/plants?name=${encodeURIComponent(plantName)}&api_key=${apiKey}`);
        const data = await response.json();
        displayPlantInfo(data);
    } catch (error) {
        console.error('Error:', error);
        plantInfoDiv.innerHTML = "Error fetching plant data.";
    }
});

function displayPlantInfo(data) {
    if (data.length > 0) {
        const plant = data[0];
        const plantDetails = `
            <h2>${plant.common_name || 'Unknown Plant'}</h2>
            <img src="${plant.image_url}" alt="${plant.common_name}" />
            <p><strong>Scientific Name:</strong> ${plant.scientific_name}</p>
            <p><strong>Description:</strong> ${plant.description || 'No description available.'}</p>
        `;
        plantInfoDiv.innerHTML = plantDetails;
    } else {
        plantInfoDiv.innerHTML = "No plant information found.";
    }
}