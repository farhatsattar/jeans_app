import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="font-semibold">DenimCo</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Minimal premium jeans for everyday wear.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium">Shop</h4>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>Men</li>
            <li>Women</li>
            <li>Skinny</li>
            <li>Baggy</li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="font-medium">Company</h4>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="font-medium">Legal</h4>
          <div className="mt-3 space-y-2 text-muted-foreground">
            <Link href="#">Privacy Policy</Link>
            <br />
            <Link href="#">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
