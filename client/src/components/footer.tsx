import { Github, Linkedin, Twitter, Dribbble, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="icon"
                asChild
                data-testid={`link-social-${link.label.toLowerCase()}`}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>

          <a
            href="mailto:ndohadaviz@gmail.com"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-email"
          >
            <Mail className="h-4 w-4" />
            ndohadaviz@gmail.com
          </a>

          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Nexus Software Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
