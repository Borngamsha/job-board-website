const register = (req, res) => {
    res.json({
        message: "Register route working"
    });
};

const login = (req, res) => {
    res.json({
        message: "Login route working"
    });
};

module.exports = {
    register,
    login
};