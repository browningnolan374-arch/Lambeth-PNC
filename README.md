# Lambeth PNC Setup Instructions

## Frontend Setup
1. Clone the repository.
   ```bash
   git clone https://github.com/browningnolan374-arch/Lambeth-PNC.git
   cd Lambeth-PNC
   ```

2. Navigate to the frontend directory.
   ```bash
   cd frontend
   ```

3. Install the dependencies.
   ```bash
   npm install
   ```

4. Start the frontend server.
   ```bash
   npm start
   ```

## Backend Setup
1. Navigate to the backend directory.
   ```bash
   cd backend
   ```

2. Install the dependencies.
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in the necessary configurations.

4. Start the backend server.
   ```bash
   npm start
   ```

## Deployment to Render
1. Go to [Render](https://render.com/) and sign in or create an account.
2. Create a new web service for the backend:
   - Connect your GitHub repository and select the `backend` branch.
   - Set the build command and start command for your backend.

3. Create a new static site for the frontend:
   - Connect your GitHub repository and select the `frontend` branch.
   - Set the build command to `npm run build` and the publish directory to `frontend/build`.

4. Configure any necessary environment variables in the Render dashboard.
5. Deploy the services.

Enjoy using the Lambeth PNC system!