// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   FaInstagram,
//   FaFacebookF,
//   FaYoutube,
//   FaTiktok,
// } from "react-icons/fa";

// import { Button } from "@/components/ui/button";


// export function Footer() {
//   const footerLinks = {
//     Shop: ["Shalwar Kameez", "Kurta", "Kurta / Top", "Trouser"],
//     Company: ["About Us", "Contact", "Careers"],
//     Support: ["Shipping Info", "Returns", "Size Guide", "FAQ"],
//   };

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="grid gap-10 lg:grid-cols-4">
//           {/* Brand */}
//           <div>
//             <Link href="/" className="text-2xl font-bold tracking-wider">
//               Haa-Meem
//             </Link>
//             <p className="mt-4 text-sm text-gray-400">
//               Premium Pakistani stitched clothes for every occasion. Elegant Kurta / Top, unstitched fabrics, and ready-to-wear collections.
//             </p>
//           </div>

//           {/* Links */}
//           {Object.entries(footerLinks).map(([title, links]) => (
//             <div key={title}>
//               <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">{title}</h4>
//               <ul className="space-y-3">
//                 {links.map((link) => (
//                   <li key={link}>
//                     <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
//                       {link}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//           {/* Social Media */}
//           <div>
//             <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Follow Us</h4>
//             <div className="flex gap-4">
//               <a href="https://www.facebook.com/profile.php?id=100063791665269" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
//                 <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//                 </svg>
//               </a>
//               <a href="https://www.instagram.com/haameem.pk/" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
//                 <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2" />
//                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
//                   <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2" />
//                 </svg>
//               </a>
//               <a href="https://www.tiktok.com/@haa_meem" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok">
//                 <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path d="M12.548.655a.448.448 0 0 0-.679 0L8.025 3.462 12.85 8.03a.455.455 0 0 0 .311-.863l-4.624-4.37 1.846-2.007a.454.454 0 0 0 .189-.744L6.821 1.26a.448.448 0 0 0-.628 0L.146 5.786a.448.448 0 0 0 0 .678l5.693 6.04-1.85 2.006a.454.454 0 0 0-.189.745l4.87 4.814a.455.455 0 0 0 .311.862L.148 17.54a.448.448 0 0 0 0 .679l6.048 6.05a.448.448 0 0 0 .678 0l5.875-6.236 1.847 2.008a.454.454 0 0 0 .744.188l4.815-4.871a.455.455 0 0 0-.863-.311l-4.625 4.371 1.847-2.007a.454.454 0 0 0 .189-.744L17.456 23a.448.448 0 0 0 .628 0l6.37-6.76a.448.448 0 0 0 0-.678l-5.876-6.04 1.85-2.007a.454.454 0 0 0 .189-.744l-4.87-4.815a.455.455 0 0 0-.311-.862L23.85 6.464a.448.448 0 0 0 0-.679z" />
//                 </svg>
//               </a>
//               <a href="https://www.youtube.com/@haameem-xb6ro" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
//                 <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path d="M23.498 6.186a3.166 3.166 0 0 0-.255-1.349C22.64 3.516 18.91 2.5 12 2.5c-6.886 0-10.642 1.021-11.243 2.337a3.17 3.17 0 0 0-.255 1.349C.49 7.514-.01 11.23-.01 12s.5 4.486 1.492 5.814a3.17 3.17 0 0 0 .255 1.349C5.114 20.484 8.871 21.5 12 21.5c6.886 0 10.642-1.021 11.243-2.337a3.166 3.166 0 0 0 .255-1.349C23.51 16.486 24 12.77 24 12s-.5-4.486-1.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Stay Updated</h4>
//             <p className="mb-4 text-sm text-gray-400">Get product drops, styling tips, and exclusive offers.</p>
//             <form className="flex gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-white focus:outline-none"
//               />
//               <Button variant="secondary" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
//                 Subscribe
//               </Button>
//             </form>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
 
//           © {new Date().getFullYear()} Haa-Meem | All Rights Reserved
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  const footerLinks = {
    Shop: [
      { label: "Winter Collection", href: "/products?category=Winter Collection" },
      { label: "Cotton Elegant Embroidery Suit", href: "/products?category=Cotton Elegant Embroidery Suit" },
      { label: "Jeans / Trousers", href: "/products?category=Jeans / Trousers" },
      { label: "Fancy Wear", href: "/products?category=Fancy Wear" },
      { label: "Jewelry", href: "/products?category=Jewelry" },
      { label: "Handbags / Purse", href: "/products?category=Handbags / Purse" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/about" },
      { label: "Shop", href: "/products" },
    ],
    Support: [
      { label: "Shipping Info", href: "/products" },
      { label: "Returns", href: "/about" },
      { label: "Size Guide", href: "/products" },
      { label: "FAQ", href: "/about" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-wider"
            >
              Haa-Meem
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Premium Pakistani stitched clothes since 2020.
              Shop Winter Collection, Cotton Elegant Embroidery Suit, Jeans / Trousers, Fancy Wear,
              Jewelry and Handbags with Haa-Meem.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                {title}
              </h4>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Follow Us
            </h4>

            <div className="flex gap-4">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100063791665269"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  className="size-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/haameem.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    rx="5"
                    ry="5"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    strokeWidth="2"
                  />
                  <line
                    x1="17.5"
                    x2="17.51"
                    y1="6.5"
                    y2="6.5"
                    strokeWidth="2"
                  />
                </svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@haa_meem" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white" aria-label="TikTok" > <FaTiktok className="size-5" /> </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@haameem-xb6ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 transition-colors hover:text-white"
                aria-label="YouTube"
              >
                <svg
                  className="size-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.166 3.166 0 0 0-.255-1.349C22.64 3.516 18.91 2.5 12 2.5c-6.886 0-10.642 1.021-11.243 2.337a3.17 3.17 0 0 0-.255 1.349C.49 7.514-.01 11.23-.01 12s.5 4.486 1.492 5.814a3.17 3.17 0 0 0 .255 1.349C5.114 20.484 8.871 21.5 12 21.5c6.886 0 10.642-1.021 11.243-2.337a3.166 3.166 0 0 0 .255-1.349C23.51 16.486 24 12.77 24 12s-.5-4.486-1.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Stay Updated
            </h4>

            <p className="mb-4 text-sm text-gray-400">
              Get product drops, styling tips, and exclusive offers.
            </p>

            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-white focus:outline-none"
              />

              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Haa-Meem | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
