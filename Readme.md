Places Explorer App

A React Native / Expo mobile app that allows users to search for places, view details, and save their favorite locations. The app integrates with Google Places API for place information and uses Redux for state management. The app supports light/dark themes and dynamic search functionality.

Table of Contents

Features

Architecture

Design Decisions

Setup

Folder Structure

Environment Variables

Usage

License

Features

Search places dynamically using Google Places API

View details including name, address, rating, and price level

Save favorite places using Redux

Navigate between search results and favorites

Light/dark theme support

Responsive UI for mobile devices

Architecture

The app uses Expo + React Native with the following key components:

Screens / Pages

PlacesList.jsx: Displays searchable list of places

Favorites.jsx: Displays user’s favorite places stored in Redux

State Management

Redux is used for storing favorites. This allows global access to favorite places from any screen.

Services

placesApi.js: Handles API requests to Google Places with dynamic search queries.

Requests are POST requests with textQuery dynamically populated.

Theming

themeContext.js: Provides light/dark theme state to components.

Navigation

Expo Router handles navigation between pages (PlacesList, Favorites, PlaceDetails).

Navigation actions use router.push() with dynamic parameters.

Design Decisions

Expo + React Native:
Provides cross-platform support and faster development compared to native projects.

Redux for Favorites:
Simple and scalable state management. Favorites can be accessed from any screen without prop drilling.

Dynamic Search:
Search bar lets users enter any query and fetch live results from Google Places.

API Integration:
Google Places API provides rich information about locations. Using textQuery allows flexibility and accurate search results.

Theming:
Light/dark theme support improves accessibility and user experience.

Setup
Prerequisites

Node.js >= 18

npm or yarn

Expo CLI (npm install -g expo-cli)

Google Places API Key

Clone the repository
git clone https://github.com/your-username/places-explorer.git
cd places-explorer

Install dependencies
npm install
# or
yarn install

Configure environment variables

Create a .env file in the root:

GOOGLE_PLACES_API_KEY=your_google_places_api_key_here


The .env file is ignored in .gitignore for security.

Run the app
expo start


Scan the QR code with Expo Go on your phone or run on simulator/emulator.

Folder Structure
/app
  /favorites.jsx       # Favorites screen
  /places.jsx          # Searchable places list screen
/services
  placesApi.js         # Google Places API integration
/store
  themeContext.js      # Theme provider
  favoritesSlice.js    # Redux slice for favorites

Environment Variables

GOOGLE_PLACES_API_KEY: Required to access Google Places API.

.env file is included in .gitignore to keep secrets safe.

Usage

Open the app.

Press "Get Started" on the home screen.

Search for any place using the search bar.

Tap a place to view details.

Add to favorites using the "heart" icon (Redux stores favorites).

View all favorites by tapping the "Favorites" button.

