# 🌍 **GlobeTrekker** — Interactive World Explorer

![GlobeTrekker Banner](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBjnDzAvSdpeRQ-ckhwCTG3s6U2jehqNf2ag&s)

**GlobeTrekker** is an immersive web application that lets users explore countries around the world in a rich, interactive experience. With real-time global data, beautiful animations, and responsive design, it’s built to inspire curiosity and make learning fun.

---

## ✨ **Features**

- 🧭 **Interactive 3D Globe** – Navigate through a stunning globe interface with mouse interaction.
- 🌐 **Detailed Country Data** – View demographics, flags, capitals, borders, and languages.
- 🔍 **Smart Search** – Real-time filtering by name, capital, region, or language.
- 🎯 **Featured Countries** – Highlighted countries with unique stats and facts.
- 📊 **Global Insights** – Charts of global demographic data grouped by continent.
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile views.
- 🎞️ **Smooth Animations** – Powered by Framer Motion and GSAP for a fluid UI.

---

## 🛠️ **Tech Stack**

### 🖥️ Frontend
- React 18 + Vite  
- Tailwind CSS v4.1  
- React Router DOM  
- Framer Motion  
- GSAP  
- [react-globe.gl](https://github.com/vasturiano/react-globe.gl)  
- Axios  
- Nivo Charts  

### ⚙️ Backend
- Node.js + Express.js  
- MongoDB + Mongoose  
- RESTful API  
- JWT for authentication  
- bcrypt for password hashing  

---

## 📦 **Installation**

### 🔁 Clone the Repository

```bash
git clone https://github.com/yourusername/GlobeTrekker.git
cd GlobeTrekker


### 📥 Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### ⚙️ Configure Environment

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🚀 **Running the App**

### ▶️ Start Backend

```bash
cd backend
npm run dev
```

### ▶️ Start Frontend

```bash
cd frontend
npm run dev
```

### 🏁 Production Build

```bash
cd frontend
npm run build
```

---

## 🧭 **How to Use**

- 🔥 **Landing Page** – Discover featured countries and visual world stats.
- 🔎 **Search Function** – Find any country instantly using smart filters.
- 🗺️ **Country Details** – Click on any country to explore its full profile.
- 👤 **User Account** – Register or log in to save favorites and personalize the experience.

---

## 📸 **Screenshots**

| Landing Page | Country Details | Statistics |
|--------------|-----------------|------------|
| ![Landing](https://globe-trekker-gamma.vercel.app/assets/screenshots/landing.png) | ![Country](https://globe-trekker-gamma.vercel.app/assets/screenshots/country-details.png) | ![Stats](https://globe-trekker-gamma.vercel.app/assets/screenshots/statistics.png) |

---

## 🗂️ **Project Structure**

```bash
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

## 🧩 **Key Components**

- `HeroSection` – Hero banner with 3D globe interaction  
- `SearchComponent` – Smart search with filtering  
- `FeaturedCountries` – Grid or carousel of curated countries  
- `WorldStatistics` – Global stats with interactive charts  
- `CountryDetails` – In-depth views for each country  
- `InteractiveMap` – Visual map view of borders and regions  

---

## 🔐 **Authentication API**

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| POST   | `/api/auth/signup`  | Register a new user          |
| POST   | `/api/auth/login`   | Authenticate and get JWT     |
| GET    | `/api/auth/verify`  | Verify token validity        |

---

## 🧪 **Testing**

### ▶️ Backend Tests

```bash
cd backend
npm test
```

> Frontend tests (Jest + React Testing Library) — Coming Soon!

---

## 🤝 **Contributing**

We welcome your contributions! 🚀

1. Fork the repo  
2. Create a branch:  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push it:  
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a pull request 💡

---

## 🙏 **Acknowledgments**

- 🌍 Data: [REST Countries API](https://restcountries.com)  
- 🌐 3D Globe: [react-globe.gl](https://github.com/vasturiano/react-globe.gl)  
- 🎨 Icons: [Heroicons](https://heroicons.com)  

---

> Made with ❤️ by **Nithika Perera**
