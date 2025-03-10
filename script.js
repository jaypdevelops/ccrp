const placeId = "13788934816"; // Replace with your game’s Place ID

async function fetchServers() {
    const url = `https://games.roblox.com/v1/games/${placeId}/servers/Public?sortOrder=Asc&limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch server data");

        const data = await response.json();
        const serverList = document.getElementById("serverList");
        serverList.innerHTML = ""; // Clear previous results

        if (data.data.length === 0) {
            serverList.innerHTML = "<p>No active servers found.</p>";
            return;
        }

        data.data.forEach(server => {
            const li = document.createElement("li");
            li.innerHTML = `
                <p>Server ID: ${server.id}</p>
                <p>Players: ${server.playing}/${server.maxPlayers}</p>
                <a href="https://www.roblox.com/games/${placeId}" target="_blank">Join Server</a>
            `;
            serverList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching server data:", error);
        alert("Error retrieving server list. Try again later.");
    }
}

// Automatically fetch servers when the page loads
window.onload = fetchServers;