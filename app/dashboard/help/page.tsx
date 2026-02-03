"use client";

export default function HelpPage() {
  const faqs = [
    {
      id: 1,
      question: "How do I place a gift order?",
      answer:
        "To place a gift order, navigate to the Gift Orders section and select the items you want to gift. Follow the checkout process and provide the recipient's details. You can add a personalized message if you wish.",
    },
    {
      id: 2,
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is placed, you can track it from the Gift Orders page. You'll be able to see the current status and estimated delivery date.",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital payment methods including PayPal and Apple Pay.",
    },
    {
      id: 4,
      question: "How do I change my account information?",
      answer:
        "You can update your account information by going to the Accounts section. Here you can change your email, password, and other personal details.",
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all gift items. If you're not satisfied with your purchase, please contact our support team.",
    },
    {
      id: 6,
      question: "How do I reset my password?",
      answer:
        "Go to the Accounts section and click on 'Change Password'. Enter your current password and then set your new password. Make sure to use a strong password.",
    },
  ];

  const contactChannels = [
    {
      icon: "📧",
      title: "Email Support",
      description: "support@giftly.com",
      time: "Response within 24 hours",
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Available in the help section",
      time: "9 AM - 6 PM EST",
    },
    {
      icon: "📱",
      title: "Phone Support",
      description: "+1 (800) GIFTLY-1",
      time: "Mon-Fri, 9 AM - 5 PM EST",
    },
    {
      icon: "❓",
      title: "Knowledge Base",
      description: "Browse helpful articles",
      time: "Available 24/7",
    },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Help & Support
      </h1>

      {/* Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contactChannels.map((channel, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-4">{channel.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {channel.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {channel.description}
            </p>
            <p className="text-xs text-emerald-600 font-semibold">
              {channel.time}
            </p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer group"
            >
              <summary className="flex justify-between items-center font-semibold text-gray-900 dark:text-white text-lg hover:text-emerald-600 transition">
                {faq.question}
                <span className="text-2xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Still need help? Contact us
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="How can we help you?"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-600 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Category
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-600 transition">
              <option>Select a category</option>
              <option>Order Issue</option>
              <option>Account Problem</option>
              <option>Payment Issue</option>
              <option>General Question</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Message
            </label>
            <textarea
              rows={6}
              placeholder="Describe your issue in detail..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-600 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
