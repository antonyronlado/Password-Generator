const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const number = '0123456789';
const symbol = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function generatePassword() {
  const length = +lengthEl.value;
  let chars = '';
  if (uppercaseEl.checked) chars += upper;
  if (lowercaseEl.checked) chars += lower;
  if (numbersEl.checked) chars += number;
  if (symbolsEl.checked) chars += symbol;

  if (chars === '') return 'Select at least one option!';

  let password = '';
  for (let i = 0; i < length; i++) {
    password += getRandomChar(chars);
  }

  passwordEl.value = password;
}

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
  if (!passwordEl.value) return;
  navigator.clipboard.writeText(passwordEl.value);
  copyBtn.textContent = '✅ Copied!';
  setTimeout(() => (copyBtn.textContent = '📋 Copy'), 1500);
});

 window.onload = () => {
    window.scrollTo(0, 0);
  };

  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');

      document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
      document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));

      if (!isOpen) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const elements = entry.target.querySelectorAll("h1, h2, p");
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("fade-slide-in");
          }, index * 1800); // 1.8s between each line
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  const passText = document.querySelector('.pass-text');
  observer.observe(passText);

window.onscroll = () => {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function scrollToGenerator() {
  document.getElementById("generator").scrollIntoView({
    behavior: "smooth"
  });
}

// Modal logic
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
}

function switchModal(to) {
  closeAllModals();
  const map = {
    login: 'loginModal',
    register: 'registerModal',
    forgot: 'forgotModal'
  };
  document.getElementById(map[to]).style.display = 'block';
}

function sendLoginOTP() {
  const phone = document.getElementById("login-phone").value.trim();
  if (phone.length < 10) return alert("Enter valid phone number");
  alert("OTP sent to " + phone);
  document.querySelector(".otp-input").style.display = "block";
  document.querySelector(".otp-btn").style.display = "block";
}

function sendRegisterOTP() {
  const phone = document.getElementById("reg-phone").value.trim();
  if (phone.length < 10) return alert("Enter a valid phone number");

  alert("OTP sent to " + phone);
  document.getElementById("reg-otp").style.display = "block";
  document.getElementById("registerBtn").style.display = "block";
}

function registerUser() {
  const otp = document.getElementById("reg-otp").value.trim();
  if (otp !== "123456") {
    alert("Incorrect OTP. Use 123456 (demo)");
    return;
  }

  const name = document.getElementById("reg-name").value.trim();
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const phone = document.getElementById("reg-phone").value.trim();

  if (!name || !username || !password || !phone) {
    alert("Please fill in all fields.");
    return;
  }

  fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      username,
      password,
      phone
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      closeAllModals();
    })
    .catch(error => {
      console.error("Error saving user:", error);
      alert("Registration failed. Check console.");
    });
}

function verifyLoginOTP() {
  const otp = document.getElementById("login-otp").value.trim();
  if (otp === "123456") {
    alert("Login successful!");
    closeAllModals();
  } else {
    alert("Incorrect OTP (use 123456 for demo)");
  }
}
