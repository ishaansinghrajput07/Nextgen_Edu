export default function TermsConditions() {
  return (
    <section className="pt-24 md:pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using NextGen.
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
              Welcome to NextGen
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              By accessing or using our website, you agree to comply with and
              be bound by these Terms and Conditions. Please read them carefully
              before using our platform and services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Services Provided
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              NextGen helps students explore universities and apply for
              admissions to their preferred institutions. We facilitate the
              application process and provide educational guidance, however we
              do not guarantee admission, acceptance, scholarships, visas, or
              any specific outcome.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              User Responsibilities
            </h2>

            <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                Provide accurate and truthful information during registration
                and applications.
              </li>

              <li>
                Maintain the confidentiality of your account credentials.
              </li>

              <li>
                Comply with all applicable laws, regulations, and university
                policies.
              </li>

              <li>
                Ensure submitted documents and information are authentic and
                valid.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Payment and Fees
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              Any applicable service fees, consultation fees, or admission
              processing charges must be paid in full as specified. Payments are
              non-refundable unless explicitly stated otherwise by NextGen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Intellectual Property
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              All content available on this website, including text, graphics,
              logos, images, designs, software, and branding, is the property
              of NextGen and protected by applicable intellectual property laws.
              Unauthorized reproduction, distribution, or use is strictly
              prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Limitation of Liability
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              NextGen shall not be held liable for decisions made based on
              information provided through the platform. Admission approvals,
              scholarship awards, visa approvals, or academic outcomes are
              determined solely by respective institutions and authorities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Third-Party Links
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              Our website may contain links to third-party websites or services.
              We do not control or endorse these external sites and are not
              responsible for their content, privacy practices, or policies.
              Accessing such websites is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Privacy Policy
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              By using our website, you consent to the collection and use of
              information in accordance with our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Modifications
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              NextGen reserves the right to modify, update, or replace these
              Terms and Conditions at any time without prior notice. Changes
              become effective immediately upon publication on this website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Governing Law
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              These Terms and Conditions shall be governed and interpreted in
              accordance with the laws of India. Any disputes arising from the
              use of this platform shall be subject to the jurisdiction of
              Indian courts.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              By using our website, you acknowledge that you have read,
              understood, and agreed to these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}