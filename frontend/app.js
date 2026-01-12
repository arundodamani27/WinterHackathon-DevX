const findBtn = document.getElementById("findBtn");
const resultSection = document.getElementById("resultSection");
const stayResults = document.getElementById("stayResults");
const travelResults = document.getElementById("travelResults");
const searchBtn = document.getElementById("searchBtn");

let map = L.map('map').setView([12.9141, 74.8560], 13); // Default Mangalore

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker;

// ================== LOCATION SEARCH ==================
searchBtn.addEventListener("click", () => {
    const placeName = document.getElementById("examCentreInput").value.trim();
    if (!placeName) {
        alert("Please enter exam centre name");
        return;
    }
    searchLocation(placeName);
});

function searchLocation(placeName) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${placeName}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                map.setView([lat, lon], 15);

                if (marker) {
                    map.removeLayer(marker);
                }

                marker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(placeName)
                    .openPopup();
            } else {
                alert("Location not found");
            }
        })
        .catch(error => {
            console.error("Error fetching location:", error);
            alert("Error fetching location");
        });
}

// ================== FIND STAYS & TRAVEL ==================
findBtn.addEventListener("click", async () => {
    const city = document.getElementById("city").value;
    const area = document.getElementById("area").value.trim().toLowerCase();

    if (!city || !area) {
        alert("Please select city and enter exam area.");
        return;
    }

    try {
        const staysData = await fetch("../data/stays.json").then(res => res.json());
        const travelData = await fetch("../data/travel.json").then(res => res.json());

        const filteredStays = staysData.filter(
            stay => stay.city.toLowerCase() === city.toLowerCase() && stay.area.toLowerCase() === area
        );

        const filteredTravel = travelData.filter(
            travel => travel.city.toLowerCase() === city.toLowerCase() && travel.area.toLowerCase() === area
        );

        stayResults.innerHTML = "";
        travelResults.innerHTML = "";

        // ----------- STAYS -----------
        if (filteredStays.length === 0) {
            stayResults.innerHTML = "<p>No nearby stays found.</p>";
        } else {
            filteredStays.forEach(stay => {
                stayResults.innerHTML += `
                    <div class="stay-card">
                        <div class="stay-title">${stay.name}</div>
                        <span class="stay-type">${stay.type}</span>
                        <div class="stay-info">📍 ${stay.distance}</div>
                        <div class="stay-info">💰 ${stay.price}</div>
                        <div class="stay-contact">📞 ${stay.contact}</div>
                    </div>
                `;
            });
        }

        // ----------- TRAVEL -----------
        if (filteredTravel.length === 0) {
            travelResults.innerHTML = "<p>No travel information available.</p>";
        } else {
            filteredTravel.forEach(travel => {
                travelResults.innerHTML += `
                    <div class="travel-card">
                        <div class="travel-mode">${travel.mode}</div>
                        <div class="travel-info">From: ${travel.from}</div>
                        <div class="travel-info">⏱️ ${travel.time} | 💰 ${travel.cost}</div>
                    </div>
                `;
            });
        }

        resultSection.style.display = "block";
        setTimeout(() => {
            map.invalidateSize();
        }, 300);

        resultSection.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
        console.error("Error loading data:", error);
        alert("Failed to load stay/travel data");
    }
});
