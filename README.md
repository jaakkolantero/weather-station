# Weather station

Weather station web page that shows weather in Tampere, Jyväskylä, Kuopio and Helsinki.

## Getting Started

```
git clone https://github.com/jaakkolantero/weather-station.git
cd weather-station
npm install
```

create .env to project root

```
touch .env
```

.env

```
OPENWEATHERMAP_API_KEY_PROD=123456789abcdefghijkl
```

run locally

```
npm run dev
```

[localhost:3000](http://localhost:3000)

## Built With

- [Next.js](https://nextjs.org/) - The web framework used
- [Swr](https://swr.now.sh/) - React Hooks for Remote Data Fetching
- [Now](https://zeit.co/home) - Hosted on Zeit Now
- [TailwindCSS](https://tailwindcss.com/) -A utility-first CSS framework for
  rapidly building custom designs.
- [Typescript](https://www.typescriptlang.org/) - typed superset of JavaScript that compiles to plain JavaScript.

#### PS

Don't mind about the first commit messages. My commitizen was little messed up 😩
