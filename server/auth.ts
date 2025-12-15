import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { type Express } from "express";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export function setupAuth(app: Express) {
    const sessionSettings: session.SessionOptions = {
        secret: process.env.SESSION_SECRET || "super_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
        store: new MemoryStore({
            checkPeriod: 86400000, // prune expired entries every 24h
        }),
    };

    app.set("trust proxy", 1);
    app.use(session(sessionSettings));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            const adminUsername = process.env.ADMIN_USERNAME || "admin";
            const adminPassword = process.env.ADMIN_PASSWORD;

            if (!adminPassword) {
                return done(new Error("ADMIN_PASSWORD not set in environment"));
            }

            if (username === adminUsername && password === adminPassword) {
                return done(null, { id: 1, username: adminUsername, isAdmin: true });
            } else {
                return done(null, false, { message: "Incorrect username or password." });
            }
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });
}
