"use client";
import { addItem } from "@/lib/lnfActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddItemPage() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      setSelectedFile(file); // Update state with the selected file
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUploading(true);
      if (!itemName || !selectedFile) return;

      if (selectedFile.size > 5 * 1024 * 1024) {
        throw new Error("Avatar size must be 5mb or less");
      }

      const newItem = {
        itemName,
        description,
      };

      await addItem(newItem, selectedFile);
      router.push("/lostfound");
    } catch (error) {
      alert(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-2xl mb-4">Report Lost Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="item_name"></label>
        <input
          type="text"
          id="item_name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          className="w-full p-2 rounded bg-slate-200 border border-gray-900 text-black"
          required
        />
        <label htmlFor="description"></label>
        <input
          type="text"
          value={description}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item"
          className="w-full p-2 rounded bg-slate-200 border border-gray-900 text-black"
          required
        />
        <label htmlFor="image">Add a descriptive image: </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="w-full p-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
