const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if admin already exists
        const adminExists = await User.findOne({ role: 'admin' });

        // Determine role
        const role = adminExists ? 'user' : 'admin';

        // Create a new user with role
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        // Set session
        req.session.userId = newUser._id;

        // Redirect based on role
        if (newUser.role === 'admin') {
            return res.status(200).json({ redirectUrl: '/admin/dashboard' });
        } else {
            return res.status(200).json({ redirectUrl: '/chimudra/dashboard' });
        }
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: err.message });
    }
};


// ✅ Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect('/chimudra/login?error=Invalid email or password');
        }
         // If the user is an admin, force redirect with an alert
        if (user.role === 'admin') {
        return res.redirect('/chimudra/login?adminRedirect=true');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect('/chimudra/login?error=Invalid email or password');
        }
  
        req.session.email = user.email;
        req.session.userId = user._id;
        req.session.role = user.role;
  
        if (user.role === 'admin') {
            res.redirect('admin/dashboard');
        } else {
            res.redirect('/chimudra/dashboard');
        }
    } catch (err) {
        console.error(err);
        return res.redirect('/chimudra/login?error=Server Error');
    }
  };
  
  

// Admin Login Controller

    exports.adminLogin = async (req, res) => {
        const { email, password } = req.body;
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    
        try {
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.redirect('/chimudra/admin/login?error=Invalid email or password');
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.redirect('/chimudra/admin/login?error=Invalid email or password');
            }
    
            if (user.email === ADMIN_EMAIL && user.role === 'admin') {
                req.session.userId = user._id;
                req.session.email = user.email;
                req.session.role = 'admin';
                return res.redirect('/chimudra/admin/dashboard');
            } else {
                return res.redirect('/chimudra/admin/login?error=You are not an admin');
            }
        } catch (err) {
            console.error("Admin Login Error:", err);
            return res.redirect('/chimudra/admin/login?error=Server Error');
        }
    };
    
//logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/chimudra/dashboard'); // Optional fallback
        }
        res.render('pages/logout', { session: {} }); // Renders logout page
    });
};
