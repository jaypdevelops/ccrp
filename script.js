const CLIENT_ID = "7943462626764736747";  // Replace with your Roblox OAuth2 client ID
const REDIRECT_URI = "https://jaydevelops.github.io/ccrp/test2";  // Your redirect URI

document.getElementById("link-roblox").addEventListener("click", function() {
    const AUTH_URL = `https://apis.roblox.com/oauth/v1/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid profile`;
    window.location.href = AUTH_URL;  // Redirect user to Roblox login
});

// Check if user is returning with an auth code
const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get("code");

if (authCode) {
    fetch(`https://yourproxyserver.com/exchange-token?code=${authCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                fetch("https://apis.roblox.com/oauth/v1/userinfo", {
                    headers: { Authorization: `Bearer ${data.access_token}` }
                })
                .then(response => response.json())
                .then(user => {
                    // Save user info in LocalStorage
                    localStorage.setItem("robloxUser", JSON.stringify(user));

                    // Display user info
                    updateUserProfile(user);
                });
            }
        })
        .catch(error => console.error("Error fetching user info:", error));
}

// Function to update user profile display
function updateUserProfile(user) {
    document.getElementById("username").textContent = user.name;
    document.getElementById("avatar").src = `https://www.roblox.com/headshot-thumbnail/image?userId=${user.sub}&width=50&height=50&format=png`;
    document.getElementById("avatar").style.display = "block";
}

// Load saved user info when the page loads
window.onload = function() {
    const savedUser = JSON.parse(localStorage.getItem("robloxUser"));
    if (savedUser) {
        updateUserProfile(savedUser);
    }
};