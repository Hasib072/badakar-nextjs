"use client"
// src/components/ContactForm.tsx
import { useState, FormEvent } from 'react';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusClass, setStatusClass] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');
    setStatusClass('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('message', form.message);
    formData.append('form-name', 'contact');

    try {
      const response = await fetch('/?no-cache=1', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatusMessage('Thank you! Your message has been sent.');
        setStatusClass('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('Oops! Something went wrong. Please try again.');
      setStatusClass('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md" id="contact">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Netlify Hidden Inputs */}
        <input type="hidden" name="form-name" value="contact" />

        {/* Honeypot Field for Spam Protection */}
        <div className="hidden">
          <label>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${
            isSubmitting ? 'cursor-not-allowed bg-gray-400' : ''
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {statusMessage && (
          <p className={`mt-2 text-center ${statusClass === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {statusMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;