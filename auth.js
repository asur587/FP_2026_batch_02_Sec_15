document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggles();
  setupSignup();
  setupLogin();
  addAuthMouseParallax();
});

function setupPasswordToggles() {
  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        button.textContent = "Hide";
      } else {
        input.type = "password";
        button.textContent = "Show";
      }
    });
  });
}

function setupSignup() {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    clearSignupErrors();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document.getElementById("signupConfirmPassword").value.trim();
    const successText = document.getElementById("signupSuccess");

    let isValid = true;

    if (name.length < 3) {
      setError("signupNameError", "Name must be at least 3 characters.");
      isValid = false;
    }

    if (!isValidGmail(email)) {
      setError("signupEmailError", "Please enter a valid Gmail address.");
      isValid = false;
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      setError("signupPasswordError", passwordCheck.message);
      isValid = false;
    }

    if (confirmPassword !== password) {
      setError("signupConfirmPasswordError", "Passwords do not match.");
      isValid = false;
    }

    const users = getUsers();
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      setError("signupEmailError", "This Gmail is already registered.");
      isValid = false;
    }

    if (!isValid) return;

    const newUser = {
      id: generateUserId(),
      name,
      email,
      password,
      joinedAt: new Date().toISOString(),
      trips: [],
      bookings: [],
      preferences: {
        theme: "dark",
        currency: "INR"
      }
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);

    successText.textContent = "Account created successfully. Redirecting to homepage...";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  });
}

function setupLogin() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  const guestLink = document.getElementById("guestLoginLink");
  if (guestLink) {
    guestLink.addEventListener("click", (e) => {
      e.preventDefault();

      const demoUser = {
        id: "demo-user",
        name: "Demo Traveler",
        email: "demo@gmail.com",
        password: "Demo@123",
        joinedAt: new Date().toISOString(),
        trips: [],
        bookings: []
      };

      let users = getUsers();
      const existingDemo = users.find(user => user.email === demoUser.email);

      if (!existingDemo) {
        users.push(demoUser);
        saveUsers(users);
      }

      setCurrentUser(demoUser);
      document.getElementById("loginSuccess").textContent = "Demo login successful. Redirecting...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 900);
    });
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    clearLoginErrors();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();
    const rememberMe = document.getElementById("rememberMe").checked;
    const successText = document.getElementById("loginSuccess");

    let isValid = true;

    if (!isValidGmail(email)) {
      setError("loginEmailError", "Please enter a valid Gmail address.");
      isValid = false;
    }

    if (password.length < 6) {
      setError("loginPasswordError", "Password must be at least 6 characters.");
      isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (!foundUser) {
      setError("loginPasswordError", "Invalid Gmail or password.");
      return;
    }

    setCurrentUser(foundUser);

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    successText.textContent = `Welcome back, ${foundUser.name}. Redirecting...`;

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });

  preloadRememberedEmail();
}

function preloadRememberedEmail() {
  const emailInput = document.getElementById("loginEmail");
  const rememberCheckbox = document.getElementById("rememberMe");

  if (!emailInput || !rememberCheckbox) return;

  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberCheckbox.checked = true;
  }
}

function isValidGmail(email) {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
}

function validatePassword(password) {
  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters."
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one uppercase letter."
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one lowercase letter."
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one number."
    };
  }

  if (!/[!@#$%^&*(),.?\":{}|<>_\-+=/\\[\];'`~]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one special character."
    };
  }

  return {
    valid: true,
    message: ""
  };
}

function setError(id, message) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = message;
  }
}

function clearSignupErrors() {
  const ids = [
    "signupNameError",
    "signupEmailError",
    "signupPasswordError",
    "signupConfirmPasswordError",
    "signupSuccess"
  ];

  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = "";
  });
}

function clearLoginErrors() {
  const ids = [
    "loginEmailError",
    "loginPasswordError",
    "loginSuccess"
  ];

  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = "";
  });
}

function generateUserId() {
  return "user-" + Date.now();
}

function addAuthMouseParallax() {
  const glow1 = document.querySelector(".glow-1");
  const glow2 = document.querySelector(".glow-2");
  const clouds = document.querySelector(".clouds");

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    if (glow1) glow1.style.transform = `translate(${x}px, ${y}px)`;
    if (glow2) glow2.style.transform = `translate(${-x}px, ${-y}px)`;
    if (clouds) clouds.style.transform = `translate(${x * 0.35}px, ${y * 0.25}px)`;
  });
}