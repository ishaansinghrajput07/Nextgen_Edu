export default function PrivacyPolicy() {
  return (
    <section className="pt-24 md:pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your privacy matters to us. Learn how we collect, use,
            and protect your information.
          </p>
        </div>

        {/* Content Card */}
        <div
          className="
            bg-white
            dark:bg-slate-900
            border
            border-gray-200
            dark:border-slate-700
            rounded-3xl
            p-6
            md:p-12
            shadow-xl
            space-y-10
          "
        >
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Privacy Policy
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              At NextGen, we respect your privacy and are committed
              to protecting your personal information. This Privacy
              Policy explains how we collect, use, and safeguard
              your data when you use our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Information We Collect
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              We may collect personal information such as your name,
              email address, contact number, and educational details
              when you register or apply to universities through our
              platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                To facilitate your university applications and
                admission process.
              </li>

              <li>
                To communicate with you about your account or
                application status.
              </li>

              <li>
                To improve our services and provide personalized
                recommendations.
              </li>

              <li>
                To comply with legal obligations when required.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Data Sharing
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              We do not sell or rent your personal information.
              However, we may share your data with universities
              you apply to, trusted service providers, or as
              required by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Cookies and Tracking
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              We use cookies and similar technologies to enhance
              your experience, understand website usage, and improve
              our services. You can manage cookies through your
              browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Data Security
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              We implement appropriate technical and organizational
              measures to protect your personal data from unauthorized
              access, alteration, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Your Rights
            </h2>

            <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                You have the right to access, update, or delete your
                personal information.
              </li>

              <li>
                You can opt out of receiving promotional communications
                at any time.
              </li>

              <li>
                You may request that we stop processing your data where
                applicable.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Changes to This Policy
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              We may update this Privacy Policy periodically. Any
              changes will be posted on this page, and the updated
              policy will take effect immediately.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              If you have any questions or concerns about this
              Privacy Policy or how we handle your data, please
              contact us at:
            </p>

            <p className="mt-4 text-lg font-semibold text-cyan-500">
              social@nextgen.org
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              By using our website, you consent to the terms outlined
              in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}