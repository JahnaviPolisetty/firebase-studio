# AstroWeather in Firebase Studio

This is a Next.js project created in Firebase Studio.

## Getting Started

To get started, take a look at `src/app/page.tsx`.

### Running Locally

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### AI Features

This application uses Genkit and the Google Gemini models for its AI features. To use these features, you will need an API key.

1.  Create an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Set the `GEMINI_API_KEY` environment variable. You can do this by creating a `.env.local` file in the root of your project:

    ```
    GEMINI_API_KEY="YOUR_API_KEY"
    ```

## Deploying on Vercel

To deploy this application to Vercel, follow these steps:

1.  **Push to GitHub**: Push your project to a GitHub repository.
2.  **Import Project on Vercel**: Go to your Vercel dashboard and import the project from your GitHub repository.
3.  **Configure Environment Variables**: In the Vercel project settings, navigate to the "Environment Variables" section. Add the `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) with the value you obtained from Google AI Studio.
4.  **Deploy**: Vercel will automatically build and deploy your application. The build scripts and start commands are already configured in `package.json`.

Your app should now be deployed and running, with the AI features fully functional.
