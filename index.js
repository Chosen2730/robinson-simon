const navContainer = document.querySelector(".header-content");
const footer = document.querySelector(".footer");

document.addEventListener("DOMContentLoaded", displayComponents);

function displayComponents() {
  displayNav();
  displayFooter();
  displayIcons();
}

function displayNav() {
  const nav = document.createElement("nav");
  nav.classList.add("navbar", "navigation", "navbar-expand-lg");
  nav.innerHTML = `<a class="navbar-brand" href="index.html">Simon I.R</a>
        
        <button class="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="project.html">Projects</a>
            </li>
            <li class="nav-items">
              <a class="nav-link" href="services.html">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">Contact</a>
            </li>
          </ul>
        </div>`;

  navContainer.prepend(nav);
}

function displayFooter() {
  const year = new Date().getFullYear();
  const copyright = document.createElement("div");
  copyright.classList.add("copyright");
  copyright.innerHTML = `&copy; <span> ${year} </span>Simon I.R. All Right Reserved</p>`;
  footer.appendChild(copyright);
}

const icons = document.querySelector("#icons");

function displayIcons() {
  icons.innerHTML = `<div class="social-items">
    <a href="index.html"><i class="social-icon fas fa-home"></i></a>
    <a href="https://wa.me/2348132157321"><i class="social-icon fab fa-whatsapp"></i></a>
    <a href="tel:+2348132157321"><i class="social-icon fas fa-phone"></i></a>
    <i id="topButton" class="social-icon fas fa-level-up-alt"></i>
  </div>
  <div class="social-toggle">
    <i class="fa-solid fa-caret-up"></i>
  </div>`;

  const iconToggle = document.querySelector(".social-toggle");
  const items = document.querySelector(".social-items");
  iconToggle.addEventListener("click", function () {
    if (items.classList.contains("show-items")) {
      items.classList.remove("show-items");
      iconToggle.innerHTML = `<i class='fa-solid fa-caret-up'></i>`;
    } else {
      iconToggle.innerHTML = `<i class='fa-solid fa-caret-down'></i>`;
      items.classList.add("show-items");
    }
  });

  const scrollBtn = document.querySelector("#topButton");
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  });
}

form();

function form() {
  const form = document.getElementById("contactForm");

  async function handleSubmit(event) {
    const contactCont = document.querySelector(".contact-me");
    const element = document.createElement("div");
    element.setAttribute("id", "status");
    contactCont.appendChild(element);

    event.preventDefault();
    var status = document.getElementById("status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML =
            "Your message has been recieved, we will reach out to you in due time!";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form";
            }
          });
        }
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
    setTimeout(function () {
      status.style.display = "none";
    }, 2000);
  }
  form.addEventListener("submit", handleSubmit);
}
