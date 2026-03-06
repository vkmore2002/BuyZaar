import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Simulate form submission (replace with actual API call)
    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      setSubmitMessage(
        "Thank you for your message! We'll get back to you soon.",
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#FBF7F3] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#7A2E0E] text-center mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#7A2E0E] mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-6">
                We'd love to hear from you! Whether you have questions about our
                products, need support, or just want to say hello, feel free to
                reach out.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#FF8A65] rounded-full flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">00000000</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#FF8A65] rounded-full flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">vivekmore153@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#FF8A65] rounded-full flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet
                    <br />
                    consectetur adipiscing elit
                    <br />
                    sed do eiusmod tempor incididunt
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-[#7A2E0E] mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-[#7A2E0E] mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent transition"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent transition"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent transition resize-vertical"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {submitMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    submitMessage.includes("error")
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF8A65] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-[#7A2E0E] mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                How do I track my order?
              </h3>
              <p className="text-gray-600 text-sm">
                You can track your order status in your account dashboard under
                "My Orders".
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                What is your return policy?
              </h3>
              <p className="text-gray-600 text-sm">
                We accept returns within 30 days of purchase. Items must be in
                original condition.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Do you ship internationally?
              </h3>
              <p className="text-gray-600 text-sm">
                Currently, we only ship within the country. International
                shipping coming soon!
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                How can I change my order?
              </h3>
              <p className="text-gray-600 text-sm">
                Contact us immediately after placing your order, and we'll help
                you modify it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
