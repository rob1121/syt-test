## Super yacht mapper

A web application for tracking yacht positions and locations.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React Query
- React Leaflet
- Formik
- Yup
- Axios
- Sonner
- Shadcn UI

### React query and axios

- I use axios for making API calls and react query for caching and data fetching
- Axios is used for making API calls to the Superyacht API
- React Query is used for caching and data fetching

### Shadcn UI and Tailwind CSS

- I use Shadcn UI for UI components
- It is a collection of pre-built UI components that are built with Radix UI and Tailwind CSS
- It provides a consistent and modern look and feel

### React Leaflet

- I use React Leaflet for mapping
- It is a wrapper for Leaflet.js that provides a React interface for Leaflet
- It provides a consistent and modern look and feel

### Formik and yup

- I use Formik and Yup for form validation
- Formik is used for form management
- Yup is used for schema validation

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

## Journey

### Problem encountered

#### OAuth2

- Since we are building nextjs application, first comes to my mind was to use next-auth
- However, next-auth does not support our oauth2 flow
- I then decided not to use it and access the oauth link directly
- I then make a token request and store it in cookies
- and it works. Woooooooooooooh!!

#### My dev flow

- I started slow because I was trying to use next-auth
- However, I soon realized that it was not the right choice
- Then my momentum picked up
