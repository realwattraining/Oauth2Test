const express  = require("express");
const cors     = require("cors");
const passport =require("passport");
const FacebookStrategy =require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys  = require("../config")
const chalk =require("chalk");


let user = {};

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

// Facebook Strategy
passport.use(new FacebookStrategy({
        clientID: keys.FACEBOOK.clientID,
        clientSecret: keys.FACEBOOK.clientSecret,
        callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }));


// Google Strategy
passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE.clientID,
        clientSecret: keys.GOOGLE.clientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }));





// initialize express
const app = express();
app.use(cors());
app.use(passport.initialize());


//Create funxction rederic to Profile facebook
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/profile");
    });


// Create function rederic to Profile Google
app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
app.get("/auth/google/callback",
    passport.authenticate("google"),
        (req, res) => {
            res.redirect("/profile");
        });



app.get("/user", (req, res) => {
    console.log("getting user data!");
    res.send(user);
});

app.get("/auth/logout", (req, res) => {
    console.log("logging out!");
    user = {};
    res.redirect("/");
});


const PORT =5000;
app.listen(PORT)
//     https.createServer(credentials, app).listen(443, () => {
//         console.log('HTTPS Server running on port 443');
//     });
//     http.createServer(function (req, res) {
//         res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//         res.end();
//     }).listen(80);
// } else if (process.env.NODE_ENV === "development") {
//     app.listen(3000);
// }
