import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/ITEDA-Solutions", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/iteda-solutions/", icon: Linkedin },
    { name: "Twitter", href: "https://x.com/ItedaSolutions", icon: Twitter },
    { name: "Email", href: "mailto:itedasolutions@gmail.com", icon: Mail },
  ];

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-b from-white to-green-50/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="animate-fade-in">
            <h3 className="mb-4 text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ITEDA Solutions
            </h3>
            <p className="text-sm text-text-light leading-relaxed">
              Transforming agriculture with innovative IoT solutions for a
              sustainable future.
            </p>
          </div>

          <div className="animate-fade-in animate-delay-100">
            <h3 className="mb-4 text-lg font-bold text-text">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-light hover:text-primary hover:no-underline transition-all hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in animate-delay-200">
            <h3 className="mb-4 text-lg font-bold text-text">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="text-text-light transition-all hover:text-primary hover:-translate-y-1 inline-block"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-text-light animate-fade-in animate-delay-300">
          <p>
            {currentYear} ITEDA Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;