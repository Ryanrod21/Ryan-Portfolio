//Ryans img
import Flixx from '../assets/FlixxApp.jpg';
import BBall from '../assets/BasketballWeb.png';
import Calorie from '../assets/CalorieApp.png';
import GameHub from '../assets/gamehub.jpg';
import ShoeApp from '../assets/ShoeApp.jpg';
import Porsche from '../assets/PorscheGT3.png';
import store from '../assets/store.png';
import travel from '../assets/travel.png';
import study from '../assets/studyapp.png';
import budget from '../assets/budget.png';
import auto from '../assets/auto.jpg';
import dsst from '../assets/DSST.png';
import tribus from '../assets/tribus.jpg';

const portfolioData = [
  {
    title: 'Interactive Scroll Animations Report Page',
    description: `Developed a visually engaging report page within the HubSpot CMS, leveraging custom modules, JavaScript, and CSS to implement interactive scroll-based animations. Utilized animation libraries and dynamic content loading to create smooth transitions and an engaging user experience, while ensuring content editors could easily manage and update sections directly in HubSpot.`,
    // featured: [
    //   'AI-powered travel recommendations',
    //   'Destination browsing with Unsplash images',
    //   'Bookmark & rate favorite destinations',
    //   'Flight date selection & booking integration',
    //   'Responsive UI with Tailwind CSS',
    // ],
    image: dsst,
    industry: '',
    imageBefore: '',
    link: 'https://www.dsstpublicschools.org/2025-impact-report',
    // gitLink: 'https://github.com/Ryanrod21/travel-app.git',
  },

  {
    title: 'True Auto Protection',
    description: `Revamped the website's look and feel within the HubSpot CMS to align with the brand's identity and improve customer acquisition. Built flexible, reusable custom modules and optimized performance, accessibility, and UX, resulting in increased user engagement and higher conversion rates. Collaborated with the marketing team to implement SEO best practices and ensure seamless integration with HubSpot's CRM for lead capture and nurturing.`,
    // featured: [
    //   'AI-powered travel recommendations',
    //   'Destination browsing with Unsplash images',
    //   'Bookmark & rate favorite destinations',
    //   'Flight date selection & booking integration',
    //   'Responsive UI with Tailwind CSS',
    // ],
    image: auto,
    industry: '',
    imageBefore: '',
    link: 'https://www.trueautoprotection.com/',
    // gitLink: 'https://github.com/Ryanrod21/travel-app.git',
  },

  {
    title: 'Tribus Warranty',
    description: `Transformed an outdated website into a modern, user-friendly platform built on the HubSpot CMS, designed to help homeowners easily navigate warranty coverage details, compare plans, and request services with confidence. Developed custom CMS modules using HubL, JavaScript, and CSS to support flexible layouts and interactive components, while optimizing performance, accessibility, and responsiveness across devices. Implemented enhanced UX patterns, subtle animations, and streamlined form integrations tied directly into HubSpot CRM and workflows, resulting in higher customer engagement, improved satisfaction, and a more scalable content management experience for internal teams.`,
    //   'AI-powered travel recommendations',
    //   'Destination browsing with Unsplash images',
    //   'Bookmark & rate favorite destinations',
    //   'Flight date selection & booking integration',
    //   'Responsive UI with Tailwind CSS',
    // ],
    image: tribus,
    industry: '',
    imageBefore: '',
    link: 'https://tribushomewarranty.com/',
    // gitLink: 'https://github.com/Ryanrod21/travel-app.git',
  },

  {
    title: 'ScrubbedIn AI Powered Learning App',
    description: `ScrubbedIn is an AI-driven learning platform designed specifically for nursing and medical students. Nursing education often demands deep understanding and application-based knowledge, not just memorization — and ScrubbedIn helps bridge that gap.

By uploading study materials, users can generate AI-powered quizzes and flashcards tailored to their needs. The platform creates different types of questions and flashcards, including standard, case study, and NCLEX-style formats — the latter mirroring the real standardized test nurses must pass to earn licensure.

I built ScrubbedIn using Next.js for both frontend and backend API routes, Tailwind CSS and custom CSS for styling, Supabase for database management (Postgres), and OpenAI for generating AI-based content. The project also integrates several libraries for text extraction and content generation, ensuring seamless and accurate processing of uploaded study materials.`,
    // featured: [
    //   'AI-powered travel recommendations',
    //   'Destination browsing with Unsplash images',
    //   'Bookmark & rate favorite destinations',
    //   'Flight date selection & booking integration',
    //   'Responsive UI with Tailwind CSS',
    // ],
    image: study,
    industry: '',
    imageBefore: '',
    link: 'https://study-app-ai.vercel.app/landing',
    // gitLink: 'https://github.com/Ryanrod21/travel-app.git',
  },

  {
    title: 'AI budget Dashboard',
    description: `AI Finance Analyzer Dashboard is a full-stack application I'm developing using the MERN stack (MongoDB with Mongoose, Express.js, React.js, and Node.js). The platform is designed to help users analyze their financial data and generate personalized financial plans using AI.

I built the frontend with React and implemented a custom backend featuring a user database, RESTful API routes, and secure authentication using JWT and middleware. The application also integrates OpenAI APIs and agents to provide intelligent financial insights, allowing users to interact naturally with the app and receive tailored recommendations and planning tools based on their financial goals.`,
    // featured: [
    //   'AI-powered travel recommendations',
    //   'Destination browsing with Unsplash images',
    //   'Bookmark & rate favorite destinations',
    //   'Flight date selection & booking integration',
    //   'Responsive UI with Tailwind CSS',
    // ],
    image: budget,
    industry: '',
    imageBefore: '',
    // link: 'https://travel-app-azure-kappa.vercel.app/',
    gitLink: 'https://github.com/TheRJRod/budget-AI',
  },

  {
    title: 'FutureTravel',
    description: `Future Travel - Interactive Travel Planning App
Technologies: React, JavaScript, Next.js, Tailwind CSS, Firebase, OpenAI API, Unsplash API

Overview:
Plan trips effortlessly with AI-powered personalized recommendations and high-quality images from Unsplash.`,
    featured: [
      'AI-powered travel recommendations',
      'Destination browsing with Unsplash images',
      'Bookmark & rate favorite destinations',
      'Flight date selection & booking integration',
      'Responsive UI with Tailwind CSS',
    ],
    image: travel,
    industry: '',
    imageBefore: '',
    link: 'https://travel-app-azure-kappa.vercel.app/',
    gitLink: 'https://github.com/Ryanrod21/travel-app.git',
  },
  {
    title: 'Simple Supplies',
    description: `Simple Supplies - E-commerce Store
Technologies: React, JavaScript, Next.js, CSS, Font Awesome, External API

Overview:
Browse and purchase products with featured top-rated items, dynamic search, and a functional shopping cart.`,
    featured: [
      'Category & subcategory browsing',
      'Top-rated featured items',
      'Quick-add to cart & product pages',
      'Real-time cart count & checkout summary',
      'Responsive design & API integration',
    ],
    image: store,
    industry: '',
    imageBefore: '',
    link: 'https://supplies-store.vercel.app/',
    gitLink: 'https://github.com/Ryanrod21/nextStore.git',
  },
  {
    title: 'The GameHub',
    description: `The GameHub - Gaming Dashboard
Technologies: JavaScript, React, Next.js, Firebase, APIs

Overview:
Search games, view details, and connect with friends in real time using a responsive dashboard with API integration.`,
    featured: [
      'Game search across platforms',
      'Detailed pages: ratings, descriptions, screenshots',
      'User authentication & real-time chat',
      'Responsive dashboard UI',
      'API integration for dynamic content',
    ],
    image: GameHub,
    industry: '',
    imageBefore: '',
    link: 'https://gamer-hub-beta.vercel.app/',
    gitLink: 'https://github.com/Ryanrod21/GamerHub.git',
  },

  {
    title: 'Flixx App',
    description: `Flixx App - Movie Exploration Platform
Technologies: HTML, CSS, JavaScript, Font Awesome, Swiper.js, External APIs

Overview:
Browse movies with detailed cast, crew, reviews, and smooth touch-friendly carousels.`,
    featured: [
      'Latest & classic films',
      'Detailed pages with cast, crew, and reviews',
      'Responsive UI with touch-friendly carousels',
      'API integration for dynamic content',
      'Enhanced UI with Font Awesome icons',
    ],
    image: Flixx,
    industry: '',
    imageBefore: '',
    link: 'https://movie-app-six-kohl-38.vercel.app/',
    gitLink: 'https://github.com/Ryanrod21/movie-app.git',
  },

  //   {
  //     title: 'Basketball Training Page',
  //     description: `Basketball Training Page - Skill Development Platform
  // Technologies: Hub Spot, HTML, CSS, JavaScript

  // Overview:
  // Sign up for expert coaching, skill-building drills, and personalized programs to improve performance.`,
  //     featured: [
  //       'Expert coaching & drills',
  //       'Personalized training programs',
  //       'Responsive design with HTML & CSS',
  //       'Interactive features with Hub Spot',
  //       'Focus on performance improvement',
  //     ],
  //     image: BBall,
  //     industry: '',
  //     imageBefore: '',
  //     link: 'https://none-49164491.hubspotpagebuilder.com/basketball-test',
  //   },

  {
    title: 'Calorie Tracking App',
    description: `Calorie Tracking App - Nutrition Monitoring Tool
Technologies: HTML, CSS, JavaScript

Overview:
Track your nutrition and stay on top of your goals with this easy-to-use calorie tracker. Users can set goals, log meals, and monitor progress daily. This app demonstrates clean, responsive design and functional tracking features for healthier habits.`,
    featured: [
      'Set personalized nutrition & calorie goals',
      'Log meals & track progress',
      'Responsive design with HTML & CSS',
      'Easy-to-use interface for healthy habits',
      'Focus on daily tracking & goals',
    ],
    image: Calorie,
    industry: '',
    imageBefore: '',
    link: 'https://calorie-tracker-beta-eight.vercel.app/',
    gitLink: 'https://github.com/Ryanrod21/Calorie-Tracker',
  },
  // {
  //   title: 'Running Attire',
  //   description:
  //     'Gear up with the latest in running apparel, from performance shoes to moisture-wicking clothes and essential accessories. Whether you are hitting the trail or the pavement, find everything you need to run strong and stay comfortable',
  //   image: ShoeApp,
  //   industry: '',
  //   imageBefore: '',
  //   link: 'https://shoe-project-sand.vercel.app/',
  // },
  // {
  //   title: 'Porsche GT3 Info Page',
  //   description:
  //     'Discover the thrill of the Porsche 911 GT3—where track-bred performance meets iconic design. Explore specs, features, and the engineering excellence that makes the GT3 a true driving machine',
  //   image: Porsche,
  //   industry: '',
  //   imageBefore: '',
  //   link: 'https://car-2-rho.vercel.app/',
  // },
];

export default portfolioData;
