
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import Lottie from 'react-lottie-player';

// Custom hook to fetch lottie JSON from public folder
function useLottieData(path: string) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(path)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, [path]);
  return data;
}

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const contactLottie = useLottieData('/lottie/Contact.json');
  const emailSentLottie = useLottieData('/lottie/Email Sent.json');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          message
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');
      setStatus('success');
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err: any) {
      setError(err?.message || 'Submission failed');
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      {/* Hero Banner */}
      <section className="w-full relative py-12 px-4 flex flex-col items-center justify-center text-center" style={{minHeight: '320px'}}>
        <Image src="/Images/pexels-karola-g-6345304.jpg" alt="Contact Hero Background" fill priority className="object-cover z-0" />
        <div className="absolute inset-0" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Get In Touch</h1>
          <span className="inline-block bg-white text-blue-600 font-semibold px-4 py-1 rounded-full shadow mb-4">WRITE TO US</span>
          <p className="text-white text-lg md:text-xl font-medium mb-2">Please fill out the form below or reach us directly for quotes, questions, or service requests.</p>
        </div>
      </section>

      {/* Main Card Layout */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg mt-[-4rem] p-8 relative z-10">
        {/* Contact Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Let&apos;s Talk!</h2>
          <p className="text-gray-700 mb-6">Get in touch with us using the enquiry form or contact details below.</p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 text-xs text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="consent-comm" className="rounded" /> I agree to receive other communication messages.
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="consent-data" className="rounded" /> I give my consent to Ubuhlebusanda to store my data.
              </label>
            </div>
            <button type="submit" className="w-full py-3 px-6 rounded-md font-extrabold bg-black text-white shadow-lg hover:bg-gray-900 transition uppercase tracking-wide">SEND MESSAGE</button>
      {/* Animated feedback for sending, success, and error */}
      {status === 'sending' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100/60 via-amber-100/40 to-white/80 backdrop-blur-xl">
            <div className="bg-white/95 rounded-3xl shadow-2xl p-10 flex flex-col items-center animate-fade-in" style={{ minWidth: 320, border: 'none' }}>
              <Lottie
                loop={true}
                animationData={contactLottie}
                play
                style={{ width: 140, height: 140, marginBottom: 18 }}
              />
              <div className="w-full border-t-0 mt-4 mb-2"></div>
              <div className="text-2xl font-extrabold text-black tracking-wide mb-1 drop-shadow font-serif">Sending</div>
              <div className="text-sm text-black font-medium">Your message is on its way...</div>
            </div>
          </div>
      )}
      {status === 'success' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-100/60 via-amber-100/40 to-white/80 backdrop-blur-xl">
            <div className="bg-white/95 rounded-3xl shadow-2xl p-10 flex flex-col items-center animate-fade-in" style={{ minWidth: 320, border: 'none' }}>
              <Lottie
                loop={false}
                animationData={emailSentLottie}
                play
                style={{ width: 140, height: 140, marginBottom: 18 }}
              />
              <div className="w-full border-t-0 mt-4 mb-2"></div>
              <div className="text-2xl font-extrabold text-black tracking-wide mb-1 drop-shadow font-serif">Message Sent</div>
              <div className="text-sm text-black font-medium">Thank you for reaching out. We&apos;ll get back to you soon.</div>
            </div>
          </div>
      )}
      {status === 'error' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-400/40 via-pink-300/30 to-yellow-400/30 backdrop-blur-xl">
            <div className="bg-white/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center glass-card animate-fade-in" style={{ border: 'none' }}>
              <svg className="mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="4"/><line x1="8" y1="8" x2="16" y2="16" stroke="#ef4444" strokeWidth="2"/><line x1="16" y1="8" x2="8" y2="16" stroke="#ef4444" strokeWidth="2"/></svg>
              <div className="text-xl font-extrabold text-black tracking-wide mb-2 drop-shadow">{error}</div>
              <div className="text-sm text-black">Please try again or contact us directly.</div>
            </div>
          </div>
      )}
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center gap-6">
          <div className="bg-white rounded-lg p-6 shadow flex flex-col gap-4">
            <h3 className="text-lg font-extrabold text-black mb-2 flex items-center gap-2">
              <EnvelopeIcon className="w-6 h-6 text-black" /> Quick Contact
            </h3>
            <div className="flex items-center gap-2 text-black text-sm mb-2">
              <EnvelopeIcon className="w-5 h-5 text-black" />
              <span className="font-semibold">Email:</span>
              <span className="ml-1">siyanda@ubuhlebusanda.co.za</span>
            </div>
            <div className="flex items-center gap-2 text-black text-sm mb-1">
              <PhoneIcon className="w-5 h-5 text-black" />
              <span className="font-semibold">Phone 1:</span>
              <span className="ml-1">+27 76 425 7905</span>
            </div>
            <div className="flex items-center gap-2 text-black text-sm">
              <PhoneIcon className="w-5 h-5 text-black" />
              <span className="font-semibold">Phone 2:</span>
              <span className="ml-1">+27 63 937 8948</span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow text-xs text-black">
            Ubuhlebusanda Pty Ltd is committed to protecting and respecting your privacy.
          </div>
        </div>
      </section>
    </main>
  );
}
