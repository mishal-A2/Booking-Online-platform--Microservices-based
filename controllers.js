const { user_create, find_user_by_mail } = require("./models");

const register_new_user = async (req, res) => {
  const { name, email, password } = req.body;
  
  try 
  {
    const user = await user_create(name, email, password);
    res.status(201).json(user);
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};

const find_user = async (req, res) => {
  try 
  {
    const user = await find_user_by_mail(req.params.email);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } 
  catch (error)
  {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register_new_user, find_user };
