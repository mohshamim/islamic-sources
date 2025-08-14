import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  HelpCircle,
  FileText,
  Music,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Heart,
  Globe,
  Shield,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    content: [
      { name: "Articles", href: "/articles", icon: BookOpen },
      { name: "Posts", href: "/posts", icon: FileText },
      { name: "Questions", href: "/questions", icon: HelpCircle },
      { name: "Media", href: "/media", icon: Music },
    ],
    categories: [
      { name: "Fiqh", href: "/category/fiqh" },
      { name: "Aqeedah", href: "/category/aqeedah" },
      { name: "Hadith", href: "/category/hadith" },
      { name: "Tafsir", href: "/category/tafsir" },
      { name: "Seerah", href: "/category/seerah" },
      { name: "General", href: "/category/general" },
    ],
    resources: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "FAQ", href: "/faq" },
      { name: "Support", href: "/support" },
    ],
    social: [
      { name: "Twitter", href: "#", icon: Twitter },
      { name: "Facebook", href: "#", icon: Facebook },
      { name: "Instagram", href: "#", icon: Instagram },
      { name: "YouTube", href: "#", icon: Youtube },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto container-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Islamic Sources
                </h3>
                <p className="text-xs text-gray-400 -mt-1">
                  Knowledge & Wisdom
                </p>
              </div>
            </Link>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted platform for authentic Islamic knowledge, guided by
              the methodology of the Salaf (righteous predecessors).
            </p>

            <div className="flex space-x-3">
              {footerLinks.social.map((social) => (
                <Link key={social.name} href={social.href}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Content</h4>
            <ul className="space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Categories
            </h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Resources</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    href={resource.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <h5 className="font-medium text-white">Newsletter</h5>
              <p className="text-sm text-gray-300 mb-3">
                Stay updated with latest Islamic knowledge
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-200"
                />
                <Button size="sm" className="bg-primary hover:shadow-lg">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto container-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">
                © {currentYear} Islamic Sources. All rights reserved.
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for the Ummah</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Available worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
