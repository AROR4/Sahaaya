# Sahaaya

## A full-stack web application that enables users to discover, create, and join community-driven campaigns. Built to empower changemakers and bring local impact initiatives online.

---

## 🚀 Features

- 🔍 Discover campaigns with filters (category, location, search)
- 🧑‍💼 Role-based access for users and organizers
- ✅ Campaign approval workflow
- 📅 Campaign creation form (for organizers)
- 👥 Join campaign functionality (for users)
- 🗃 Dynamic filtering & sorting: Popularity, Participants, Date
- 📱 Responsive UI with modern design
- 🔐 Login system (stored in localStorage)

---

## 🛠 Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Axios
- React Router
- Lucide Icons

**Backend:**
- Node.js + Express (assumed)
- MongoDB (with Mongoose)
- REST APIs for campaign management

---

## 📦 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/campaign-connect.git
cd campaign-connect
```
2. Install Dependencies
```bash
npm install
```
3. Start the Frontend
``` bash
npm run dev
```
4. Backend Setup
```bash 
cd server
npm install
npm run dev
```
---
## Usage

Register or Login 
Explore campaigns via /discover
Start a new campaign via /create
Join any campaign via /campaign/:id/join

---

## Folder Structure
``` bash
src/
├── components/
│   └── CampaignCard.jsx
├── pages/
│   ├── Discover.jsx
│   ├── JoinCampaign.jsx
│   └── CreateCampaign.jsx
├── data/
│   └── (optional static files)
├── App.jsx
├── main.jsx

```

## Sample Campaign API Format
```json
{
  "_id": "abc123",
  "title": "Beach Cleanup Drive",
  "description": "Let's clean the Marina Beach together!",
  "category": "Environment",
  "location": "Chennai, India",
  "date": "2025-08-01",
  "image_url": "https://...",
  "participants": ["userId1", "userId2"],
  "creator": {
    "_id": "userId123",
    "name": "Raghav Arora",
    "email": "raghav@example.com"
  },
  "status": "approved",
  "popularity_score": 92
}
```
## ❤️ Made with ❤️ by Raghav Arora
