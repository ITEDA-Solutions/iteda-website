import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Facebook, Instagram } from "lucide-react";
import { getSiteSettings } from "@/lib/payload-api";

const Footer = async () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ];

  // Get social platform icons
  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'email':
        return Mail;
      default:
        return Mail; // Default fallback
    }
  };

  let siteSettings;
  try {
    siteSettings = await getSiteSettings();
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    // Fallback to default values
    siteSettings = {
      contactEmail: 'info@itedasolutions.com',
      socialLinks: [
        { platform: 'email', url: 'mailto:info@itedasolutions.com' }
      ]
    };
  }

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold text-text">ITEDA Solutions</h3>
            <p className="text-sm text-text-light">
              Transforming agriculture with innovative IoT solutions for a
              sustainable future.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-text">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-light hover:text-primary hover:no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-text">Connect With Us</h3>
            <div className="mb-4">
              <p className="text-sm text-text-light">
                Email: <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-primary">{siteSettings.contactEmail}</a>
              </p>
            </div>
            <div className="flex gap-4">
              {siteSettings.socialLinks.map((social, index) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.platform}
                    className="text-text-light transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-text-light">
          <p>
            © {currentYear} ITEDA Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;