/* =====================================================
   STUDENT PORTFOLIO INTERACTIONS
   Before publishing, replace the placeholder username below.
===================================================== */

const GITHUB_USERNAME = "jeniepascua121007-lgtm";

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const projectList = document.getElementById("project-list");
const githubStatus = document.getElementById("github-status");
const githubRepos = document.getElementById("github-repos");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearElement = document.getElementById("year");
const backToTopButton = document.getElementById("back-to-top");

// Set the footer year automatically.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Open and close the mobile navigation menu.
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// Create elements with textContent so project data is inserted safely.
function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeExternalLink(url, label, className = "") {
  if (!url || !/^https?:\/\//i.test(url)) return null;
  const link = createElement("a", className, label);
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

// Load project cards from data/projects.json.
async function loadProjects() {
  if (!projectList) return;

  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) {
      throw new Error(`Projects file returned HTTP ${response.status}`);
    }

    const projects = await response.json();
    if (!Array.isArray(projects) || projects.length === 0) {
      throw new Error("No projects were found in the JSON file.");
    }

    projectList.replaceChildren();

    projects.forEach((project) => {
      const card = createElement("article", "project-card");

      if (project.screenshot) {
        const image = createElement("img", "project-image");
        image.src = `images/${project.screenshot}`;
        image.alt = project.imageAlt || `${project.title || "Project"} preview illustration`;
        image.loading = "lazy";
        image.addEventListener("error", () => image.remove(), { once: true });
        card.appendChild(image);
      }

      card.appendChild(createElement("h3", "", project.title || "Untitled project"));
      card.appendChild(createElement("p", "", project.description || "No description provided yet."));

      if (Array.isArray(project.technologies) && project.technologies.length > 0) {
        card.appendChild(createElement("p", "tech", project.technologies.join(" · ")));
      }

      if (project.role) {
        const role = createElement("p", "project-role");
        const label = createElement("strong", "", "Role: ");
        role.append(label, document.createTextNode(project.role));
        card.appendChild(role);
      }

      const link = makeExternalLink(project.link, project.linkLabel || "View project ↗");
      if (link) {
        card.appendChild(link);
      } else {
        card.appendChild(createElement("p", "project-link-note", "Project link not added yet."));
      }

      projectList.appendChild(card);
    });
    projectList.setAttribute("aria-busy", "false");
  } catch (error) {
    console.error("Could not load projects:", error);
    projectList.replaceChildren(
      createElement("p", "repo-message", "Projects could not be loaded. Run this website with VS Code Live Server and check that data/projects.json exists.")
    );
    projectList.setAttribute("aria-busy", "false");
  }
}

// Fetch the five most recently updated public GitHub repositories.
async function loadGitHubRepositories() {
  if (!githubStatus || !githubRepos) return;

  if (!GITHUB_USERNAME || GITHUB_USERNAME === "YOUR_GITHUB_USERNAME") {
    githubStatus.textContent = "To show your repositories, replace YOUR_GITHUB_USERNAME in js/script.js with your GitHub username.";
    githubRepos.replaceChildren();
    return;
  }

  githubStatus.textContent = "Loading your latest public repositories…";
  githubRepos.replaceChildren();

  try {
    const username = encodeURIComponent(GITHUB_USERNAME.trim());
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5&type=owner`);
    if (!response.ok) {
      throw new Error(`GitHub API returned HTTP ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories) || repositories.length === 0) {
      githubStatus.textContent = "No public repositories were found for this username.";
      return;
    }

    repositories.forEach((repository) => {
      const item = createElement("li");
      const link = makeExternalLink(repository.html_url, repository.name);
      if (link) item.appendChild(link);
      item.appendChild(createElement("small", "repo-language", `Main language: ${repository.language || "Not specified"}`));
      if (repository.description) {
        item.appendChild(createElement("small", "repo-description", repository.description));
      }
      githubRepos.appendChild(item);
    });

    githubStatus.textContent = `Showing ${repositories.length} recently updated public ${repositories.length === 1 ? "repository" : "repositories"}.`;
  } catch (error) {
    console.error("Could not load GitHub repositories:", error);
    githubStatus.textContent = "GitHub repositories are unavailable right now. Check the username, internet connection, or GitHub API rate limit, then refresh.";
  }
}

// Validate the contact form, show a demo confirmation, and clear the fields.
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const senderName = document.getElementById("name").value.trim();
    if (!senderName) {
      document.getElementById("name").focus();
      formStatus.textContent = "Please enter your name.";
      return;
    }

    formStatus.textContent = `Thank you, ${senderName}! The demo form was submitted successfully. It does not send an email.`;
    contactForm.reset();
  });
}

// Optional feature from the assignment: show a back-to-top button after scrolling.
function updateBackToTopButton() {
  if (!backToTopButton) return;
  backToTopButton.classList.toggle("visible", window.scrollY > 450);
}

if (backToTopButton) {
  window.addEventListener("scroll", updateBackToTopButton, { passive: true });
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  updateBackToTopButton();
}

loadProjects();
loadGitHubRepositories();
