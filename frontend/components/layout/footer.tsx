import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, XIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className={cn("bg-black text-white py-8")}>
      <div className="container mx-auto px-4">
        {/* Logo or Branding */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Smokey Contest</h1>
          <p className="text-sm text-gray-400">
            Spicing up your contests since {new Date().getFullYear()}!
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="/about" className="text-sm hover:underline">
            About
          </a>
          <a href="/contact" className="text-sm hover:underline">
            Contact
          </a>
          <a href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            asChild
            variant="ghost"
            className="text-white hover:text-gray-400"
          >
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <XIcon size={20} />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-white hover:text-gray-400"
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon size={20} />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-white hover:text-gray-400"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
          </Button>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Smokey Contest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
