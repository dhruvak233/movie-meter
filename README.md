# **🎬 MovieMeter API**

## **📌 Overview**
MovieMeter is a **Node.js API** built with **TypeScript, Express, Sequelize, and SQLite3**, providing a set of endpoints to fetch and filter movies from a database. The API supports pagination, filtering by year and genre, and fetching detailed movie information, including ratings.

---

## **🛠️ Setup & Installation**

### **1️⃣ Clone the Repository**
https://github.com/dhruvak233/movie-meter

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
    },
    //...
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
**🔹 Endpoint:** `GET /movies?year=2000&page=1`  
**🔹 Description:** Fetches **movies released in a specific year**, paginated.  
**🔹 Query Params:** 
- `year` – The release year (e.g., `2000`).
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
**🔹 Endpoint:** `GET /movies?genre=drama&page=1`  
**🔹 Description:** Fetches **movies filtered by genre**, paginated.  
**🔹 Query Params:**  
- `genre` – The movie genre (e.g., `Drama`).
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
├── 📂 .github
│   ├── 📂 workflows       # GitHub Actions Workflows
│   │   ├── deploy.yml     # Deployment Workflow
│   │   ├── test.yml       # CI for Running Tests
│   │   ├── lint.yml       # Code Linting
├── 📂 config              # Environment Configurations
│   ├── 📂 environments    # Separate Environment Files
│   │   ├── .env.dev       # Development Config
│   │   ├── .env.stage     # Staging Config
│   │   ├── .env.prod      # Production Config
├── 📂 db                  # SQLite3 Databases
├── 📂 src
│   ├── 📂 controllers     # API Controllers
│   ├── 📂 database        # Database Setup & Models
│   ├── 📂 errors          # Custom Error Handling
│   ├── 📂 middleware      # Middleware (Logging, Validation, etc.)
│   ├── 📂 services        # Business Logic & Queries
│   ├── 📂 utils           # Utility Functions (Logging, Validation)
│   ├── app.ts          # Express Server Entry Point
├── 📂 tests               # Jest Unit Tests
├── package.json           # Dependencies & Scripts
├── tsconfig.json          # TypeScript Configuration
└── README.md              # Project Documentation

```

---

## **🚀 Deployment**
This guide outlines a basic GitHub Actions workflow to deploy your application to a server whenever code is pushed to the main branch.

📂 Project Structure
css
Copy code
.github/
 ├── workflows/
 │    ├── deploy.yml
 ├── src/
 ├── package.json
 ├── server.js
 ├── ...
1️⃣ Create a GitHub Actions Workflow
Create a file in your repository:

📌 Path: .github/workflows/deploy.yml

2️⃣ Set Up GitHub Secrets
Go to GitHub → Your Repository → Settings → Secrets and variables → Actions, and add:

Secret Name	Description
SERVER_HOST	Your server's IP address
SERVER_USER	SSH username
SSH_PRIVATE_KEY	Your private SSH key for authentication

3️⃣ How It Works
When you push code to the main branch, GitHub Actions:
Checks out the latest code.
Sets up Node.js and installs dependencies.
Runs tests.
SSHs into your server and pulls the latest changes.
Restarts the app using PM2.
✅ Conclusion
This is a simple deployment setup.
It automatically updates your server when changes are pushed to main.
You can customize it for Docker, Kubernetes, or other services.
🚀 You're now set up for automated deployments with GitHub Actions! 🚀
```

---

📌 Choosing GraphQL vs REST for MovieMeter API
🎯 Overview
The current REST API implementation in MovieMeter provides structured endpoints that allow clients to request and filter data using query parameters. While this approach is effective, it may introduce inefficiencies in data retrieval and flexibility for clients.

A GraphQL-based API could be a better alternative, especially considering the overlapping data needs across multiple endpoints. This write-up explores the benefits of GraphQL over REST in this context and the feasibility of transitioning to GraphQL.

🔍 GraphQL Implementation Example
🎯 GraphQL Schema for MovieMeter
A GraphQL schema defines the structure of data clients can request.

graphql
Copy code
type Movie {
  id: ID!
  title: String!
  description: String
  releaseDate: String
  budget: String
  runtime: Int
  averageRating: String
  genres: [String]
  productionCompanies: [String]
  originalLanguage: String
}

type Query {
  movies(genre: String, year: Int): [Movie]
  movie(id: ID!): Movie
}

➡ No Over-fetching!
Clients only receive what they request.
```

---

## **🙌 Contributors**
👨‍💻 **Your Name** – Lead Developer  
📧 Contact: [dhruvak233.com](mailto:dhruvak233@gmail.com)

---

### 🚀 **Now you're ready to build, run, and test the Movie API!** Let me know if you need any refinements. 🎬🔥

