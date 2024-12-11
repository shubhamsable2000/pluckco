import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#563e98] to-[#000000] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              About Pluck
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              For Businesses
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/partner"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Advertise with Us
                </Link>
              </li>
              <li>
                <Link
                  href="/business-support"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Business Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              For Influencers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/explore"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Explore Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  View Campaigns
                </Link>
              </li>
              <li>
                <Link
                  href="/influencer-guide"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Influencer Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Connect with Us
            </h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/pluck"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook />
              </Link>
              <Link
                href="https://instagram.com/pluck"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram />
              </Link>
              <Link
                href="https://twitter.com/pluck"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Pluck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
