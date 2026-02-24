# sharmaasahill — Portfolio

My personal portfolio website. Built to showcase my projects, skills, and experience. To connect with people who need a developer.

## Live

Coming soon (or add your deployed URL here)

## Tech Stack

- React 19
- Vite
- Tailwind CSS v3
- Framer Motion
- react-icons
- react-scroll
- Web3Forms (contact form)

## Running Locally

```bash
# clone the repo
git clone https://github.com/sharmaasahill/sharmaasahill.git
cd sharmaasahill

# install dependencies
npm install

# create your .env file (see .env.example)
cp .env.example .env
# then add your Web3Forms API key in .env

# start dev server
npm run dev
```

## Environment Variables

This project uses one environment variable for the contact form:

| Variable | Description |
|---|---|
| `VITE_WEB3FORMS_KEY` | Your free API key from [web3forms.com](https://web3forms.com) |

Copy `.env.example` to `.env` and fill in your key. The `.env` file is gitignored so your key stays private.

## Build

```bash
npm run build
```

Output goes to the `dist/` folder, ready to deploy anywhere — Vercel, Netlify, GitHub Pages, etc.

## Contact

- Email: i.sahilkrsharma@gmail.com
- LinkedIn: [sharmaasahill](https://www.linkedin.com/in/sharmaasahill/)
- GitHub: [sharmaasahill](https://github.com/sharmaasahill)
