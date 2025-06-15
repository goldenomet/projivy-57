
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Lock, Eye, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.",
      items: [
        "Account information (name, email address, password)",
        "Project and task data you create within our service",
        "Communication preferences and settings",
        "Usage data and analytics to improve our service"
      ]
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services.",
      items: [
        "Provide and maintain our project management platform",
        "Process transactions and send related information",
        "Send technical notices, updates, and support messages",
        "Respond to your comments, questions, and requests",
        "Monitor and analyze trends and usage"
      ]
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "Information Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
      items: [
        "With your consent or at your direction",
        "With service providers who assist us in operating our platform",
        "To comply with legal obligations or protect rights and safety",
        "In connection with a business transaction or reorganization"
      ]
    }
  ];

  const principles = [
    {
      title: "Data Minimization",
      description: "We only collect data that's necessary for our services."
    },
    {
      title: "Transparency",
      description: "We're clear about what data we collect and how we use it."
    },
    {
      title: "Security First",
      description: "Your data is protected with industry-standard encryption."
    },
    {
      title: "Your Control",
      description: "You can access, update, or delete your data anytime."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/landing">
            <Button variant="ghost" className="hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Badge className="bg-blue-100 text-blue-700">
                Last updated: June 15, 2025
              </Badge>
              <Badge className="bg-green-100 text-green-700">
                GDPR Compliant
              </Badge>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>

          {/* Privacy Principles */}
          <div className="mb-12 sm:mb-16 animate-slide-in">
            <h2 className="text-2xl font-semibold mb-8 text-center">Our Privacy Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Sections */}
          <div className="space-y-8 mb-12 sm:mb-16">
            {sections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 sm:mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in">
              <CardHeader>
                <CardTitle className="text-xl">Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. This includes encryption, 
                  secure data centers, and regular security audits.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="text-xl">Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access and update your account information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact and Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@projivy.com</p>
                  <p><strong>Address:</strong> 123 Privacy Street, Security City, SC 12345</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Download className="h-6 w-6 text-primary" />
                  Download & Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Access your data and privacy resources:
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full hover:bg-primary/10 transition-all duration-300">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full hover:bg-primary/10 transition-all duration-300">
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full hover:bg-primary/10 transition-all duration-300">
                    Cookie Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
