import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Haa-Meem",
  description:
    "Learn how returns and exchanges work at Haa-Meem for Pakistani fashion orders.",
};

const sections = [
  {
    title: "1. Overview",
    body: [
      "At Haa-Meem, we want you to love what you order. This Return & Exchange Policy explains when you can return or exchange products bought from our online store.",
      "Please read this policy carefully before placing an order. By completing checkout, you agree to these terms.",
    ],
  },
  {
    title: "2. Eligibility window",
    body: [
      "Return or exchange requests must be made within 3 days of delivery.",
      "Contact us on WhatsApp (Chat button on the website) with your Order ID, clear photos of the product and packaging, and the reason for return/exchange.",
      "Requests after 3 days of delivery are generally not accepted, except where the product has a manufacturing defect confirmed by us.",
    ],
  },
  {
    title: "3. What can be returned or exchanged",
    body: [
      "Items must be unused, unwashed, and in original condition with tags and packaging intact.",
      "We accept returns/exchanges for wrong size (subject to stock), wrong item sent, damaged item on arrival, or clear manufacturing defect.",
      "Please check size charts on the product page before ordering. Fit preference alone may not qualify if the correct size was delivered as ordered.",
    ],
  },
  {
    title: "4. What cannot be returned or exchanged",
    body: [
      "Products that have been worn, washed, altered, stained, or damaged after delivery.",
      "Items without original tags or packaging (unless the issue is a verified defect and we advise otherwise).",
      "Sale / clearance items marked as final sale (if stated on the product).",
      "Jewelry, handbags / purses, and personal-care style accessories may have limited or no return eligibility for hygiene reasons — we will confirm case by case.",
      "Customized or specially requested pieces.",
    ],
  },
  {
    title: "5. How to request a return or exchange",
    body: [
      "Message us on WhatsApp within 3 days of delivery.",
      "Share: Order ID, product name, size/color, photos of the issue, and whether you want a return or exchange.",
      "Our team will review and confirm approval, pickup/drop instructions, and next steps.",
      "Do not send products back without our written (WhatsApp) approval.",
    ],
  },
  {
    title: "6. Exchange process",
    body: [
      "If an exchange is approved and the requested size/color is in stock, we will arrange the replacement.",
      "If the preferred option is out of stock, we may offer another available product of equal value or another solution agreed with you.",
      "Price difference on higher-value exchanges must be paid before dispatch. Lower-value exchanges may be adjusted as agreed.",
    ],
  },
  {
    title: "7. Refunds",
    body: [
      "Orders are Cash on Delivery. Approved returns are typically handled as store credit, exchange, or refund method agreed with you after we receive and inspect the item.",
      "Refund timelines depend on courier return confirmation and our quality check — we will update you on WhatsApp.",
      "Shipping / courier charges (if any were paid or incurred for return) may be non-refundable unless the return is due to our error (wrong or defective item).",
    ],
  },
  {
    title: "8. Damaged or wrong items",
    body: [
      "If you receive a damaged, defective, or incorrect product, contact us within 24–48 hours of delivery with photos/video of the parcel and item.",
      "We will prioritize replacement or a suitable remedy after verification.",
    ],
  },
  {
    title: "9. Nationwide delivery notes",
    body: [
      "Please inspect the parcel in front of the courier when possible. If the outer packaging is badly damaged, note it with the courier and inform us immediately.",
      "Delivery timelines (for example ready-to-wear / unstitched working days) are estimates and may vary by city and courier conditions.",
    ],
  },
  {
    title: "10. Contact",
    body: [
      "For returns and exchanges, use the WhatsApp Chat button on haa-meem.pk (or our website) and share your Order ID.",
      "You can also reach us through the social links in the footer or visit our About page.",
    ],
  },
];

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Support
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Return & Exchange Policy
          </h1>
          <p className="mt-3 text-muted-foreground">
            Last updated: October 13, 2026
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Simple rules for returns and exchanges so your Haa-Meem order
            experience stays clear and fair.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-t pt-8 text-sm">
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Privacy Policy
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
