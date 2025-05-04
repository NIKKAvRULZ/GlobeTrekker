
# 🌍✨ **GlobeTrekker** — Explore the World Like Never Before

<p align="center">
  <img src="https://sdmntprwestus.oaiusercontent.com/files/00000000-5d84-6230-93fd-90ac605ded3b/raw?se=2025-05-04T18%3A55%3A12Z&sp=r&sv=2024-08-04&sr=b&scid=1dd5ca16-1d8a-57a2-aeed-1d33e282224a&skoid=0abefe37-d2bd-4fcb-bc88-32bccbef6f7d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-04T00%3A43%3A23Z&ske=2025-05-05T00%3A43%3A23Z&sks=b&skv=2024-08-04&sig=YvysLi1%2Bft/eJ5GFnZYec/XCBDrkRLRmiKkWymL0BoA%3D" width="800" alt="GlobeTrekker Banner"/>
</p>

> **GlobeTrekker** is a visually engaging full-stack application that transforms the way you explore the world. Featuring a 3D globe, live country data, and personalized dashboards — it's your gateway to global discovery.

🔗 [**Live Demo**](https://globe-trekker-gamma.vercel.app)

---

## ✨ Features

- 🌍 **Interactive 3D Globe** with zoom, rotation & country tooltips  
- 🔎 **Dynamic Search & Filter** by name, capital, region or language  
- 👤 **User Auth** to save favorite countries securely  
- 📊 **Global Insights** with beautiful charts and statistics  
- 💡 **Fun Facts** about each country to enrich your journey  
- 📱 **Responsive Design** for mobile and tablets  
- ⚡ **Smooth Animations** powered by GSAP & Framer Motion  

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React 18 + Vite ⚡
- Tailwind CSS v4.1 💅
- React Router DOM  
- Framer Motion & GSAP 🎬  
- `react-globe.gl`, Axios, Nivo Charts 📊

### 🔧 Backend
- Node.js + Express.js 🚀  
- MongoDB + Mongoose 💾  
- JWT + bcrypt for Auth 🔐  
- RESTful APIs with secure endpoints  

---

## ⚙️ Installation

```bash
# Clone Repo
git clone https://github.com/yourusername/GlobeTrekker.git
cd GlobeTrekker

# Install Frontend
cd frontend
npm install

# Install Backend
cd ../backend
npm install
```

### Setup `.env` in `/backend`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Running the App

```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd ../frontend
npm run dev
```

### 🏗️ Production Build

```bash
cd frontend
npm run build
```

---

## 🗂️ Project Structure

```bash
GlobeTrekker/
├── frontend/
│   └── src/components/... (Globe, Search, Auth etc.)
├── backend/
│   └── routes, controllers, models/
└── README.md
```

---

## 📌 Key UI Components

| Component         | Description                        |
|------------------|------------------------------------|
| `HeroSection`     | Animated intro with globe          |
| `SearchComponent` | Real-time country search & filter  |
| `CountryDetails`  | In-depth view of selected country  |
| `WorldStatistics` | Charts on region/population etc.   |
| `InteractiveMap`  | 3D globe from `react-globe.gl`     |

---

## 🔐 Auth API

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | `/api/auth/signup` | Register new user        |
| POST   | `/api/auth/login`  | Login & return JWT       |
| GET    | `/api/auth/verify` | Validate JWT token       |

---

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test
```

> 🧪 Frontend tests with Jest & React Testing Library coming soon.

---

## 🤝 Contributing

We love contributors! 💜

```bash
# Fork & Clone
git checkout -b feature/awesome-feature

# Commit & Push
git commit -m "Add awesome feature"
git push origin feature/awesome-feature
```

Open a PR and get featured! 🚀

---

## 🙏 Acknowledgements

- [REST Countries API](https://restcountries.com)  
- [react-globe.gl](https://github.com/vasturiano/react-globe.gl)  
- [Nivo Charts](https://nivo.rocks)  
- [Heroicons](https://heroicons.com)

---

<p align="center">
  Made with ❤️ by <strong>Nithika Perera</strong>
</p>
