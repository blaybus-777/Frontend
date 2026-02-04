import React from 'react';

/**
 * Theme Integration Demo
 * 
 * This component demonstrates how to use the Figma-extracted styles with Tailwind CSS.
 * 
 * Naming Convention:
 * - Special characters and spaces are converted to hyphens.
 * - All lowercase.
 * - e.g. "Foundation /Blue/blue-3" -> "bg-foundation-blue-3"
 * - e.g. "Bold/16" -> "text-bold-16"
 */
const ThemeDemo: React.FC = () => {
  return (
    <div className="p-10 space-y-8 bg-foundation-gray-gray-2 min-h-screen">
      <section>
        <h2 className="text-2xl font-bold mb-4">Typography Demo</h2>
        <div className="space-y-4">
          <p className="font-bold text-2xl">ExtraBold/32 The quick brown fox</p>
          <p className="font-semibold text-xl">SemiBold/28 The quick brown fox</p>
          <p className="font-bold text-xl">Bold/18 The quick brown fox</p>
          <p className="font-bold text-xl">Body Strong The quick brown fox</p>
          <p className="font-bold text-xl">Body Base The quick brown fox</p>
          <p className="font-bold text-xl">
            Regular/16 with Gray-8 color
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Color Demo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-foundation-blue-blue-12 text-white rounded-lg">
            Blue-12 (Primary)
          </div>
          <div className="p-4 bg-foundation-blue-blue-5 text-white rounded-lg">
            Blue-5
          </div>
          <div className="p-4 bg-foundation-black-bg text-white rounded-lg">
            Black BG
          </div>
          <div className="p-4 bg-white border border-foundation-gray-gray-5 text-foundation-black-text rounded-lg">
            White with Gray-5 Border
          </div>
           <div className="p-4 bg-m3-sys-light-error text-white rounded-lg">
            Error Color
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Font Family Check</h2>
        <p className="font-pretendard text-xl">Pretendard Font Test</p>
        <p className="font-inter text-xl">Inter Font Test</p>
      </section>
    </div>
  );
};

export default ThemeDemo;
