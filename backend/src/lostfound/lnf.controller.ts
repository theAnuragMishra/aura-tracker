import { createSupabaseClient } from "../utils/supabase";
import { Item } from "./lnfmodel";
import jwt from "jsonwebtoken";

export async function AddItem(req: any, res: any) {
  try {
    const { itemName, owner, description, imageURL } = req.body;
    const newItem = new Item({
      itemName,
      owner,
      description,
      imageURL,
    });
    await newItem.save();
    return res.status(201).json(newItem);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function getItems(req: any, res: any) {
  try {
    const items = await Item.find({ found: false });
    return res.status(200).json(items);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function claimItemFind(req: any, res: any) {
  const id = req.body.id;
  // console.log(id);
  const username = req.body.username;
  const item = await Item.findOne({ _id: id });
  if (!item) {
    return res.status(404).send({ message: "item not found" });
  }
  if (item.owner === username)
    return res.status(400).send({ message: "can't claim your own item" });
  // console.log(item);
  if (item?.findClaims.includes(username)) {
    await Item.updateOne({ _id: id }, { $pull: { findClaims: username } });
  } else {
    await Item.updateOne({ _id: id }, { $addToSet: { findClaims: username } });
  }
  return res.status(200).send({ message: "success!" });
}

export async function approveItemFind(req: any, res: any) {
  const item_id = req.body.item_id;
  const approvee = req.body.approvee;
  const username = req.body.username;

  // console.log(item_id, approvee, username);

  if (!item_id || !approvee || !username) {
    return res.status(400).send({ message: "item id and approvee required" });
  }

  const item = await Item.findOne({ _id: item_id });
  if (!item) {
    return res.status(404).send({ message: "non existent item" });
  }

  if (item.owner !== username) {
    return res.status(400).send({ message: "only the owner can approve" });
  }
  try {
    await Item.updateOne(
      { _id: item_id },
      { $set: { found: true, foundBy: approvee } }
    );
  } catch (error) {
    console.error(error);
  }

  const user = req.user;
  const id = user.id;
  const token = jwt.sign(
    { username: approvee },
    process.env.SUPABASE_JWT_SECRET!,
    {
      expiresIn: "10m",
    }
  );
  const supabase = createSupabaseClient(token);

  const { error } = await supabase.rpc("update_aura", { approvee });
  if (error) {
    console.error(error);
  }

  // console.log("done");
  return res.status(200);
}
