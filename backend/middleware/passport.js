require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../config/database-test');


// Logique d'authentification JWT
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) => {
        db.database.User.find({
            where: {
                id: id
            }
            .then((user) => {
                done(null, user);
            })
        })
    })

    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: `${process.env.SECRET}`
    }
    
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        let user = db.database.User.findOne({where: { id: jwt_payload.userId }});
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }));
};