const postModel = require("../models/post.model")


module.exports.feedController = async (req, res) => {
    const posts = await postModel.aggregate(
        [
            {
              '$lookup': {
                'from': 'users', 
                'localField': '_id', 
                'foreignField': 'posts', 
                'as': 'author'
              }
            }, {
              '$unwind': {
                'path': '$author'
              }
            }
          ]
    )

    res.status(200).json({
        message: "post fetched successfully",
        posts
    })

}