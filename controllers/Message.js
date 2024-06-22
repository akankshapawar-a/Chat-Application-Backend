import Conversation from "../models/conversation.model.js";
import Message from '../models/message.model.js';
import User from "../models/model.User.js";
export const sendMessage=async(req , res)=>{
   try {
    const {message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;

    let conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]},
    })

    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId],
        })
    }

    const newMessage=new Message({
        senderId,
        receiverId,
        message,
    })

    if(newMessage){
          conversation.message.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();
 await Promise.all([conversation.save(), newMessage.save()]);


          res.status(201).json(newMessage);
   } catch (error) {
    console.log("Error in someMessage controller:", error.message);
   }
}


export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("message"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.message;

		res.status(200).json(messages);
	} catch (error) {
        return res.status(500).json({ error:  "Internal server error", errorMessage: error.message });
		// res.status(500).json({ error: "Internal server error" });
	}
};


export const getUserForSidebar=async(req, res)=>{
    try {
        const loggedInUserId=req.user._id;

        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        return res.status(500).json({ error:  "Internal server error", errorMessage: error.message });

    }
}
