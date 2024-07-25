# User Management Application

## Overview

This is a full-stack User Management Application built with Next.js for the frontend and Flask for the backend API. It provides functionality for user authentication, user listing, and basic CRUD operations for user management.

## Features

- User Authentication (Sign Up, Login, Logout)
- User Listing
- Add, Edit, and Delete Users
- Responsive Design with Collapsible Sidebar
- Profile Dropdown Menu

## Tech Stack

### Frontend
- Next.js
- React
- CSS Modules

### Backend
- Flask
- MongoDB
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- Python (v3.7 or later)
- MongoDB

### Installation

1. Clone the repository:

        git clone https://github.com/your-username/user-management-app.git
        cd user-management-app

2.  Set up the backend:

    cd api
    python -m venv venv
    source venv/bin/activate  # On Windows use venv\Scripts\activate
    pip install -r requirements.txt

3. Set up the frontend:
    cd ../frontend
    npm install

4. Set up environment variables:
    - Create a `.env.local` file in the `frontend` directory:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```
    - Create a `.env` file in the `api` directory:
    ```
    SECRET_KEY=your_secret_key_here
    MONGO_URI=mongodb://localhost:27017/user_management
    ```

### Running the Application

1. Start the backend server:

    cd api
python app.py

2. In a new terminal, start the frontend development server:

cd frontend
npm run dev

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure
user-management-app/
│
├── api/
│   ├── app.py
│   └── requirements.txt
│
└── frontend/
├── components/
│   └── Layout.js
├── pages/
│   ├── index.js
│   ├── login.js
│   ├── signup.js
│   ├── list-users.js
│   ├── add-user.js
│   ├── edit-user/[id].js
│   ├── my-account.js
│   ├── settings.js
│   └── support.js
├── styles/
│   ├── globals.css
│   ├── Home.module.css
│   ├── Layout.module.css
│   └── Form.module.css
├── utils/
│   └── api.js
└── next.config.mjs

## API Endpoints

- `POST /api/signup`: Register a new user
- `POST /api/login`: Authenticate a user
- `GET /api/users`: Get all users (requires authentication)
- `POST /api/users`: Create a new user (requires authentication)
- `GET /api/users/<id>`: Get a specific user (requires authentication)
- `PUT /api/users/<id>`: Update a user (requires authentication)
- `DELETE /api/users/<id>`: Delete a user (requires authentication)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
