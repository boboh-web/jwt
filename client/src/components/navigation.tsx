import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/hooks/use-auth";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/" || location.startsWith("/project/");
    return location === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 relative flex items-center justify-between">
        {/* Left: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={`text-sm font-medium ${isActive(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground"
                  }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Center: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer" data-testid="link-logo">
              <img
                src="/nsl-logo.png"
                alt="NSL Logo"
                className="h-16 w-auto object-contain transition-transform duration-200 ease-in-out hover:scale-105 hover:opacity-95 mix-blend-multiply dark:mix-blend-screen"
              />
              <span className="hidden lg:inline-block text-xl font-bold tracking-tight">
                Nexus Software Limited
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2"
              data-testid="link-admin"
            >
              <Settings className="h-4 w-4" />
              Admin
            </Button>
          </Link>
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-2"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm font-medium ${isActive(link.href)
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-nav-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/admin">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-admin-mobile"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            </Link>
            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                onClick={() => {
                  logoutMutation.mutate();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  );
}
