# 🌍 GlobeTrekker - Interactive World Explorer

![GlobeTrekker Banner](https://via.placeholder.com/1200x630/0a66c2/ffffff?text=GlobeTrekker)

**GlobeTrekker** is a comprehensive, interactive web application for exploring countries around the world. Built with modern web technologies, it offers immersive user experiences, detailed country information, and intuitive navigation across a responsive, dynamic interface.

---

## ✨ Features

- **Interactive 3D Globe**: Explore countries through an engaging 3D globe with mouse tracking.
- **Comprehensive Country Data**: View detailed information like demographics, flags, capitals, borders, and languages.
- **Advanced Search**: Search countries by name, capital, language, or region with real-time suggestions.
- **Featured Countries**: Highlighted nations with interesting statistics and facts.
- **World Statistics**: Visualizations of global demographic data grouped by continents.
- **Responsive Design**: Works flawlessly across mobile, tablet, and desktop devices.
- **Modern Animations**: Smooth transitions and fluid UI using Framer Motion.Here's your updated `README.md` file in the exact structure and style you requested, with all your original formatting preserved and enhanced for clarity and completeness:

---

````markdown
# 🌍 GlobeTrekker - Interactive World Explorer

![GlobeTrekker Banner](https://via.placeholder.com/1200x630/0a66c2/ffffff?text=GlobeTrekker)

**GlobeTrekker** is a comprehensive, interactive web application for exploring countries around the world. Built with modern web technologies, it offers immersive user experiences, detailed country information, and intuitive navigation across a responsive, dynamic interface.

---

## ✨ Features

- **Interactive 3D Globe**: Explore countries through an engaging 3D globe with mouse tracking.
- **Comprehensive Country Data**: View detailed information like demographics, flags, capitals, borders, and languages.
- **Advanced Search**: Search countries by name, capital, language, or region with real-time suggestions.
- **Featured Countries**: Highlighted nations with interesting statistics and facts.
- **World Statistics**: Visualizations of global demographic data grouped by continents.
- **Responsive Design**: Works flawlessly across mobile, tablet, and desktop devices.
- **Modern Animations**: Smooth transitions and fluid UI using Framer Motion and GSAP.

---

## 🛠️ Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS v4.1
- React Router DOM
- Framer Motion
- GSAP
- react-globe.gl
- Axios
- Nivo Charts

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- RESTful API
- JWT for authentication
- bcrypt for password hashing

---

## 📦 Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/GlobeTrekker.git
cd GlobeTrekker
````

### Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### Set up environment variables

Create a `.env` file in the `backend/` directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🔧 Running the App

### Start the backend server

```bash
cd backend
npm run dev
```

### Start the frontend development server

```bash
cd frontend
npm run dev
```

### For production build

```bash
cd frontend
npm run build
```

---

## 🚀 Usage

* **Landing Page**: Explore featured countries and view global statistics.
* **Search**: Quickly find countries using smart filters.
* **Country View**: Click a country to view detailed information and visuals.
* **User Account**: Register or log in to save your favorite countries and customize your experience.

---

## 📱 Screenshots

| Landing Page                                                                    | Country Details                                                                    | Statistics                                                                  |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| ![Landing](https://via.placeholder.com/400x225/0a66c2/ffffff?text=Landing+Page) | ![Country](https://via.placeholder.com/400x225/0a66c2/ffffff?text=Country+Details) | ![Stats](https://via.placeholder.com/400x225/0a66c2/ffffff?text=Statistics) |

---

## 🏗️ Project Structure

```
GlobeTrekker/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   ├── CountryInfo/
│   │   │   ├── GlobalStatistics/
│   │   │   ├── globe/
│   │   │   ├── home/
│   │   │   └── landing/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── server.js
│   └── .env
├── README.md
└── package.json
```

---

## 🔍 Key Components

* **HeroSection**: Immersive landing section with a 3D interactive globe.
* **SearchComponent**: Real-time country search bar with filter support.
* **FeaturedCountries**: Carousel or grid of highlighted nations.
* **WorldStatistics**: Charts and maps showing global demographic insights.
* **CountryDetails**: In-depth country profile with visuals and data.
* **InteractiveMap**: Visual representation of country locations and borders.

---

## 🔐 Authentication API Endpoints

* `POST /api/auth/signup`: Register new user
* `POST /api/auth/login`: Authenticate and return JWT
* `GET /api/auth/verify`: Verify JWT token validity

---

## 🧪 Testing

To run backend tests:

```bash
cd backend
npm test
```

(Frontend testing with React Testing Library & Jest coming soon.)

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes and commit:

   ```bash
   git commit -m "Add some amazing feature"
   ```
4. Push to your fork:

   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a pull request

---

## 🙏 Acknowledgments

* Data powered by [REST Countries API](https://restcountries.com)
* Globe rendering via [react-globe.gl](https://github.com/vasturiano/react-globe.gl)
* Icons and illustrations from [Heroicons](https://heroicons.com)

> Made with ❤️ by **Nithika Perera**

---

```

---

Let me know if you'd like a version with GitHub badges, deployed demo link, or environment-specific instructions for hosting platforms like Vercel, Render, or Netlify.
```


---

## 🛠️ Technologies Used

### Frontend
- React 18
- Tailwind CSS v4.1
- Framer Motion
- React Router
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- RESTful API

---

## 📦 Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/GlobeTrekker.git
cd GlobeTrekker
```

### Install dependencies
```bash
npm install
cd backend && npm install
```

### Set up environment variables
Create a `.env` file in the `backend/` directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start the development servers

#### Frontend
```bash
npm run dev
```

#### Backend
```bash
cd backend
npm start
```

### For production build
```bash
npm run build
```

---

## 🚀 Usage

- **Landing Page**: Explore featured countries and view global statistics.
- **Search**: Quickly find countries using smart filters.
- **Country View**: Click a country to view detailed information and visuals.
- **User Account**: Register or log in to save your favorite countries and customize your experience.

---

## 📱 Screenshots

| Landing Page | Country Details | Statistics |
|--------------|------------------|------------|
| ![Landing](https://via.placeholder.com/400x225/0a66c2/ffffff?text=Landing+Page) | ![Country](https://via.placeholder.com/400x225/0a66c2/ffffff?text=Country+Details) | ![Stats](https://via.placeholder.com/400x225/0a66c2/ffffff?text=Statistics) |

---

## 🏗️ Project Structure

```
GlobeTrekker/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── CountryInfo/
│   │   ├── GlobalStatistics/
│   │   ├── globe/
│   │   ├── home/
│   │   └── landing/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── package.json
```

---

## 🔍 Key Components

- **HeroSection**: Immersive landing section with a 3D interactive globe.
- **SearchComponent**: Real-time country search bar with filter support.
- **FeaturedCountries**: Carousel or grid of highlighted nations.
- **WorldStatistics**: Charts and maps showing global demographic insights.
- **CountryDetails**: In-depth country profile with visuals and data.
- **Interactive Map**: Visual representation of country locations and borders.

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add some amazing feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a pull request

---

## 🙏 Acknowledgments

- Data provided by [REST Countries API](https://restcountries.com)
- Icons by [Icon Provider]

> Made with ❤️ by [Nithika Perera]
