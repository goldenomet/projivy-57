
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Palette, Monitor, Sun, Moon } from "lucide-react";
import { useThemeManager } from "@/hooks/use-theme-manager";
import { AppTheme, ThemeMode } from "@/types/theme";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

export function ThemeSelector() {
  const { currentTheme, themeMode, setTheme, setThemeMode, availableThemes } = useThemeManager();
  const { setTheme: setSystemTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Light", "Dark"];
  
  const filteredThemes = selectedCategory === "All" 
    ? availableThemes 
    : availableThemes.filter(theme => 
        selectedCategory === "Light" ? !theme.isDark : theme.isDark
      );

  const handleThemeSelect = (theme: AppTheme) => {
    setTheme(theme);
    // Also update system theme for compatibility
    setSystemTheme(theme.isDark ? "dark" : "light");
  };

  const handleModeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
    setSystemTheme(mode);
  };

  return (
    <div className="space-y-6">
      {/* Theme Mode Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Theme Mode
          </CardTitle>
          <CardDescription>
            Choose how you want the theme to behave across your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={themeMode === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeSelect("light")}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>
            <Button
              variant={themeMode === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeSelect("dark")}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>
            <Button
              variant={themeMode === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeSelect("system")}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              System
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Color Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Themes
          </CardTitle>
          <CardDescription>
            Select a color scheme that matches your style and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredThemes.map((theme) => (
              <Card
                key={theme.id}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                  "border-2",
                  currentTheme.id === theme.id 
                    ? "border-primary shadow-md ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleThemeSelect(theme)}
              >
                {/* Theme Preview Image */}
                <div className="relative h-24 overflow-hidden rounded-t-lg">
                  <img 
                    src={theme.preview}
                    alt={theme.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Color Palette Preview */}
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    <div 
                      className="w-3 h-3 rounded-full border border-white/50"
                      style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full border border-white/50"
                      style={{ backgroundColor: `hsl(${theme.colors.background})` }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full border border-white/50"
                      style={{ backgroundColor: `hsl(${theme.colors.card})` }}
                    />
                  </div>

                  {/* Selected Indicator */}
                  {currentTheme.id === theme.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{theme.name}</h3>
                    <Badge variant={theme.isDark ? "secondary" : "outline"} className="text-xs">
                      {theme.isDark ? "Dark" : "Light"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {theme.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Theme Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-border"
              style={{ backgroundColor: `hsl(${currentTheme.colors.primary})` }}
            />
            <div>
              <h4 className="font-medium">{currentTheme.name}</h4>
              <p className="text-sm text-muted-foreground">{currentTheme.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
