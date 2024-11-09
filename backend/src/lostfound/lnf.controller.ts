import {Item} from './lnfmodel';
import { Request, Response } from "express";

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { itemName, owner, imageURL } = req.body;
    const newItem = new Item({      
        itemName,
        owner,
        imageURL,
        lost: true,
        found: false, 
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
    try {
    const badges = await Item.find({ lost: true });
    res.status(200).json(badges);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


