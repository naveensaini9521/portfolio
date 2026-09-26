# Naveen Saini — Developer Portfolio

A responsive React + Vite portfolio focused on Python backend development, DevOps, Kubernetes, and cloud-native projects.

## 1. Requirements

- Node.js 20.19+ (or a newer supported Node release)
- npm

## 2. Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## 3. Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## 4. Customize

Update the constants at the top of `src/main.jsx` for your GitHub, LinkedIn, and email. Replace/add project repository URLs in the `projects` array. Put your final resume at `public/resume.pdf` and add a download link if desired.

## 5. Deploy with GitHub Pages

1. Create a GitHub repository, for example `naveen-saini-portfolio`.
2. Push this project to the repository.
3. Build the project with `npm run build`.
4. Deploy the `dist/` directory using GitHub Pages or a static hosting provider.

## 6. Deploy with Docker + Nginx

```bash
docker build -t naveen-portfolio .
docker run --rm -p 8080:80 naveen-portfolio
```

Then open `http://localhost:8080`.
