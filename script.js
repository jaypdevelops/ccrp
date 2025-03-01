        function toggleMode() {
            document.body.classList.toggle('dark-mode');
            const button = document.querySelector('.toggle-button');
            button.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
        }

        function toggleMenu() {
            document.getElementById("navMenu").classList.toggle("active");
        }

        // Close menu when clicking outside
        document.addEventListener("click", function(event) {
            const menu = document.getElementById("navMenu");
            const button = document.querySelector(".menu-button");

            if (!menu.contains(event.target) && !button.contains(event.target)) {
                menu.classList.remove("active");
            }
        });