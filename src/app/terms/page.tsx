import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions governing your use of Gomotion's website and services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto border-x border-dashed pt-5 px-5 lg:px-12 pb-32 ">
      {/* Hero */}
      <section className="reveal flex flex-col gap-8 pt-40 max-w-3xl">
        <span className="self-start text-fuchsia-900 bg-fuchsia-100 px-5 h-10 rounded-full flex items-center justify-center text-sm font-medium tracking-wider uppercase">
          Legal
        </span>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-neue-montreal font-bold leading-[1.2em]">
          Terms &amp; Conditions
        </h1>

        <p className="text-2xl leading-relaxed text-muted-foreground">
          Last updated: 30&nbsp;June&nbsp;2024
        </p>
      </section>

      <section className="reveal flex flex-col gap-10 pt-24 max-w-3xl md:pl-24 text-muted-foreground leading-relaxed [&_h2]:text-primary [&_h2]:font-medium [&_h2]:text-2xl [&_h2]:mb-2">
        {/* 1. Introduction */}
        <div>
          <h2>1. Introduction</h2>
          <p>
            Welcome to{" "}
            <span className="text-primary font-medium">Gomotion</span> (“we”,
            “our”, “us”). These Terms and Conditions (“<strong>Terms</strong>”)
            govern your access to and use of the Gomotion website, products and
            services (collectively, the “<strong>Service</strong>”). By
            accessing or using the Service you agree to be bound by these Terms.
            If you do not agree with any part of the Terms, you may not use the
            Service.
          </p>
        </div>

        {/* 2. Eligibility & Accounts */}
        <div>
          <h2>2. Eligibility & Accounts</h2>
          <p>
            You must be at least 13&nbsp;years old (or the age of majority in
            your jurisdiction) to create an account and use the Service. You are
            responsible for safeguarding your login credentials and for all
            activities that occur under your account.
          </p>
        </div>

        {/* 3. Acceptable Use */}
        <div>
          <h2>3. Acceptable Use</h2>
          <p>
            You agree not to misuse the Service or help anyone else to do so.
            Prohibited activities include but are not limited to: (a) violating
            any applicable laws or regulations; (b) uploading or generating
            content that is unlawful, threatening, hateful, or otherwise
            objectionable; (c) compromising or interfering with the integrity or
            performance of the Service or third-party data; and (d) reverse
            engineering or attempting to extract source code or underlying
            models except as permitted by law.
          </p>
        </div>

        {/* 4. Intellectual Property */}
        <div>
          <h2>4. Intellectual Property</h2>
          <p>
            All intellectual property rights in the Service, including the
            underlying software, models, text, graphics and logos, are owned by
            or licensed to Gomotion. Nothing in these Terms grants you any right
            to use our trademarks or other proprietary material without our
            prior written consent.
          </p>
        </div>

        {/* 5. User Content */}
        <div>
          <h2>5. User Content</h2>
          <p>
            You retain ownership of any prompts, files, or assets you submit to
            the Service (“<strong>User&nbsp;Content</strong>”) as well as the
            outputs you generate (collectively, “
            <strong>Generated&nbsp;Content</strong>”). You grant us a worldwide,
            non-exclusive licence to process your User Content solely for the
            purpose of providing and improving the Service in accordance with
            our Privacy&nbsp;Policy.
          </p>
        </div>

        {/* 6. Subscriptions & Fees */}
        <div>
          <h2>6. Subscriptions & Fees</h2>
          <p>
            Certain features of the Service may require a paid subscription or
            consumption-based credits. All fees are displayed prior to purchase,
            are non-refundable except where required by law, and are charged in
            the currency stated at checkout. You are responsible for any taxes
            associated with your purchases.
          </p>
        </div>

        {/* 7. Disclaimer of Warranties */}
        <div>
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an “as-is” and “as-available” basis. We
            disclaim all warranties, express or implied, including
            merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the Service will be
            uninterrupted, error-free, or completely secure.
          </p>
        </div>

        {/* 8. Limitation of Liability */}
        <div>
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Gomotion shall not be liable
            for any indirect, incidental, special, consequential or punitive
            damages, or any loss of profits or revenues, whether incurred
            directly or indirectly, or any loss of data, use, goodwill or other
            intangible losses resulting from (a) your use of or inability to use
            the Service; (b) any unauthorised access to or use of our servers
            and/or any personal information stored therein; or (c) any content
            obtained from the Service.
          </p>
        </div>

        {/* 9. Termination */}
        <div>
          <h2>9. Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time
            if you violate these Terms or create risk or legal exposure for us.
            Upon termination, all licences granted to you will cease
            immediately.
          </p>
        </div>

        {/* 10. Governing Law & Jurisdiction */}
        <div>
          <h2>10. Governing Law & Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of England & Wales, without regard to conflict of law
            principles. Any dispute arising out of or relating to these Terms
            shall be subject to the exclusive jurisdiction of the courts of
            London, United Kingdom.
          </p>
        </div>

        {/* 11. Changes to These Terms */}
        <div>
          <h2>11. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. If we make material
            changes, we will provide at least 7&nbsp;days’ notice via the
            Service or by other means. Your continued use of the Service after
            the effective date of the revised Terms constitutes acceptance of
            the changes.
          </p>
        </div>

        {/* 12. Contact Us */}
        <div>
          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            <a
              href="mailto:support@gomotion.ai"
              className="text-primary underline ml-1"
            >
              support@gomotion.ai
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
