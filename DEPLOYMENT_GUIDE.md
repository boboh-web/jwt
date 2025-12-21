# Deploying to Render

Your project is configured and ready to be deployed to [Render.com](https://render.com).

## Prerequisites

1.  **Git Repository**: Ensure your code is pushed to a remote repository (GitHub, GitLab, or Bitbucket).
2.  **Supabase Project**: You need your Supabase Project URL and Service Role Key.

## Deployment Steps

### 1. Create a Web Service

1.  Log in to your Render dashboard.
2.  Click **New +** and select **Web Service**.
3.  Connect your repository: `https://github.com/boboh-web/jwt`

### 2. Configuration

Render might automatically detect the `render.yaml` file in your repository. If so, it will pre-fill these settings. If not, configure them manually:

*   **Name**: `my-portfolio` (or your preferred name)
*   **Environment**: `Node`
*   **Build Command**: `npm install && npm run build`
*   **Start Command**: `npm run start`

### 3. Environment Variables

You **MUST** set the following environment variables in the "Environment" tab setup:

| Variable | Description |
| :--- | :--- |
| `SUPABASE_URL` | Your Supabase Project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase Service Role Key (found in Supabase Project Settings > API). |
| `ADMIN_PASSWORD` | Choose a strong password for the admin panel. |
| `SESSION_SECRET` | A long random string for securing sessions (e.g., generate one locally). |
| `NODE_VERSION` | `20.16.0` (Recommended to match your local version). |

> [!IMPORTANT]
> The application will fail to start if `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` are missing.
> `ADMIN_PASSWORD` is required to log in to the admin dashboard.

## Verification

Once deployed:
1.  Navigate to your Render URL (e.g., `https://my-portfolio.onrender.com`).
2.  Verify the homepage loads.
3.  Go to `/auth` or the admin route to test logging in with `admin` and your `ADMIN_PASSWORD`.
