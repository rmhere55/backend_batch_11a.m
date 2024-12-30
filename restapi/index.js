// // Importing dependencies
// const express = require('express');
// const fs = require('fs');
// const mongoose = require('mongoose');
// const users = require('./MOCK_DATA.json');

// const app = express();
// const port = 3000;

// // Connecting to MongoDB
// mongoose.connect('mongodb://localhost:27017/practice-app-1')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// // Define Mongoose schema and model
// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   gender: {
//     type: String
//   }
// }, {timestamps:true});
// const User = mongoose.model('User', userSchema);

// // Middleware
// app.use(express.json()); // For parsing JSON bodies
// app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

// app.use((req, res, next) => {
//   const logMessage = `\n${Date.now()} : ${req.method}: ${req.path}\n`;
//   fs.appendFile('log.txt', logMessage, (err) => {
//     if (err) {
//       console.error('Failed to write to log file:', err);
//     }
//     next();
//   });
// });

// // API Endpoints
// app.get('/api/users', async (req, res) => {
//   try {
//     const allUsers = await User.find([]);
//     return res.json(allUsers);
//   } catch (err) {
//     return res.status(400).json({ error: 'Failed to fetch users' });
//   }
// });
// // console.log('Users array:', users);
// app.get('/api/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     // console.log('Request params:', req.params);
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     return res.json(user);
//   } catch (err) {
//     return res.status(400).json({ error: 'Failed to fetch user' });
//   }
// });

// app.post('/api/user', async (req, res) => {
//   try {
//     const { firstName, lastName, email, gender } = req.body;
//     // console.log('Request body:', req.body);
//     // Create and save the new user in MongoDB
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       gender
//     });
//     const savedUser = await newUser.save();

//     // Add the user to MOCK_DATA.json for local use
//     users.push({ ...savedUser._doc, id: users.length + 1 });
//     fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users, null, 2));

//     return res.json({ status: 'success', user: savedUser });
//   } catch (err) {
//     console.error('Error creating user:', err);
//     return res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// app.put('/api/user/:id', async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // Return the updated document
//       runValidators: true // Validate before saving
//     });
//     if (!updatedUser) return res.status(404).json({ error: 'User not found' });
//     return res.json({ status: 'success', user: updatedUser });
//   } catch (err) {
//     console.error('Error updating user:', err);
//     return res.status(500).json({ error: 'Failed to update user' });
//   }
// });

// app.delete('/api/user/:id', async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ error: 'User not found' });
//     return res.json({ status: 'success', user: deletedUser });
//   } catch (err) {
//     console.error('Error deleting user:', err);
//     return res.status(500).json({ error: 'Failed to delete user' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const users = require('./MOCK_DATA.json');

const app = express();
const port = 3000;

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/practice-app-2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use((req, res, next) => {
  const logMessage = `\n${Date.now()} : ${req.method}: ${req.path}\n`;
  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
    next();
  });
});

// Seed the database with mock data if necessary
const seedDatabase = async () => {
  try {
    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
      console.log('No users found in the database. Seeding with mock data...');
      await User.insertMany(users);
      console.log('Database successfully seeded with mock data.');
    } else {
      console.log('Users already exist in the database. Skipping seeding.');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

// Call seedDatabase once the connection is established
mongoose.connection.once('open', async () => {
  await seedDatabase();
});

// API Endpoints
app.get('/api/users', async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.json(allUsers);
  } catch (err) {
    return res.status(400).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const { firstName, lastName, email, gender } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      gender
    });
    const savedUser = await newUser.save();

    return res.json({ status: 'success', user: savedUser });
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    return res.json({ status: 'success', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/user/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    return res.json({ status: 'success', user: deletedUser });
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
