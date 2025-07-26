require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/routes');

const app = express();
app.use(express.json());

    
app.use('/api/auth', authRoutes);

// app.use('*', (req, res) => {``
//     res.status(404).json({ message: 'Route not found' });
// }   );
        

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});