# 🌟 MoodTrack - Daily Wellness Companion

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://your-vercel-url.com)
[![GitHub](https://img.shields.io/badge/GitHub-repo-blue?style=for-the-badge&logo=github)](https://github.com/yourusername/moodtrack)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

> A simple yet powerful MERN stack application that helps users track their daily moods, identify patterns, and build better mental wellness habits through journaling and visual insights.

![MoodTrack Preview](https://via.placeholder.com/800x400?text=Add+Screenshot+Here)

---

## 📖 About The Project

MoodTrack was created to solve a common problem: understanding our emotional patterns. Many people struggle to identify what triggers good or bad days, and traditional journaling can be time-consuming. MoodTrack provides a clean, intuitive interface where users can quickly log their daily mood, add optional journal entries, and view their emotional trends through beautiful visualizations.

### 🎯 Problem Statement

- People struggle to understand their emotional patterns
- Traditional journaling is time-consuming and hard to maintain
- Most mood-tracking apps are overcomplicated or require expensive subscriptions
- Lack of visual feedback makes it hard to spot trends

### 💡 Solution

MoodTrack offers:
- **Quick Mood Logging**: Log your mood with a single click using emoji-based selection
- **Optional Journaling**: Add detailed notes when you want, skip when you don't
- **Visual Analytics**: See your mood trends through beautiful, easy-to-understand charts
- **Privacy First**: All your data is encrypted and accessible only by you
- **Streak Tracking**: Build consistency with daily mood logging

---

## ✨ Key Features

### 🔐 User Authentication
- Secure signup and login with JWT authentication
- Password encryption using Bcrypt
- Protected routes and API endpoints

### 📊 Mood Tracking
- 5-level emoji-based mood selection (😢 😕 😐 🙂 😄)
- Quick daily logging interface
- Date and timestamp for every entry

### 📈 Dashboard Analytics
- 7-day mood trend visualization using Recharts
- Average mood calculation
- Total entries counter
- Current streak tracking
- Responsive charts that work on all devices

### 📝 Journal Management
- View all past mood entries
- Edit or delete existing entries
- Optional text notes for each mood
- Search and filter capabilities
- Chronological display with formatted dates

### 🎨 Modern UI/UX
- Clean, intuitive design
- Fully responsive (mobile, tablet, desktop)
- Beautiful gradient backgrounds
- Smooth transitions and animations
- Loading states and error handling

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router 6** - Navigation
- **Tailwind CSS 3.3** - Styling
- **Recharts 2.8** - Data visualization
- **Axios 1.5** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18** - Web framework
- **MongoDB** - Database
- **Mongoose 7.5** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing

### DevOps & Tools
- **Git** - Version control
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **MongoDB Atlas** - Database hosting
- **Postman** - API testing

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/moodtrack.git
   cd moodtrack
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set Up Environment Variables**

   **Backend** (`server/.env`):
   ```bash
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moodtrack
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

   **Frontend** (`client/.env`):
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Set Up MongoDB**
   - Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
   - Create a new cluster
   - Get your connection string
   - Add it to your backend `.env` file

6. **Run the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 📁 Project Structure

```
moodtrack/
│
├── client/                      # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/             # Context API
│   │   │   └── AuthContext.js
│   │   ├── pages/               # Page components
│   │   │   ├── Landing.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── LogMood.js
│   │   │   └── Journal.js
│   │   ├── App.js               # Main app component
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
│
├── server/                      # Node.js backend
│   ├── config/
│   │   └── db.js                # Database connection (optional)
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (optional)
│   │   └── moodController.js    # Mood logic (optional)
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Mood.js              # Mood schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── moods.js             # Mood routes
│   ├── .env.example
│   ├── server.js                # Entry point
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md                     # This file
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

**Register Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Mood Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/moods` | Get all user moods | Yes |
| GET | `/api/moods/:id` | Get single mood | Yes |
| POST | `/api/moods` | Create new mood | Yes |
| PUT | `/api/moods/:id` | Update mood | Yes |
| DELETE | `/api/moods/:id` | Delete mood | Yes |

**Create Mood Request Body:**
```json
{
  "mood": 4,
  "journalEntry": "Had a great day at work!",
  "date": "2024-03-15T10:30:00Z"
}
```

**Authentication Header:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set root directory to `client`
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
6. Deploy!

### Backend Deployment (Render)

1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set root directory to `server`
5. Add environment variables:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
6. Deploy!

### Database (MongoDB Atlas)

1. Already set up during installation
2. Whitelist Render's IP addresses in MongoDB Atlas
3. Use the connection string in Render environment variables

---

## 📸 Screenshots

### Landing Page
![Landing](https://via.placeholder.com/800x400?text=Landing+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+with+Charts)

### Log Mood
![Log Mood](https://via.placeholder.com/800x400?text=Mood+Logging+Interface)

### Journal
![Journal](https://via.placeholder.com/800x400?text=Journal+View)

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can register with valid credentials
- [ ] User receives error for invalid registration
- [ ] User can login with correct credentials
- [ ] User cannot access protected routes without token
- [ ] User can log a mood successfully
- [ ] Dashboard displays correct mood statistics
- [ ] Charts render properly with mood data
- [ ] User can view all journal entries
- [ ] User can edit existing entries
- [ ] User can delete entries
- [ ] Application is responsive on mobile devices

### API Testing with Postman

1. Import the Postman collection (create one)
2. Set environment variables
3. Test each endpoint
4. Verify responses and status codes

---

## 🎯 Future Enhancements

### Short-term Goals
- [ ] Dark mode toggle
- [ ] Email reminders for daily logging
- [ ] Export journal entries as PDF
- [ ] Mood categories/tags
- [ ] Advanced filtering and search

### Long-term Goals
- [ ] Mobile app (React Native)
- [ ] AI-powered mood insights
- [ ] Social features (share with therapist)
- [ ] Integration with fitness trackers
- [ ] Multiple journal types (gratitude, goals, etc.)
- [ ] Mood predictions based on patterns
- [ ] Multi-language support
- [ ] Voice notes for journal entries

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- Chart may not display properly with less than 2 data points
- Date picker defaults to current date (no custom date selection yet)
- No password reset functionality
- Streak counter is simplified (counts entries, not consecutive days)

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@Lesliecodes254](https://github.com/Lesliecodes254)
- Email: your.Kimberlyombima254@gmail.com

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Vercel](https://vercel.com)
- [Render](https://render.com)
- Icons from [Emoji](https://emojipedia.org)
- Inspiration from various mood-tracking apps

---

## 📚 Learning Resources

This project was built as part of a MERN Stack Developer course. If you're learning web development, here are some resources:

- [freeCodeCamp](https://www.freecodecamp.org)
- [The Odin Project](https://www.theodinproject.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript.info](https://javascript.info)
- [React Official Tutorial](https://react.dev/learn)

---

## 💬 Support

If you have any questions or need help with the project:

1. Check the [Issues](https://github.com/Lesliecodes254/moodtrack/issues) page
2. Create a new issue with a detailed description
3. Contact me directly via email

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

<div align="center">
  <p>Built with ❤️ and ☕ using the MERN Stack</p>
  <p>© 2024 MoodTrack. All rights reserved.</p>
</div>
