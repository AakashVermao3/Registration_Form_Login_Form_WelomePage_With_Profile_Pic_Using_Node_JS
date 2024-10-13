
// const multer = require('multer');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../../uploads'));
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage });

// exports.registerUser = [
//     upload.single('profilePic'),
//     async (req, res) => {
//         const { firstName, lastName, dateOfBirth, email, password } = req.body;
//         const profilePic = req.file.filename;
//         try {
//             const user = new User({ firstName, lastName, dateOfBirth, email, password, profilePic });
//             await user.save();
//             res.status(201).redirect('/login.html');
//         } catch (err) {
//             res.status(400).send(err.message);
//         }
//     }
// ];

// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).send('Email is not registered');
        
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).send('Invalid Password');
        
//         res.status(200).redirect(`/welcome.html?userId=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}&dateOfBirth=${user.dateOfBirth.toISOString().split('T')[0]}&password=${encodeURIComponent(password)}&profilePic=${user.profilePic}`);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };

// exports.updateUser = async (req, res) => {
//     const userId = req.params.id;
//     const updates = req.body;

//     try {
//         const user = await User.findByIdAndUpdate(userId, updates, { new: true });
//         if (!user) return res.status(404).send('User not found');
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };



const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

exports.registerUser = [
    upload.single('profilePic'),
    async (req, res) => {
        const { firstName, lastName, dateOfBirth, email, password } = req.body;
        const profilePic = req.file.filename;
        try {
            const user = new User({ firstName, lastName, dateOfBirth, email, password, profilePic });
            await user.save();
            res.status(201).redirect('/login.html');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
];

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Email is not registered');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid Password');
        
        res.status(200).redirect(`/welcome.html?userId=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}&dateOfBirth=${user.dateOfBirth.toISOString().split('T')[0]}&password=${encodeURIComponent(password)}&profilePic=${user.profilePic}`);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) return res.status(404).send('User not found');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateProfilePic = [
    upload.single('profilePic'),
    async (req, res) => {
        const userId = req.params.id;
        const profilePic = req.file.filename;

        try {
            const user = await User.findByIdAndUpdate(userId, { profilePic }, { new: true });
            if (!user) return res.status(404).send('User not found');
            res.status(200).json({ profilePic: user.profilePic });
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }
];
