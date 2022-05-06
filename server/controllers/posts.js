import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const { balanceMin, balanceMax, cardsMin, cardsMax, mortgage, city } = req.query
        let filters = {}

        if (balanceMin && balanceMax) {
            filters.$and = [
                { balance: { $gt: balanceMin } },
                { balance: { $lt: balanceMax } }
            ]
        } else if (balanceMin) {
            filters.balance = { $gt: balanceMin }
        } else if (balanceMax) {
            filters.balance = { $lt: balanceMax }
        }

        if (cardsMin && cardsMax) {
            filters.$and = [
                { numCreditCards: { $gt: cardsMin } },
                { numCreditCards: { $lt: cardsMax } }
            ]
        } else if (cardsMin) {
            filters.numCreditCards = { $gt: cardsMin }
        } else if (cardsMax) {
            filters.numCreditCards = { $lt: cardsMax }
        }

        if (mortgage) {
            filters.haveMortgage = { $eq: mortgage }
        }
        
        if (city) {
            filters.city = { $eq: city }
        }
        
        const postMessages = async () => {
            if (Object.keys(req.query).length) return await PostMessage.find(filters)
            return await PostMessage.find();
        }

        res.status(200).json(await postMessages());
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCities = async (req,res) => {
    try{
        const cities = await PostMessage.distinct('city')
        res.status(200).json(cities)
    }catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { balance, city, clientName, haveMortgage, numCreditCards, selectedFile } = req.body;

    const newPostMessage = new PostMessage({ clientName, city, balance, haveMortgage, numCreditCards, selectedFile })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { clientName, city, balance, haveMortgage, numCreditCards, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { clientName, city, balance, haveMortgage, numCreditCards, selectedFile, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}


export default router;
