import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import useDarkMode from './useDarkMode';

const TermsOfUse = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <Helmet>
        <title>Terms of Use | mldl.study</title>
        <meta name="description" content="Terms of Use for mldl.study." />
      </Helmet>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Terms of Use
          </h1>
          <div className={`prose dark:prose-invert lg:prose-xl mx-auto mt-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p className="text-sm mb-8">Last Updated: November 2025</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using mldl.study (&quot;the Website&quot;), you accept and agree to be bound by these Terms of Use. 
              If you do not agree to these terms, please do not use the Website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
            <p>
              mldl.study is a free educational platform that provides curated learning resources, roadmaps, and materials 
              for Machine Learning, Deep Learning, and Artificial Intelligence. The service includes:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Interactive learning roadmaps for ML/DL topics</li>
              <li>Curated video content and educational resources</li>
              <li>Progress tracking features stored locally in your browser</li>
              <li>Question banks and practice materials</li>
              <li>Research paper recommendations</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Use License</h2>
            <p>
              Permission is granted to access and use the Website for personal, non-commercial educational purposes. 
              This license does not include:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Modifying or copying the Website&apos;s materials without permission</li>
              <li>Using the materials for commercial purposes</li>
              <li>Attempting to decompile or reverse engineer any software on the Website</li>
              <li>Removing any copyright or proprietary notations from the materials</li>
              <li>Transferring the materials to another person or mirroring on another server</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Educational Purpose</h2>
            <p>
              All content on this Website is provided for educational purposes only. The roadmaps, resources, and 
              materials are curated to help learners navigate their journey in ML/DL, but we make no guarantees about:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>The completeness or accuracy of the content</li>
              <li>Career outcomes or employment opportunities</li>
              <li>Certification or academic credit</li>
              <li>The availability of linked external resources</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. External Links and Resources</h2>
            <p>
              The Website contains links to external resources, including YouTube videos, articles, and other educational 
              platforms. These links are provided for convenience, and we do not:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Control or endorse the content of external websites</li>
              <li>Take responsibility for the availability or accuracy of external resources</li>
              <li>Guarantee that external links will remain functional</li>
              <li>Assume liability for any harm or damages from using external resources</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. User Conduct</h2>
            <p>You agree not to use the Website to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Transmit any harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to the Website or its systems</li>
              <li>Interfere with or disrupt the Website&apos;s functionality</li>
              <li>Collect or harvest information about other users</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            <p>
              The Website&apos;s design, structure, and organization are protected by intellectual property rights. 
              The curated content, roadmaps, and original materials are either:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Owned by mldl.study</li>
              <li>Licensed from third parties</li>
              <li>Linked from publicly available educational resources</li>
            </ul>
            <p>
              All linked content (videos, articles, papers) remains the property of their respective owners and 
              is subject to their own terms of use.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimer of Warranties</h2>
            <p>
              The Website and its content are provided &quot;as is&quot; without warranties of any kind, either express or implied. 
              We do not warrant that:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>The Website will be error-free or uninterrupted</li>
              <li>Defects will be corrected</li>
              <li>The Website is free of viruses or harmful components</li>
              <li>The results from using the Website will meet your expectations</li>
              <li>The information provided is complete, accurate, or current</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, mldl.study shall not be liable for any direct, indirect, 
              incidental, consequential, or special damages arising from:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Use or inability to use the Website</li>
              <li>Loss of data or progress stored in local storage</li>
              <li>Reliance on information provided on the Website</li>
              <li>Errors, omissions, or inaccuracies in the content</li>
              <li>Third-party content or external links</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. User-Generated Content</h2>
            <p>
              If the Website allows user contributions or feedback in the future, you grant mldl.study a non-exclusive, 
              royalty-free, perpetual license to use, modify, and display such content for educational purposes.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Modifications to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Website at any time without 
              notice. We may also update these Terms of Use periodically. Your continued use of the Website after 
              changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Privacy</h2>
            <p>
              Your use of the Website is also governed by our Privacy Policy. Please review our Privacy Policy to 
              understand how we handle information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">13. Governing Law</h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with applicable laws, without 
              regard to conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">14. Open Source</h2>
            <p>
              This project is open source and welcomes contributions. By contributing to the project, you agree 
              that your contributions will be licensed under the same license as the project.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">15. Contact Information</h2>
            <p>
              If you have questions about these Terms of Use, please contact us through our GitHub repository at{' '}
              <a 
                href="https://github.com/anshaneja5/mldl.study" 
                target="_blank" 
                rel="noopener noreferrer"
                className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
              >
                github.com/anshaneja5/mldl.study
              </a>
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">16. Severability</h2>
            <p>
              If any provision of these Terms of Use is found to be unenforceable or invalid, that provision shall 
              be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain 
              in full force and effect.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Acknowledgment</h2>
            <p>
              By using mldl.study, you acknowledge that you have read, understood, and agree to be bound by these 
              Terms of Use.
            </p>
          </div>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </>
  );
};

export default TermsOfUse;