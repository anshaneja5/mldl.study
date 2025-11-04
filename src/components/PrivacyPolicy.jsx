import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Privacy Policy
            </h1>

            <div className="space-y-8">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Welcome to mldl.study ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-medium mb-3">2.1 Personal Information</h3>
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className={`list-disc list-inside mb-4 ml-4 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>Contact us through email or other communication channels</li>
                    <li>Subscribe to our newsletters or updates</li>
                    <li>Participate in surveys or feedback forms</li>
                  </ul>

                  <h3 className="text-xl font-medium mb-3">2.2 Usage Information</h3>
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    We automatically collect certain information about your device and usage of our website, including:
                  </p>
                  <ul className={`list-disc list-inside mb-4 ml-4 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>IP address and location information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>We use the collected information for the following purposes:</p>
                  <ul className={`list-disc list-inside mb-4 ml-4 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>To provide and maintain our website</li>
                    <li>To improve our content and user experience</li>
                    <li>To communicate with you about updates or changes</li>
                    <li>To analyze usage patterns and trends</li>
                    <li>To ensure the security and integrity of our website</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking Technologies</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party services you use.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Depending on your location, you may have the following rights regarding your personal information:</p>
                  <ul className={`list-disc list-inside mb-4 ml-4 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>The right to access your personal information</li>
                    <li>The right to rectify inaccurate information</li>
                    <li>The right to erase your personal information</li>
                    <li>The right to restrict processing</li>
                    <li>The right to data portability</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Email:</strong> anshanejaa@gmail.com
                    </p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <strong>GitHub:</strong> <a href="https://github.com/anshaneja5/mldl.study" className="text-blue-500 hover:underline">https://github.com/anshaneja5/mldl.study</a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </>
  );
};

export default PrivacyPolicy;
