import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Haa-Meem",
  description:
    "Haa-Meem privacy policy — how we collect, use, and protect your personal information.",
};

const toc = [
  "Introduction",
  "Information Collection",
  "Use of Information",
  "Marketing Updates",
  "Your Rights",
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight uppercase md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: October 13, 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-base font-semibold uppercase tracking-wide text-foreground">
              Table of Content
            </h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              {toc.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-foreground"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div id="introduction">
            <h2 className="text-base font-semibold uppercase tracking-wide text-foreground">
              Introduction
            </h2>
            <div className="mt-3 space-y-3">
              <p>
                Haa-Meem’s top priority is your privacy protection when dealing
                with us. To safeguard your trust, we have a policy that
                recognizes the importance of protecting your personal
                information; explaining what personal information constitutes,
                how we use the information, who has access to your data, and
                what are your rights regarding your personal information.
              </p>
              <p>
                This Privacy Policy does not apply to websites maintained by
                other companies or organizations to which we link and Haa-Meem
                is not responsible for any personal information you submit to
                third parties via our website. Please ensure that you read the
                Privacy Policy of such other companies or organizations before
                submitting your details. Your access and use of our website
                constitute your acceptance of our Privacy Policy and related
                terms.
              </p>
            </div>
          </div>

          <div id="information-collection">
            <h2 className="text-base font-semibold uppercase tracking-wide text-foreground">
              Information Collection
            </h2>
            <p className="mt-3">
              Haa-Meem may collect and use your personal data for the following
              purposes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                For signing up and order processing, your personal contact
                details including name, title, address, email address and
                telephone number are collected.
              </li>
              <li>
                Details of transactions, purchases, Cash on Delivery orders, and
                queries.
              </li>
              <li>
                Correspondence record with you via telephone, WhatsApp,
                messengers, live chat, social media, emails or any other medium.
              </li>
              <li>
                Details of your browsing and visits to the website, and also the
                information regarding the interaction pattern of your device
                with our online store including search, browsing, pages you
                accessed and the links clicked.
              </li>
              <li>
                Auto collection from your device, which comprises of IP address,
                type of device, browser type, operating system, unique device
                identification numbers, geographic location and related
                technical information.
              </li>
              <li>
                Product reviews you submit, including your name, rating,
                comment, and any optional review image.
              </li>
              <li>
                We also use non-personal data such as third-party cookies (and
                tools such as Meta Pixel) to collect statistics to enhance and
                simplify your visit. The cookies used may be both permanent and
                temporary cookies (session cookies). You can erase cookies from
                your computer or mobile device using your browser settings.
              </li>
            </ul>
          </div>

          <div id="use-of-information">
            <h2 className="text-base font-semibold uppercase tracking-wide text-foreground">
              Use of Data &amp; Information
            </h2>
            <p className="mt-3">
              We collect, maintain and use information for the below mentioned
              purposes and ensure that other than these the data is not shared
              for any irrelevant or incompatible purpose.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                To create your personal account on our website (e.g. your name
                and email address, including Google sign-in where used).
              </li>
              <li>
                To process your orders (e.g. your name, address, phone number
                and order details for Cash on Delivery).
              </li>
              <li>
                To be able to send WhatsApp or text message notifications of
                order and delivery status (e.g. your mobile phone number).
              </li>
              <li>
                To be able to send you marketing offers such as newsletters and
                product updates (e.g. your email address, your name, and your
                postal address), where you have opted in.
              </li>
              <li>Disclosing your data to fraud prevention agencies if required.</li>
              <li>
                To be able to analyse your personal data to provide you with
                relevant marketing offers and information (e.g. name, buying
                habits).
              </li>
              <li>
                To operate our store services with trusted providers (e.g.
                hosting, database, image storage, analytics and delivery
                partners).
              </li>
            </ul>
            <div className="mt-3 space-y-3">
              <p>
                We will only keep your data for as long as necessary to carry
                out our services to you or as long as we are required by law.
                After this, your personal data will be deleted. We cannot remove
                your data when there is a legal storage requirement, such as
                bookkeeping rules or when there is a legal ground to keep the
                data, such as an on-going contractual relationship.
              </p>
              <p>
                Non-personal data is used as described above and in other ways
                as permitted by applicable laws, including combining
                non-personal data with personal data. Lastly, we do not sell
                your details to third party marketing companies.
              </p>
            </div>
          </div>

          <div id="marketing-updates">
            <h2 className="text-base font-semibold uppercase tracking-wide text-foreground">
              Marketing Updates
            </h2>
            <div className="mt-3 space-y-3">
              <p>
                We may email or message our users who subscribe to our services
                on a regular basis. For example, we may use your email address
                or phone number to confirm your request, to send you notice of
                orders, information about changes to our products and services,
                and notices and other disclosures as required by law. Generally,
                users cannot opt-out of these transactional communications, but
                they will be primarily informational in nature rather than
                promotional.
              </p>
              <p>
                However, we provide you the opportunity to exercise an opt-out
                choice if you do not want to receive other types of
                communication from us, such as emails or updates regarding new
                services and products offered on the website. The opt-out choice
                may be exercised by contacting us on WhatsApp or through our
                social channels. We will process your unsubscribe as soon as
                possible, but please be aware that in some circumstances you may
                receive a few more messages until the unsubscribe is processed.
              </p>
              <p>
                By using the website and providing your mobile phone number, you
                hereby consent to receive order-related and, where applicable,
                promotional calls and text / WhatsApp messages from or on behalf
                of us at the mobile number that you provide. You understand that
                consent to receiving messages on your mobile device is not a
                condition of purchase and understand that message and data rates
                may apply. Additionally, should you choose to stop receiving
                promotional messages, you can contact us directly either by
                WhatsApp or through our social media.
              </p>
              <div className="rounded-lg border bg-muted/40 p-4 text-foreground">
                <p className="font-medium">Haa-Meem Support</p>
                <p className="mt-2">
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/923014440787"
                    className="underline underline-offset-4"
                  >
                    +92 301 4440787
                  </a>
                </p>
                <p className="mt-1">
                  Instagram:{" "}
                  <a
                    href="https://www.instagram.com/haameem.pk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    @haameem.pk
                  </a>
                </p>
                <p className="mt-3 text-muted-foreground">
                  Use the Chat button on our website for the fastest response.
                </p>
              </div>
            </div>
          </div>

          <div id="your-rights">
            <h2 className="text-base font-semibold uppercase tracking-wide text-foreground">
              Your Rights
            </h2>
            <div className="mt-3 space-y-3">
              <p>
                You have the right to request information about the personal
                data we hold on you. If your data is incorrect, incomplete or
                irrelevant you can ask to have the information corrected or
                removed.
              </p>
              <p>
                If you require more information, please message us on WhatsApp
                at{" "}
                <a
                  href="https://wa.me/923014440787"
                  className="underline underline-offset-4 text-foreground"
                >
                  +92 301 4440787
                </a>{" "}
                or contact Haa-Meem through the social links in our website
                footer.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-t pt-8 text-sm">
          <Link
            href="/about"
            className="underline underline-offset-4 hover:text-foreground"
          >
            About Haa-Meem
          </Link>
          <Link
            href="/returns"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Return &amp; Exchange
          </Link>
          <Link
            href="/products"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
