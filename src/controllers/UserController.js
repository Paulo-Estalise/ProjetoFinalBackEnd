import UserDTO from '../../dto/UserDTO.js';

export const getCurrentUser = (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.json(userDTO);
};