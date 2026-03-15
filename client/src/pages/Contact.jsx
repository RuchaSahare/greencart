import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields!");
      return;
    }

   
    console.log("Contact Form Submitted:", formData);

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 py-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        We'd love to hear from you! Fill out the form below or reach us via contact info.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
      
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="6"
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>

          <button
            type="submit"
            className="bg-primary text-white py-3 rounded hover:bg-primary-dull transition font-medium"
          >
            Send Message
          </button>
        </form>

        <div className="flex flex-col gap-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-1">Email</h3>
            <p>greencart@gmail.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">Address</h3>
            <p>123 Main Street, Pune, Maharashtra, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;