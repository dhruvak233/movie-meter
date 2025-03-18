# **🎬 MovieMeter API**

## **📌 Overview**
MovieMeter is a **Node.js API** built with **TypeScript, Express, Sequelize, and SQLite3**, providing a set of endpoints to fetch and filter movies from a database. The API supports pagination, filtering by year and genre, and fetching detailed movie information, including ratings.

---

## **🛠️ Setup & Installation**

### **1️⃣ Clone the Repository**
Unzip the folder
```sh
cd moviemeter
```

### **2️⃣ Install Dependencies**
Ensure you have **Node.js** installed, then run:
```sh
npm install
```

### **3️⃣ Database Setup**
The application uses **SQLite3** as its database, located in the `db/` directory. No additional setup is needed.

To explore the database manually:
```sh
sqlite3 db/movies.db
sqlite3 db/ratings.db
```

---

## **🚀 Running the Application**

### **1️⃣ Start in Development Mode**
This runs the API with **hot reloading** using `nodemon`:
```sh
npm run dev
```

### **2️⃣ Build the Application**
To transpile TypeScript to JavaScript:
```sh
npm run build
```

### **3️⃣ Run the Compiled Version**
After building the project, start the API:
```sh
npm run start
```

---

## **🧪 Running Tests**
The project uses **Jest** for testing. Run the following command:
```sh
npm test
```

### **📊 Run Tests with Coverage**
To check test coverage:
```sh
npm run test:coverage
```

---

## **📖 API Endpoints**

### **1️⃣ List All Movies**
**🔹 Endpoint:** `GET /movies?page=1`  
**🔹 Description:** Fetches **50 movies per page**, including `imdbId, title, genres, releaseDate, budget`.  
**🔹 Query Params:**  
- `page` (optional) – Specify which page of results to retrieve.

#### **Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "imdbId": "tt1234567",
      "title": "Example Movie",
      "genres": ["Drama", "Thriller"],
      "releaseDate": "2020-05-14",
      "budget": "$5,000,000.00"
    }
  ]
}
```

---

### **2️⃣ Get Movie Details**
**🔹 Endpoint:** `GET /movies/:id`  
**🔹 Description:** Fetches **detailed information** for a specific movie.  
**🔹 Path Params:**  
- `id` – The unique movie ID.

#### **Example Response:**
```json
{
  "success": true,
  "data": {
    "imdbId": "tt1234567",
    "title": "Example Movie",
    "description": "A thrilling drama about...",
    "releaseDate": "2020-05-14",
    "budget": "$5,000,000.00",
    "runtime": 120,
    "averageRating": "8.5",
    "genres": ["Drama", "Thriller"],
    "originalLanguage": "English",
    "productionCompanies": ["Warner Bros", "Paramount"]
  }
}
```

---

### **3️⃣ Movies By Year**
**🔹 Endpoint:** `GET /movies/year/:year?page=1`  
**🔹 Description:** Fetches **movies released in a specific year**, paginated.  
**🔹 Path Params:**  
- `year` – The release year (e.g., `2000`).

**🔹 Query Params:**  
- `page` – Specify which page of results to retrieve.

#### **Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "imdbId": "tt1234567",
      "title": "Example Movie",
      "genres": ["Drama"],
      "releaseDate": "2000-06-20",
      "budget": "$10,000,000.00"
    }
  ]
}
```

---

### **4️⃣ Movies By Genre**
**🔹 Endpoint:** `GET /movies/genre/:genre?page=1`  
**🔹 Description:** Fetches **movies filtered by genre**, paginated.  
**🔹 Path Params:**  
- `genre` – The movie genre (e.g., `Drama`).

**🔹 Query Params:**  
- `page` – Specify which page of results to retrieve.

#### **Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "imdbId": "tt1234567",
      "title": "Example Movie",
      "genres": ["Drama"],
      "releaseDate": "2022-04-12",
      "budget": "$8,000,000.00"
    }
  ]
}
```

---

## **🧑‍💻 Code Structure**
```
📂 moviemeter
├── 📂 db                  # SQLite3 Databases
├── 📂 src
│   ├── 📂 controllers     # API Controllers
│   ├── 📂 database        # Database Setup & Models
│   ├── 📂 errors          # Custom Error Handling
│   ├── 📂 middleware      # Middleware (Logging, Validation, etc.)
│   ├── 📂 services        # Business Logic & Queries
│   ├── 📂 tests           # Jest Unit Tests
│   ├── 📂 utils           # Utility Functions (Logging, Validation)
│   ├── server.ts          # Express Server Entry Point
│   └── routes.ts          # API Routes
├── .env                   # Environment Variables (Optional)
├── package.json           # Dependencies & Scripts
├── tsconfig.json          # TypeScript Configuration
└── README.md              # Project Documentation
```

---

## **🚀 Deployment**
### **Run the API on a Cloud Service**
Use **Docker** or deploy it to **Heroku, Vercel, or AWS**.

To run with **Docker**:
```sh
docker build -t moviemeter .
docker run -p 3000:3000 moviemeter
```

---

## **🙌 Contributors**
👨‍💻 **Your Name** – Lead Developer  
📧 Contact: [dhruvak233.com](mailto:dhruvak233@gmail.com)

---

### 🚀 **Now you're ready to build, run, and test the Movie API!** Let me know if you need any refinements. 🎬🔥

