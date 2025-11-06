import React from 'react';
import { Link } from 'react-router-dom';
import { FaMale, FaFemale } from 'react-icons/fa';

export default function Services() {
  const sections = [
    {
      title: 'Female Services',
      icon: <FaFemale className="text-purple-500 text-2xl" />,
      items: [
        { to: '/services/female/hair', title: 'Hair', subtitle: 'Cuts, color & styling' },
        { to: '/services/female/makeup', title: 'Makeup', subtitle: 'Bridal & party looks' },
        { to: '/services/female/waxing', title: 'Waxing', subtitle: 'Face, body & bikini' },
        { to: '/services/female/manicure-pedicure', title: 'Manicure & Pedicure', subtitle: 'Nail care & polish' },
        { to: '/services/female/bridal', title: 'Bridal', subtitle: 'Complete bridal packages' },
      ],
    },
    {
      title: 'Male Services',
      icon: <FaMale className="text-purple-500 text-2xl" />,
      items: [
        { to: '/services/male/hair', title: 'Hair', subtitle: 'Cuts & styling' },
        { to: '/services/male/facial', title: 'Facial', subtitle: 'Skin treatments' },
        { to: '/services/male/beard-trim', title: 'Beard Trim', subtitle: 'Shaping & grooming' },
        { to: '/services/male/manicure-pedicure', title: 'Manicure & Pedicure', subtitle: 'Hand & foot care' },
        { to: '/services/male/bridal', title: 'Groom Bridal', subtitle: 'Groom packages' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Explore All Services</h1>
          <p className="text-gray-600 mt-2">Browse our full range of salon services and pick what suits you best.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((sec) => (
            <section key={sec.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                {sec.icon}
                <h2 className="text-xl font-semibold">{sec.title}</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {sec.items.map((it) => (
                  <Link
                    key={it.to}
                    to={it.to}
                    className="p-3 rounded-lg border hover:shadow-md hover:bg-purple-50 transition flex items-start gap-3"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{it.title}</div>
                      <div className="text-xs text-gray-500">{it.subtitle}</div>
                    </div>
                    <div className="text-purple-500 font-semibold">View</div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/booking" className="inline-block px-6 py-3 bg-purple-500 text-white rounded">Book an Appointment</Link>
        </div>
      </div>
    </div>
  );
}
