import React from "react";

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:md-0">
                        <h2 className="text-xl font-bold">Job Hunt</h2>
                        <p className="text-sm">@ 2026 Your Company. All rigths reserved.</p>
                    </div>

                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://facebook.com" className="hover:text-gray-400 transition-transform hover:scale-110" aria-label="Facebook" >
                            <svg className="w-10 h-8" fill="#1877F2" viewBox="0 0 24 24"> <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.17 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.57v1.89h2.8l-.45 2.9h-2.35V22c4.78-.76 8.44-4.91 8.44-9.93z" /></svg>
                        </a>
                        <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
                            <svg className="w-8 h-8" fill="#000000" viewBox="0 0 24 24"> <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.89a4.28 4.28 0 001.32 5.71 4.2 4.2 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.29 4.29 0 01-1.93.07 4.28 4.28 0 004 2.97A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.87 0 12.17-6.52 12.17-12.17 0-.19 0-.39-.01-.58A8.7 8.7 0 0022.46 6z" /></svg>
                        </a>
                        <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="Linkedin">
                            <svg className="w-8 h-8" fill="#0A66C2" viewBox="0 0 24 24"> <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.5 8h4v13h-4V8zm7.5 0h3.8v1.78h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-6.38c0-1.52-.03-3.48-2.12-3.48-2.12 0-2.44 1.65-2.44 3.37V21h-4V8z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer