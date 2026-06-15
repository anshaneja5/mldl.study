import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import { Helmet } from 'react-helmet';
import useDarkMode from './useDarkMode';

const PrivacyPolicy = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <Helmet>
        <title>Privacy Policy | mldl.study</title>
        <meta name="description" content="Privacy Policy for mldl.study." />
      </Helmet>

      <AuroraBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="mx-auto w-full max-w-3xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Privacy <span className="text-aurora">Policy</span>
          </h1>
          <div className="glass glass-sheen space-y-4 rounded-3xl p-6 text-soft sm:p-9">
            <p className="text-sm text-faint">Last Updated: November 2025</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">Introduction</h2>
            <p>
              Welcome to mldl.study. We respect your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard information when you use our website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">Information We Collect</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3 text-ink">Local Storage Data</h3>
            <p>
              Our website uses browser local storage to save your learning progress, preferences, and settings. 
              This data is stored locally on your device and is not transmitted to our servers. The information includes:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Your progress on various learning roadmaps and topics</li>
              <li>Dark mode preference</li>
              <li>Bookmarked questions and resources</li>
              <li>Modal dismissal preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-ink">Analytics Data</h3>
            <p>
              We use Google Analytics 4 to understand how visitors use our website. This helps us improve the user experience. 
              Google Analytics may collect:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Pages visited and time spent on pages</li>
              <li>Browser type and device information</li>
              <li>Geographic location (country/city level)</li>
              <li>Referral sources</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Provide and maintain the learning platform functionality</li>
              <li>Track your personal learning progress across sessions</li>
              <li>Understand usage patterns to improve our content and features</li>
              <li>Analyze website performance and user engagement</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">Data Storage and Security</h2>
            <p>
              All user-specific data (progress, preferences) is stored locally in your browser&apos;s local storage. 
              We do not collect, store, or transmit this personal data to our servers. You have full control over this 
              data and can clear it at any time through your browser settings.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">Third-Party Services</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3 text-ink">Google Analytics</h3>
            <p>
              We use Google Analytics 4, which may use cookies to collect anonymous usage data. You can opt-out of 
              Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-ink">External Links</h3>
            <p>
              Our website contains links to external resources, including YouTube videos and other educational content. 
              These third-party websites have their own privacy policies, and we are not responsible for their practices.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Access and review your locally stored data through browser developer tools</li>
              <li>Delete your local data by clearing your browser&apos;s local storage</li>
              <li>Opt-out of analytics tracking through browser settings or extensions</li>
              <li>Use the website without accepting analytics cookies</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">Children&apos;s Privacy</h2>
            <p>
              Our website does not specifically target children under 13. We do not knowingly collect personal 
              information from children. If you believe a child has provided information to us, please contact us 
              so we can take appropriate action.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of any material changes by 
              updating the &quot;Last Updated&quot; date at the top of this policy. Your continued use of the website after 
              such changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-ink">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us through our 
              GitHub repository at{' '}
              <a
                href="https://github.com/anshaneja5/mldl.study"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aurora font-medium hover:opacity-80"
              >
                github.com/anshaneja5/mldl.study
              </a>
            </p>
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </>
  );
};

export default PrivacyPolicy;