import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: '❌ Unauthorized'
            });
        }
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decode;
        next();
    }
    catch (e) {
        console.error(`\n AUTH ERROR: ${ e.message }`);
        res.status(401).json({
            message: '❌ Something went wrong with authentication',
            error: e.message
        });
    }
};

export default authMiddleware