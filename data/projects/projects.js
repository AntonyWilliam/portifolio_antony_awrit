export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    description: "A fully-featured e-commerce platform with product management, cart functionality, user authentication, and payment processing.",
    longDescription: `This project is a complete e-commerce solution built with React, Node.js, and MongoDB. 
    It features a responsive design, product search and filtering, user accounts, shopping cart, checkout process, 
    and integration with payment gateways. Admin users can manage products, categories, and orders through an intuitive dashboard.`,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe API"],
    image: "/projects/ecommerce.jpg",
    demoLink: "https://example.com",
    sourceLink: "https://github.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    slug: "task-management",
    description: "A collaborative task management application that helps teams organize and track projects efficiently.",
    longDescription: `This task management application allows teams to collaborate on projects by creating, assigning, and tracking tasks. 
    Features include project boards, task categories, due dates, file attachments, comments, and progress tracking. 
    The app also provides notifications, reporting, and integrates with calendar applications.`,
    technologies: ["Next.js", "Tailwind CSS", "Firebase", "React DnD", "React Query"],
    image: "/projects/task-manager.jpg",
    demoLink: "https://example.com",
    sourceLink: "https://github.com",
    featured: true
  },
  {
    id: 3,
    title: "Blog Platform",
    slug: "blog-platform",
    description: "A modern blog platform with markdown support, user authentication, comments, and analytics.",
    longDescription: `This blog platform provides writers with a clean, distraction-free writing experience using Markdown. 
    It includes features like drafts, scheduled publishing, categories and tags, SEO tools, and a responsive design that looks great on all devices. 
    Readers can create accounts, follow writers, save articles, and engage through comments.`,
    technologies: ["Vue.js", "Express", "PostgreSQL", "Markdown", "JWT Authentication"],
    image: "/projects/blog.jpg",
    demoLink: "https://example.com",
    sourceLink: "https://github.com",
    featured: false
  },
  {
    id: 4,
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    description: "A weather application that provides real-time forecasts, historical data, and visualization for locations worldwide.",
    longDescription: `This weather dashboard pulls data from multiple weather APIs to provide comprehensive forecasts. 
    Users can search for locations, save favorites, and view detailed information including current conditions, hourly and daily forecasts, 
    precipitation probability, wind speed, humidity, and UV index. The app includes interactive charts and maps for data visualization.`,
    technologies: ["React", "Chart.js", "Weather API", "Leaflet Maps", "Axios"],
    image: "/projects/weather.jpg",
    demoLink: "https://example.com",
    sourceLink: "https://github.com",
    featured: false
  },
  {
    id: 5,
    title: "Fitness Tracker",
    slug: "fitness-tracker",
    description: "A mobile-responsive fitness application for tracking workouts, nutrition, and progress towards health goals.",
    longDescription: `This fitness tracking application helps users maintain an active lifestyle by tracking workouts, nutrition, and progress. 
    Features include custom workout creation, exercise library with instructions, workout scheduling, progress photos, body measurements, 
    weight logging, and goal setting. The nutrition tracker includes meal planning, calorie counting, and macronutrient breakdowns.`,
    technologies: ["React Native", "Redux", "Firebase", "D3.js", "Expo"],
    image: "/projects/fitness.jpg",
    demoLink: "https://example.com",
    sourceLink: "https://github.com",
    featured: false
  },
  {
    id: 6,
    title: "Real-time Chat Application",
    slug: "chat-application",
    description: "A real-time messaging platform with private chats, group conversations, file sharing, and end-to-end encryption.",
    longDescription: `This real-time chat application enables instant communication with features like one-on-one messaging, group chats, 
    file sharing, and read receipts. It includes user profiles, presence indicators (online/offline status), push notifications, 
    message search, and end-to-end encryption for secure communications.`,
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC"],
    image: "/projects/chat.jpg",
    demoLink: "https://example.com",
    sourceLink: "https://github.com",
    featured: false
  }
];