## Set-Up Information

### Repository

The source code for this project is publicly available on GitHub:

- **Repository URL:** [https://github.com/parishanizam/TeleHealth](https://github.com/parishanizam/TeleHealth)

### Cloning the Repository

To get started, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/parishanizam/TeleHealth.git
```

### Running the Application Locally

#### Backend

Navigate to the backend directory and install dependencies:

```bash
cd TeleHealth/src/backend
npm install
npm start
```

#### Frontend

In a separate terminal, navigate to the frontend directory and start the development server:

```bash
cd TeleHealth/src/frontend
npm install
npm run dev
```

The frontend will typically be served at [http://localhost:5173](http://localhost:5173), and the backend will run on [http://localhost:3000](http://localhost:3000).

### Deployment Notes

Once deployed, ensure all instances of local URLs (e.g., `http://localhost:3000`) are updated to their corresponding production endpoints:

- **Backend Production URL:** [https://telehealth-insights.onrender.com/](https://telehealth-insights.onrender.com/)
- **Frontend Production URL:** [https://telethealthinsights.netlify.app/](https://telethealthinsights.netlify.app/)
