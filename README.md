# 🩺 NephroScan AI

An AI-powered **Chronic Kidney Disease (CKD) Detection System** that leverages **Deep Learning** and **Grad-CAM** to analyze CT scan images, generate explainable predictions, maintain patient records, and produce downloadable medical reports through an intuitive web interface.

---

# 🌐 Live Demo

### Frontend
https://nephroscan-ai.netlify.app

### Backend
https://nephroscan-ai-production.up.railway.app

---

# ✨ Features

- 🔍 AI-based CKD detection from CT scan images
- 🧠 CNN model developed using TensorFlow & Keras
- 🔥 Explainable AI with Grad-CAM heatmaps
- 📤 Secure CT image upload
- 👤 Patient information management
- 📄 Downloadable PDF medical reports
- 🗄️ MySQL database integration
- ⚡ Real-time prediction results
- 📱 Responsive React user interface
- ☁️ Cloud deployment using Netlify & Railway

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios

## Backend

- Flask
- TensorFlow
- Keras
- OpenCV
- Python

## Database

- MySQL

## Deployment

- Netlify
- Railway

---

# 🧠 AI Workflow

```text
CT Scan Image
        │
        ▼
Image Preprocessing
        │
        ▼
CNN Model Prediction
        │
        ▼
Grad-CAM Heatmap
        │
        ▼
Prediction Result
        │
        ▼
Patient Record Stored
        │
        ▼
PDF Report Generated
```

---

# 📂 Project Structure

```text
NephroScan-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── app.py
│   └── requirements.txt
│
├── model/
│
├── gradcam/
│
├── database/
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/poojahegde880/nephroscan-ai.git
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Backend

```bash
cd backend

pip install -r requirements.txt

python app.py
```

---

# 🔒 Environment Variables

Create a `.env` file inside the backend directory.

```env
FLASK_ENV=development

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=nephroscan

SECRET_KEY=your_secret_key
```

---

# 📸 Screenshots

> Screenshots will be added soon.

Recommended screenshots:

- 🏠 Home Page
- 📤 CT Scan Upload
- 🧠 Prediction Result
- 🔥 Grad-CAM Visualization
- 📄 PDF Report
- 👤 Patient History

---

# 🚀 Future Improvements

- Multi-class kidney disease classification
- Doctor/Admin dashboard
- Email report delivery
- User authentication
- Patient search & filtering
- Medical history timeline
- Cloud storage for uploaded scans
- Model performance dashboard

---

# 👩‍💻 Author

**Pooja Hegde**

- 💼 LinkedIn: https://www.linkedin.com/in/poojahegde14
- 💻 GitHub: https://github.com/poojahegde880
- 🌐 Portfolio: https://pooja-hegde-portfolio.netlify.app

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---
