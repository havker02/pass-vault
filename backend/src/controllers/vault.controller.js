import { Vault } from "../models/vault.model.js"
import { User } from "../models/user.model.js"

const createSecret = async (req, res) => {
  const {url, user, password} = req.body

  if([url, user, password].some((value) => !value || typeof value !== "string" || value.trim() === "")) return res.status(400).json({success: false, message: "Please provide required fields"})

  try {
    const vault = await Vault.create({
      url,
      user,
      password,
      createdBy: req.user?._id
    })

    if (!vault) return res.status(500).json({success: false, message: "Failed to save credentials to vault, Please try again"})

    await User.findByIdAndUpdate(req.user?._id, {
      $push: {vault: vault?._id}
    }, {new: true})
    
    return res.status(201).json({success: true, message: "New secret created successfully", vault})
    
  } catch (error) {
    return res.status(500).json({success: false, message: "Internal server error", error: error.message})
  }
  
}




export {
  createSecret
}