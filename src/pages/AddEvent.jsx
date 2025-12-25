import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddEvent() {
    
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
        const [event, setEvent] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        date: "",
        image: null
    });
    const [errors, setErrors] = useState({});




    // Cloudinary
    const CLOUD_NAME = "dqronp5bo";
    const UPLOAD_PRESET = "food_uploads";

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
        );
        return res.data.secure_url;
    };




    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEvent({
            ...event,
            [name]: name === "image" ? files[0] : value
        });
        setErrors({ ...errors, [name]: "" });
    };


    const handleValidation = () => {
        const newErrors = {};
        if (!event.name) newErrors.name = "Please enter Event Name";
        if (!event.description) newErrors.description = "Please enter Description";
        if (!event.category) newErrors.category = "Please select Category";
        if (!event.price) newErrors.price = "Please enter Price";
        if (!event.date) newErrors.date = "Please select Event Date";
        if (!event.image) newErrors.image = "Please upload Image";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // عند الضغط على Add Event
    const handleAddClick = () => {
        if (handleValidation()) {
            setShowModal(true); // show modal
        }
    };

    // when you click on add event 
    const handleSubmit = async () => {
        setShowModal(false);
        setLoading(true);
        try {
            const imageUrl = await uploadToCloudinary(event.image);
            const eventData = { ...event, image: imageUrl,price : Number(event.price) };
            await axios.post("https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event", eventData);
                    
            toast.success("Event added successfully",1500);
            setEvent({
                name: "",
                description: "",
                category: "",
                price: "",
                date: "",
                image: null
            });
        } catch (err) {
            toast.error("Error while adding event");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* Loading */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                        <span>Loading...</span>
                    </div>
                </div>
            )}
            {/* Form */}
            <div className="min-h-screen bg-green-50 flex items-center justify-center p-2">
                <form className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-4">
                    <h2 className="text-3xl font-bold text-center text-green-600">Add New Event</h2>

                    {/* Event Name */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Event name"
                            value={event.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500"
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <textarea
                            name="description"
                            placeholder="Event description"
                            value={event.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500"
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                    </div>

                    {/* Category + Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <select
                                name="category"
                                value={event.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500"
                            >
                                <option value="">Category</option>
                                <option value="Music">Music</option>
                                <option value="Art">Art</option>
                                <option value="Sport">Sport</option>
                                <option value="Theatre">Theatre</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <input
                                type="number"
                                name="price"
                                placeholder="Price (MAD)"
                                value={event.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500"
                            />
                            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <input
                            type="date"
                            name="date"
                            value={event.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500"
                        />
                        {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-green-400 rounded-xl p-4 text-center">
                        <input type="file" name="image" id="image" className="hidden" onChange={handleChange} />
                        <label htmlFor="image" className="cursor-pointer text-green-600 font-semibold">
                            {event.image ? event.image.name : "Click to upload image"}
                        </label>
                        {errors.image && <p className="text-sm text-red-500 mt-2">{errors.image}</p>}
                    </div>

                    {/* Add Event Button */}
                    <button
                        type="button"
                        onClick={handleAddClick}
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
                    >
                        Add Event
                    </button>

                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl w-full max-w-sm text-center">
                                <h3 className="text-xl font-semibold mb-4">Confirm add event</h3>
                                <p className="text-gray-600 mb-6">Are you sure you want to add this event?</p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-2 border rounded-lg hover:bg-gray-100"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={handleSubmit} 
                                        className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </>
    );
}
