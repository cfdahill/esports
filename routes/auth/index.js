const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const passport = require('../../mongo-connector/passport');

// get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======');
	console.log(req.user);
	if (req.user) {
		return res.json({ user: req.user });
	} else {
		return res.json({ user: null });
	}
});

router.get('/login', function(req, res) {
    console.log(req.flash('error'));
    res.send();
});

router.post('/login',	function(req, res, next) {
		console.log(req.body);
		console.log('================');
		next();
	},
	passport.authenticate('local', { 
		failureRedirect: '/login',
	}),
	(req, res) => {
		console.log('POST to /login');
		const user = JSON.parse(JSON.stringify(req.user));
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
	}
);

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy();
		res.clearCookie('connect.sid'); // clean up!
		return res.json({ msg: 'logging you out' });
	} else {
		return res.json({ msg: 'no user to log out!' });
	}
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
	User.findOne({ 'username': username }, (error, userMatch) => {
		if (userMatch) {
			return res.json({
				msg: ("Sorry, already a user with the username: " + username)
			});
    }
		const newUser = new User({
			'username': username,
			'password': password
    });
		newUser.save((err, savedUser) => {
			if (err) {
        console.log(err);
        return res.json(err);
      };
			return res.json(savedUser);
		});
	});
});

module.exports = router;