class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.email = user.email; // Adicione outros campos que você considera necessários
    }
}

module.exports = UserDTO;
