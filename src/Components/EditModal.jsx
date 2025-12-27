import { useState, useEffect } from "react";
import axios from "axios";

export default function EditModal({ isOpen, event, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    date: "",
    image: null, // URL or File
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const CLOUD_NAME = "dqronp5bo";
  const UPLOAD_PRESET = "food_uploads";

  useEffect(() => {
    if (event) {
      setFormData(event);
      setPreview(event.image || null);
    }
  }, [event]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let finalImage = formData.image;
      if (formData.image instanceof File) {
        const form = new FormData();
        form.append("file", formData.image);
        form.append("upload_preset", UPLOAD_PRESET);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          form
        );
        finalImage = res.data.secure_url;
      }

      await onConfirm({ ...formData, image: finalImage });
      onClose();
    } catch (err) {
      console.error("Edit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
        {loading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4 text-green-600">Edit Event</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Music">Music</option>
            <option value="Film">Film</option>
            <option value="Art">Art</option>
            <option value="Sport">Sport</option>
            <option value="Theatre">Theatre</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (MAD)"
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />

          {/* Image Upload */}
          <div className="border-2 border-dashed border-green-400 rounded-xl p-4 text-center">
            <input
              type="file"
              name="image"
              id="edit-image"
              className="hidden"
              onChange={handleChange}
            />
            <label
              htmlFor="edit-image"
              className="cursor-pointer text-green-600 font-semibold"
            >
              {formData.image instanceof File
                ? formData.image.name
                : preview
                ? "Change Image"
                : "Upload Image"}
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover mx-auto rounded"
              />
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
