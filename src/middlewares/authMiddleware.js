import jwt from 'jsonwebtoken';

export const requireSignIn = async (req, resizeBy, next) => {
    try {
        const decode = await jwt.verify(req.headers.autorization, process.env.JWT_SECRET)
        next();
    } catch (error) {
        console.log(error)
    }
};