export const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js and Tailwind CSS",
    slug: "getting-started-nextjs-tailwind",
    excerpt: "Learn how to set up a modern web development environment with Next.js and Tailwind CSS for creating responsive websites.",
    content: `
# Getting Started with Next.js and Tailwind CSS

Next.js and Tailwind CSS are a powerful combination for building modern web applications. In this guide, I'll walk you through setting up a project with these technologies and explain some of their key benefits.

## What is Next.js?

Next.js is a React framework that provides features like server-side rendering, static site generation, API routes, and more out of the box. It simplifies the development process while enhancing performance and SEO.

## What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. Instead of pre-designed components, it provides low-level utility classes that let you build completely custom designs.

## Setting Up Your Project

Let's get started by creating a new Next.js project with Tailwind CSS:

1. Create a new Next.js app:
\`\`\`bash
npx create-next-app my-app
cd my-app
\`\`\`

2. Install Tailwind CSS and its dependencies:
\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

3. Configure your template paths in tailwind.config.js:
\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

4. Add the Tailwind directives to your globals.css file:
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

5. Start your development server:
\`\`\`bash
npm run dev
\`\`\`

## Building Your First Component

Now let's create a simple component using Tailwind CSS. Create a new file called \`components/Card.js\`:

\`\`\`javascript
export default function Card({ title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
\`\`\`

You can then use this component in any of your pages:

\`\`\`javascript
import Card from '../components/Card';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Next.js + Tailwind CSS Site</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          title="Getting Started" 
          description="Learn the basics of Next.js and Tailwind CSS."
        />
        <Card 
          title="Advanced Features" 
          description="Explore more advanced concepts and techniques."
        />
        <Card 
          title="Deployment" 
          description="Deploy your application to production."
        />
      </div>
    </div>
  );
}
\`\`\`

## Conclusion

Next.js and Tailwind CSS provide a powerful foundation for modern web development. Next.js gives you performance and developer experience benefits, while Tailwind CSS allows for rapid UI development with complete design flexibility.

As you continue to build with these technologies, you'll discover even more features and techniques to enhance your web applications.
    `,
    author: "Antony",
    date: "2023-06-15",
    tags: ["Next.js", "Tailwind CSS", "Web Development", "React"],
    image: "/blog/nextjs-tailwind.jpg"
  },
  {
    id: 2,
    title: "Building a REST API with Node.js and Express",
    slug: "building-rest-api-nodejs-express",
    excerpt: "A comprehensive guide to creating a RESTful API using Node.js, Express, and MongoDB with best practices for authentication and error handling.",
    content: `
# Building a REST API with Node.js and Express

Creating a RESTful API is a fundamental skill for modern web developers. In this guide, I'll walk you through building a robust API with Node.js, Express, and MongoDB.

## Setting Up the Project

First, let's initialize our project and install the necessary dependencies:

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon
\`\`\`

Create a basic folder structure:

\`\`\`bash
mkdir controllers models routes middleware config
touch server.js .env
\`\`\`

## Setting Up the Server

Let's create our server configuration in \`server.js\`:

\`\`\`javascript
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
\`\`\`

## Database Connection

Create a database connection in \`config/db.js\`:

\`\`\`javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
\`\`\`

## Creating Models

Let's create a simple user model in \`models/userModel.js\`:

\`\`\`javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Implementing Routes and Controllers

Create user routes in \`routes/userRoutes.js\`:

\`\`\`javascript
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
\`\`\`

And implement the controllers in \`controllers/userController.js\`:

\`\`\`javascript
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

module.exports = { registerUser, loginUser, getUserProfile };
\`\`\`

## Authentication Middleware

Create an authentication middleware in \`middleware/authMiddleware.js\`:

\`\`\`javascript
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

module.exports = { protect };
\`\`\`

## Environment Variables

Don't forget to set up your \`.env\` file:

\`\`\`
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/myapi
JWT_SECRET=yoursecretkey
\`\`\`

## Running the API

Update your \`package.json\` scripts:

\`\`\`json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
\`\`\`

Then run your API with:

\`\`\`bash
npm run dev
\`\`\`

## Conclusion

This guide covers the basics of building a REST API with Node.js, Express, and MongoDB. The implementation includes user authentication with JWT, error handling, and proper API structuring.

As you continue to develop your API, consider adding features like:

- Rate limiting
- Advanced validation
- Documentation with Swagger
- Testing with Jest
- Logging with Winston

Building a well-structured API is crucial for modern web applications, and the patterns shown here provide a solid foundation for your development needs.
    `,
    author: "Antony",
    date: "2023-07-20",
    tags: ["Node.js", "Express", "API", "MongoDB", "Backend"],
    image: "/blog/nodejs-api.jpg"
  },
  {
    id: 3,
    title: "Mastering React Hooks: A Comprehensive Guide",
    slug: "mastering-react-hooks",
    excerpt: "Learn how to leverage React Hooks to write cleaner, more efficient functional components that can handle complex state and side effects.",
    content: `
# Mastering React Hooks: A Comprehensive Guide

React Hooks revolutionized how we write React components by allowing us to use state and other React features without writing classes. In this guide, I'll walk you through the most important hooks and how to use them effectively.

## Introduction to Hooks

Introduced in React 16.8, Hooks let you "hook into" React state and lifecycle features from function components. They solve many problems that developers faced with class components, including complex components becoming hard to understand, difficulties in reusing stateful logic, and the confusion of how \`this\` works in JavaScript.

## The Basic Hooks

### useState

The \`useState\` hook lets you add state to functional components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable "count" with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

You can use the state hook multiple times in a single component:

\`\`\`jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // ...
}
\`\`\`

### useEffect

The \`useEffect\` hook lets you perform side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

#### Controlling when effects run

You can control when effects run by providing a dependency array:

\`\`\`jsx
// Runs on every render
useEffect(() => {
  console.log('I run on every render');
});

// Runs only on first render (componentDidMount)
useEffect(() => {
  console.log('I run only on the first render');
}, []);

// Runs when count changes
useEffect(() => {
  console.log('I run when count changes');
}, [count]);
\`\`\`

#### Cleanup

Effects can return a function that cleans up after them:

\`\`\`jsx
useEffect(() => {
  // Subscribe to something
  const subscription = someAPI.subscribe();
  
  // Cleanup function (runs before the component unmounts)
  return () => {
    subscription.unsubscribe();
  };
}, []);
\`\`\`

### useContext

The \`useContext\` hook lets you subscribe to React context without introducing nesting:

\`\`\`jsx
import React, { useContext } from 'react';

// Create a context
const ThemeContext = React.createContext('light');

function ThemedButton() {
  // Use the context
  const theme = useContext(ThemeContext);
  
  return (
    <button className={\`btn \${theme}\`}>
      I'm styled by theme context!
    </button>
  );
}

// Provider in a parent component
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}
\`\`\`

## Additional Hooks

### useReducer

\`useReducer\` is usually preferable to \`useState\` when you have complex state logic:

\`\`\`jsx
import React, { useReducer } from 'react';

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  // Initialize state with useReducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
\`\`\`

### useCallback

\`useCallback\` returns a memoized callback that only changes if one of its dependencies changes:

\`\`\`jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // This function only gets recreated when count changes
  const handleClick = useCallback(() => {
    console.log(\`Button clicked, count: \${count}\`);
  }, [count]);

  return <ChildComponent onClick={handleClick} />;
}

// React.memo prevents unnecessary renders if props haven't changed
const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});
\`\`\`

### useMemo

\`useMemo\` returns a memoized value that only recalculates when dependencies change:

\`\`\`jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ a, b }) {
  const [otherState, setOtherState] = useState(0);
  
  // This expensive calculation only runs when a or b change
  const result = useMemo(() => {
    console.log('Computing expensive result...');
    return a * b * 1000000000;
  }, [a, b]);

  return (
    <div>
      <p>Result: {result}</p>
      <button onClick={() => setOtherState(otherState + 1)}>
        Update other state (doesn't trigger recalculation)
      </button>
    </div>
  );
}
\`\`\`

### useRef

\`useRef\` lets you create a mutable reference that persists across renders:

\`\`\`jsx
import React, { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  // Create a ref
  const inputRef = useRef(null);

  // Function to focus the input
  const focusInput = () => {
    inputRef.current.focus();
  };

  // Focus input on mount
  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
\`\`\`

## Custom Hooks

One of the most powerful features of hooks is that you can create your own to extract component logic into reusable functions:

\`\`\`jsx
import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Using the custom hook
function PostsList() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Rules of Hooks

There are two important rules to follow when using hooks:

1. **Only Call Hooks at the Top Level**: Don't call hooks inside loops, conditions, or nested functions.
2. **Only Call Hooks from React Functions**: Call hooks from React function components or custom hooks, not regular JavaScript functions.

To help enforce these rules, you can use the ESLint plugin for React Hooks.

## Conclusion

React Hooks have transformed how we write React components, making it easier to reuse stateful logic and reason about component behavior. By mastering hooks, you'll be able to write more concise, maintainable React code.

Remember that hooks are completely opt-in and 100% backwards-compatible, so you can adopt them gradually in your codebase. Start by converting simple components and gradually work your way up to more complex ones.

The most important hooks to master first are \`useState\` and \`useEffect\`, as they cover the majority of use cases. Then, explore more specialized hooks like \`useContext\`, \`useReducer\`, \`useCallback\`, and \`useMemo\` as your needs grow.
    `,
    author: "Antony",
    date: "2023-08-10",
    tags: ["React", "JavaScript", "Web Development", "Hooks"],
    image: "/blog/react-hooks.jpg"
  }
];