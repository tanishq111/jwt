require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/routes');
const connectDB = require('./db');

const app = express();
app.use(express.json());

    
app.use('/api/auth', authRoutes);

// app.use('*', (req, res) => {``
//     res.status(404).json({ message: 'Route not found' });
// }   );
        
// 1st connect to the database then create server
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
});