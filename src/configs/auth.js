module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || 'defaults',
        expiresIn: "1d"
    }
};