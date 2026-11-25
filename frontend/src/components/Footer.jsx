
import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Navigation Links
    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Find Jobs", href: "/jobs" },
        { name: "Browse", href: "/browse" },
    ];

    // Social Media Links with SVG Icons
    const socialLinks = [
        {
            name: "Facebook",
            href: "https://facebook.com",
            color: "hover:bg-[#1877F2]",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.17 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.57v1.89h2.8l-.45 2.9h-2.35V22c4.78-.76 8.44-4.91 8.44-9.93z" />
                </svg>
            ),
        },
        {
            name: "Instagram",
            href: "https://instagram.com",
            color: "hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            color: "hover:bg-[#0A66C2]",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 17.5V9.5H5.67V17.5H8.34ZM7 8.35A1.55 1.55 0 1 0 7 5.25A1.55 1.55 0 0 0 7 8.35ZM18.33 17.5V13.1C18.33 10.75 17.08 9.65 15.42 9.65C14.08 9.65 13.48 10.39 13.15 10.91V9.5H10.49C10.52 10.37 10.49 17.5 10.49 17.5H13.15V13.04C13.15 12.8 13.17 12.56 13.24 12.39C13.43 11.91 13.87 11.41 14.61 11.41C15.58 11.41 15.97 12.15 15.97 13.23V17.5H18.33Z" />
                </svg>
            ),
        },
        {
            name: "X (Twitter)",
            href: "https://x.com",
            color: "hover:bg-black",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H22L14.9 10.1L23.3 22H16.7L11.5 14.7L5.1 22H2L9.6 13.3L1.5 2H8.3L13 8.7L18.9 2ZM17.8 20H19.5L7.1 3.9H5.3L17.8 20Z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="relative overflow-hidden bg-slate-950 text-gray-300 border-t border-slate-800">

            {/* Decorative Background */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative container mx-auto px-6 lg:px-12 pt-16 pb-8">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="space-y-5">

                        <a href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="w-6 h-6"
                                >
                                    <rect x="3" y="7" width="18" height="14" rx="2" />
                                    <path d="M8 7V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M3 12h18M10 12v2h4v-2" />
                                </svg>
                            </div>

                            <span className="text-2xl font-bold tracking-tight text-white">
                                Job<span className="text-blue-500">Hunt</span>
                            </span>
                        </a>

                        <p className="text-sm leading-7 text-gray-400 max-w-xs">
                            Discover opportunities, connect with top employers,
                            and take the next step in your professional journey.
                            Your dream career starts here.
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Your next opportunity awaits.
                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-base mb-6">
                            Quick Links
                        </h3>

                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-all duration-300"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-500 group-hover:scale-150 transition-all" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-white font-semibold text-base mb-6">
                            Get In Touch
                        </h3>

                        <p className="text-sm text-gray-400 leading-7 mb-5">
                            Have a question, suggestion, or need help?
                            We'd love to hear from you.
                        </p>

                        <a
                            href="mailto:support@jobhunt.com"
                            className="group inline-flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300"
                        >
                            {/* Gmail SVG */}
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                                <svg viewBox="0 0 24 24" className="w-6 h-6">
                                    <path fill="#4285F4" d="M2 6.5V18a2 2 0 0 0 2 2h2V8.5L2 6.5Z" />
                                    <path fill="#34A853" d="M18 20h2a2 2 0 0 0 2-2V6.5l-4 2V20Z" />
                                    <path fill="#FBBC04" d="M18 8.5V20h2a2 2 0 0 0 2-2V6.5l-4 2Z" />
                                    <path fill="#EA4335" d="M2 6.5 12 14l10-7.5V6a2 2 0 0 0-3.2-1.6L12 9.5 5.2 4.4A2 2 0 0 0 2 6v.5Z" />
                                    <path fill="#C5221F" d="M2 6.5 6 8.5V20H4a2 2 0 0 1-2-2V6.5Z" />
                                </svg>
                            </div>

                            <div>
                                <span className="block text-xs text-gray-500 mb-1">
                                    Email us at
                                </span>
                                <span className="text-sm text-gray-200 font-medium group-hover:text-blue-400 transition-colors">
                                    kishankesri2002@gmail.com
                                </span>
                            </div>

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="w-4 h-4 ml-auto text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                            >
                                <path d="M7 17 17 7M7 7h10v10" />
                            </svg>
                        </a>

                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white font-semibold text-base mb-6">
                            Connect With Us
                        </h3>

                        <p className="text-sm text-gray-400 leading-7 mb-5">
                            Follow us on social media to stay updated
                            with the latest jobs and career opportunities.
                        </p>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    title={social.name}
                                    className={`w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800 text-gray-400 ${social.color} hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
                                >
                                    <span className="w-5 h-5">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>

                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 my-12" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                        © {currentYear} Job Hunt. All rights reserved.
                    </p>

                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                        Made with
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 mx-1 text-green-500"
                        >
                            <path d="M3 17l6-6 4 4 8-8" />
                            <path d="M15 7h6v6" />
                        </svg>
                        for your career success.
                    </div>

                    <a
                        href="#top"
                        className="text-xs sm:text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300"
                    >
                        Back to top ↑
                    </a>

                </div>

            </div>
        </footer>
    );
};

export default Footer;