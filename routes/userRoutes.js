import authMiddleware from "../middlewares/authmiddleware";
import upload from "../middlewares/uploadMiddleware";
import User from "../models/User";

router.post('/upload', authMiddleware, upload.single('profilePicture')), async (req, res) =>{
    try {
        const user = await User.findById(req.user.id);
        user.profilePicture = req.file.path;
        await user.save();

        res.status(200).json({message:'Profile picture updated', user});
    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
};