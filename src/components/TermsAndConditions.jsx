import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const TermsAndConditions = () => {
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
              Terms and Conditions
            </h1>

            <div className="space-y-8">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    By accessing and using mldl.study ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Permission is granted to temporarily download one copy of the materials on mldl.study for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className={`list-disc list-inside mb-4 ml-4 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the Website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The materials on mldl.study are provided on an 'as is' basis. mldl.study makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    In no event shall mldl.study or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on mldl.study, even if mldl.study or a mldl.study authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">5. Accuracy of Materials</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The materials appearing on mldl.study could include technical, typographical, or photographic errors. mldl.study does not warrant that any of the materials on its website are accurate, complete, or current. mldl.study may make changes to the materials contained on its website at any time without notice.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    mldl.study has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by mldl.study of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    mldl.study may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    These terms and conditions are governed by and construed in accordance with the laws of applicable jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    If you have any questions about these Terms and Conditions, please contact us at:
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

export default TermsAndConditions;
