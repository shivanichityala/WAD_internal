document.addEventListener("DOMContentLoaded", () => {
  // Registration Process
  function register() {
  let user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  // Save user data to localStorage
  localStorage.setItem("user", JSON.stringify(user));

  // Show success message (you can also use an alert)
  alert("Registration Successful! Redirecting to Login...");

  // Redirect to the login page after 2 seconds
  setTimeout(() => {
    window.location.href = "login.html";  // Correctly redirects to login page
  }, 2000);  // Delay to let the user see the message
}
  // Login Process
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form from auto-submitting

      let email = document.getElementById("loginEmail").value;
      let password = document.getElementById("loginPassword").value;

      let storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        document.getElementById("loginMsg").innerHTML =
          "<div class='alert alert-success'>Login Successful! Redirecting to Catalog...</div>";

        setTimeout(() => {
          window.location.href = "catalog.html";
        }, 1500);
      } else {
        document.getElementById("loginMsg").innerHTML =
          "<div class='alert alert-danger'>Invalid Credentials. Please try again.</div>";
      }
    });
  }

  // Add to Cart functionality (works across pages)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  window.addToCart = function (name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart 🛒");
  };

  // Cart page load
  let cartDiv = document.getElementById("cartItems");
  if (cartDiv) {
    let total = 0;
    cartDiv.innerHTML = "";

    cart.forEach(item => {
      total += item.price;
      cartDiv.innerHTML += `
        <div class="card p-2 mb-2">
          ${item.name} - ₹${item.price}
        </div>
      `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
  }
});