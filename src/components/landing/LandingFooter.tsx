export function LandingFooter() {
  return <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Projivy
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering teams to achieve more through better project management.
            </p>
          </div>
          <div className="space-y-4">
            <h5 className="font-semibold">Product</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-semibold">Company</h5>
            
          </div>
          <div className="space-y-4">
            <h5 className="font-semibold">Support</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-muted-foreground text-sm">
          <p>© 2025 Projivy. All rights reserved. Made by Tydomet.Inc</p>
        </div>
      </div>
    </footer>;
}