const CLIENT_ID = "YOUR_CLIENT_ID";  // Replace with your actual Roblox OAuth2 client ID
const REDIRECT_URI = "https://yourwebsite.com/auth/callback";  // Your authorized redirect URI

document.getElementById("link-roblox").addEventListener("click", function() {
    const AUTH_URL = `https://apis.roblox.com/oauth/v1/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid profile`;
    window.location.href = AUTH_URL; // Redirect user to Roblox OAuth2 login
});

// Check if user is returning with an auth code
const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get("code");

if (authCode) {
    fetch(`https://yourproxyserver.com/exchange-token?code=${authCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                // Fetch user info from Roblox API
                fetch("https://apis.roblox.com/oauth/v1/userinfo", {
                    headers: { Authorization: `Bearer ${data.access_token}` }
                })
                .then(response => response.json())
                .then(user => {
                    // Save user info in LocalStorage
                    localStorage.setItem("robloxUser", JSON.stringify(user));

                    // Display user info
                    document.getElementById("username").textContent = user.name;
                    document.getElementById("avatar").src = `https://www.roblox.com/headshot-thumbnail/image?userId=${user.sub}&width=50&height=50&format=png`;
                    document.getElementById("avatar").style.display = "block";
                });
            }
        })
        .catch(error => console.error("Error fetching user info:", error));
}

// Load saved user info when the page loads
window.onload = function() {
    const savedUser = JSON.parse(localStorage.getItem("robloxUser"));
    if (savedUser) {
        document.getElementById("username").textContent = savedUser.name;
        document.getElementById("avatar").src = `https://www.roblox.com/headshot-thumbnail/image?userId=${savedUser.sub}&width=50&height=50&format=png`;
        document.getElementById("avatar").style.display = "block";
    }
};