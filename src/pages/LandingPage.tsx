
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function LandingPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-auto" />
            <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text"></h1>
          </div>
          <nav className="flex gap-4">
            <Link to="/auth">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity">Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 grid place-content-center bg-gradient-to-br from-background to-background/95">
        <div className="container py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
                Project Management Made Simple
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Track your projects and collaborate with your team in one place. Projivy helps you stay organized and hit your deadlines.
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Projivy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
