const postModel = require("../models/post.model")
const userModel = require("../models/user.model")



module.exports.createPostController = async (req, res) => {




    const { media, caption } = req.body

    if (!media) {
        return res.status(400).json({ message: "media is required" })
    }

    if (!caption) {
        return res.status(400).json({ message: "caption is required" })
    }

    const newPost = await postModel.create({
        media,
        caption
    })

    await userModel.findByIdAndUpdate(req.user._id, {
        $push: {
            posts: newPost._id
        }
    })

    res.status(201).json(newPost)


}