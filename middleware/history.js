const { Types } = require("mongoose");
const User = require("../Models/Users/Users");

const addHistory = async (req, res) => {
    const orderObj = req.body
    
    const data = req?.user;
    const user = await User.findByIdAndUpdate(
        { _id: data?.id },
        { $push: { history: orderObj }}
    );
    res.status(200).json({ message: "added to history successfully" });
};

const getHistory = async (req, res) => {
    const { id } = req.user;
    const data = await User.aggregate([
        { $match: { _id: new Types.ObjectId(id) } },
        {
            $lookup: {
                from: "users",
                localField: "history",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            newPrice: 1,
                            image: 1,
                        },
                    },
                ],
                as: "data",
            },
        },
    ]);
    return res.status(200).json(data);
}

module.exports = { getHistory, addHistory };