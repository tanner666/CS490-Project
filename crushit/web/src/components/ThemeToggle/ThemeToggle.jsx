import React, { useState } from 'react';

export const ThemeToggle = () => {
    const [isLightTheme, setIsLightTheme] = useState(true);

    return (
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
            <span className="text-gray-600 font-medium mr-4">Light Theme</span>
            <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in bg-gray-300 rounded-full">
                <input 
                    type="checkbox" 
                    name="toggle" 
                    id="toggle" 
                    checked={isLightTheme}
                    onChange={e => setIsLightTheme(e.target.checked)}
                    className="toggle-checkbox absolute w-5 h-5 rounded-full bg-white shadow-md appearance-none top-0.5 left-0.5 transition-transform duration-200 focus:outline-none"
                />
            </div>
            <span className="text-gray-600 font-medium ml-4">Dark Theme</span>
            <style jsx>{`
                .toggle-checkbox:checked {
                    transform: translateX(100%);
                }
            `}</style>
        </div>
    );
}

export default ThemeToggle;
