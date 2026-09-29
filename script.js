const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const statusMessage = document.getElementById("statusMessage");
const togglePassword = document.getElementById("togglePassword");
const demoBtn = document.getElementById("demoBtn");
const forgotLink = document.getElementById("forgotLink");

function clearMessages() {
    emailError.textContent = "";
    passwordError.textContent = "";
    statusMessage.textContent = "";
    statusMessage.className = "status";
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

togglePassword.addEventListener("click", () => {
    const showing = password.type === "text";
    password.type = showing ? "password" : "text";
    togglePassword.textContent = showing ? "Show" : "Hide";
    togglePassword.setAttribute(
        "aria-label",
        showing ? "Show password" : "Hide password"
    );
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessages();

    const emailValue = email.value.trim();
    const passwordValue = password.value;

    let valid = true;

    if (!emailValue) {
        emailError.textContent = "Please enter your email address.";
        valid = false;
    } else if (!isValidEmail(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    }

    if (!passwordValue) {
        passwordError.textContent = "Please enter your password.";
        valid = false;
    } else if (passwordValue.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        valid = false;
    }

    if (!valid) {
        form.classList.remove("shake");
        void form.offsetWidth;
        form.classList.add("shake");
        return;
    }

    statusMessage.textContent = "Login successful — demo mode only.";
    statusMessage.classList.add("success");
});

demoBtn.addEventListener("click", () => {
    clearMessages();
    email.value = "demo@example.com";
    password.value = "demo123";
    statusMessage.textContent = "Demo details filled. Click Sign in.";
    statusMessage.classList.add("success");
});

forgotLink.addEventListener("click", (event) => {
    event.preventDefault();
    clearMessages();

    const emailValue = email.value.trim();

    if (!emailValue || !isValidEmail(emailValue)) {
        emailError.textContent = "Enter your email first to reset your password.";
        email.focus();
        return;
    }

    statusMessage.textContent = "Password reset link would be sent in a real app.";
    statusMessage.classList.add("success");
});

email.addEventListener("input", () => {
    emailError.textContent = "";
    statusMessage.textContent = "";
});

password.addEventListener("input", () => {
    passwordError.textContent = "";
    statusMessage.textContent = "";
});
