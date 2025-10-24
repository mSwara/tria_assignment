# Tria Contact List Project
It uses **localStorage** to persist data between sessions.

---

## **Deployment**

Deployed on **Vercel**:[https://triaassignment1.vercel.app/](https://triaassignment1.vercel.app/)


## **Source Code**

GitHub Repository:  [https://github.com/mSwara/tria_assignment](https://github.com/mSwara/tria_assignment)



## **Features**
- Search contacts by name
- Add new contacts with name, phone number (with country code), and email.
- Edit existing contacts easily.
- Delete contacts with a confirmation prompt.
- Responsive UI with a green/blue theme and hover effects.
- Action buttons: Call, Video Call, Message (simulated with alert messages).
- Data persistence using `localStorage`.
- Preloaded sample contacts for demonstration.



## **Project Structure**

tria_assignment/
└── contact_list/       ← main project folder
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── App.css
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    └── README.md

## **Installation & Running Locally**

1. Clone the repository:

bash
git clone https://github.com/mSwara/tria_assignment.git
cd contact-list

2. Install dependencies:
npm install

3. Run the development server:
npm run dev

4.Open in browser


## **Deployment on Vercel**

1.Sign up / Log in to Vercel using GitHub.

2.Click New Project and import this repository.

3.Vercel usually detects Vite automatically:
    Build command: npm run build
    Output directory: dist

4.Click Deploy. The live URL will be provided


## **Libraries Used** 
React – For building the UI.
Vite – For fast bundling and development.
React Icons – For action buttons

## ** Assumptions**
Default country code for phone numbers is +91 (India), other options available.
Action buttons use alert() to simulate calls, messages, and video calls.
Contacts are sorted alphabetically by name.
localStorage is used for data persistence.


## **Handling Ambiguity**
Specific UI interactions (like hover effects, card styling) were chosen for usability and aesthetics.
Loading states are minimal as data is stored locally; no API calls are used.


