// DOM Elements
const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

// Load HTML components
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-container", "components/header.html");
  loadComponent("home-container", "components/home.html");
  loadComponent("about-container", "components/about.html");
  loadComponent("experience-container", "components/experience.html");
  loadComponent("projects-container", "components/projects.html");
  loadComponent("contact-container", "components/contact.html");
  loadComponent("footer-container", "components/footer.html");

  // Initialize contact form after components are loaded
  setTimeout(initContactForm, 1000);
});

// Function to load HTML components
function loadComponent(containerId, componentPath) {
  fetch(componentPath)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(containerId).innerHTML = html;

      // If this is the contact component, initialize the form
      if (containerId === "contact-container") {
        setTimeout(initContactForm, 100);
      }
    })
    .catch((error) => {
      console.error(`Error loading component ${componentPath}:`, error);
    });
}

// Initialize contact form with mailto functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && submitBtn) {
    // Change button type to button to prevent form submission
    submitBtn.type = "button";

    // Add click event to the submit button
    submitBtn.addEventListener("click", () => {
      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validate form
      if (!name || !email || !subject || !message) {
        showFormStatus("Please fill in all fields", "error");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormStatus("Please enter a valid email address", "error");
        return;
      }

      // Create mailto link with form data
      const mailtoLink = `mailto:afifthaarvi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      showFormStatus("Opening your email client...", "success");

      // Reset form after a delay
      setTimeout(() => {
        contactForm.reset();
        if (formStatus) formStatus.className = "form-status";
      }, 3000);
    });
  }

  // Helper function to show form status
  function showFormStatus(message, type) {
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.className = "form-status";

      if (type) {
        formStatus.classList.add(type);
      }
    } else {
      alert(message);
    }
  }
}

// Custom cursor
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  // Add a slight delay to the follower for a smoother effect
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 50);
});

// Cursor effects on hover
const cursorTargets = document.querySelectorAll("a, button, .project-card, .skill-item");
cursorTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.backgroundColor = "transparent";
    cursor.style.border = "2px solid var(--primary-color)";
    cursorFollower.style.width = "50px";
    cursorFollower.style.height = "50px";
    cursorFollower.style.opacity = "0.2";
  });

  target.addEventListener("mouseleave", () => {
    cursor.style.width = "10px";
    cursor.style.height = "10px";
    cursor.style.backgroundColor = "var(--primary-color)";
    cursor.style.border = "none";
    cursorFollower.style.width = "40px";
    cursorFollower.style.height = "40px";
    cursorFollower.style.opacity = "0.5";
  });
});

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Scroll Events
window.addEventListener("scroll", () => {
  // Header shadow on scroll
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Active nav link based on scroll position
  updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Smooth scrolling for nav links
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// Add animation on scroll
window.addEventListener("load", () => {
  // Initialize the page
  updateActiveNavLink();

  // Fade in elements when they come into view
  const fadeElements = document.querySelectorAll(".project-card, .skill-item, .about-content, .contact-content, .experience-card");

  const fadeInOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, fadeInOptions);

  fadeElements.forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    fadeInObserver.observe(element);
  });
});
