function authMiddleware(req, res, next) {
    const user = req.user; // Supondo que o usuário já foi definido pela estratégia de autenticação
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user; // Retém informações do usuário após a autenticação
    next();
}

function adminMiddleware(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

function userMiddleware(req, res, next) {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

module.exports = { authMiddleware, adminMiddleware, userMiddleware };
