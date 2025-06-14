
import { Shield, Zap, Users } from "lucide-react";

export function AuthFeatureHighlights() {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-700">Secure</p>
        <p className="text-xs text-gray-500">Bank-level security</p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-700">Fast</p>
        <p className="text-xs text-gray-500">Lightning quick</p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
          <Users className="h-6 w-6 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-700">Collaborative</p>
        <p className="text-xs text-gray-500">Team-friendly</p>
      </div>
    </div>
  );
}
