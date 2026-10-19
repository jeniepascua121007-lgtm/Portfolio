# Babes Pascua - Student Portfolio

This is a static student portfolio based on the supplied `index.html`, `style.css`, and the portfolio practical activity instructions. It uses HTML, CSS, JavaScript, JSON, and the public GitHub REST API.

## Folder structure

```text
babes-pascua-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── projects.json
└── images/
    ├── project-portfolio.svg
    ├── project-calculator.svg
    └── project-planner.svg
```

## Run it on your computer

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if you do not already have it.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Open the browser developer tools and check the Console if anything does not load.

Use Live Server rather than opening the HTML file directly, because browsers may block the JSON fetch from a `file://` URL.

## Personalize before publishing

- The original HTML used both **Jenie Pascua** and **Babes Pascua**. This version consistently uses **Babes Pascua**, following the original page title, metadata, footer, and `BP` initials. Change the name everywhere if Jenie Pascua is the intended name.
- Replace `YOUR_GITHUB_USERNAME` in `js/script.js` with the actual GitHub username to load the five latest public repositories.
- Replace the example email and social links in `index.html` with the correct public links, or remove the links you do not use.
- Replace the `BP` circle with a profile image when ready.
- `data/projects.json` currently contains **sample project entries** and the SVG files are illustrative mockups, not screenshots of completed apps. Replace the examples with projects you personally built, update the role and technologies, and add real demo or GitHub links before submitting.
- The contact form is a demonstration only. It validates the fields and shows a thank-you message, but it does not send email or save form submissions.

## Deploy with GitHub Pages

For the assignment's user site, create a public repository named exactly `YOUR_GITHUB_USERNAME.github.io`, upload the contents of this folder, then go to **Settings → Pages** and deploy from the `main` branch and root (`/`). Enable HTTPS and test the live site on both laptop and phone. Do not include personal details you do not want to make public.
