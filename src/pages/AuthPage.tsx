
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate, Link, useSearchParams } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { Checkbox } from '@/components/ui/checkbox';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().default(false),
});

const signupSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function AuthPage() {
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', fullName: '', confirmPassword: '' },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await signIn(values.email, values.password, values.rememberMe);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      await signUp(values.email, values.password, values.fullName);
      setActiveTab('login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const rememberMe = loginForm.getValues('rememberMe');
      await signInWithGoogle(rememberMe);
    } catch (error) {
      console.error('Google signin failed', error);
      setIsGoogleLoading(false);
    }
  };

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/95 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Logo className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">Projivy</h1>
          <p className="text-muted-foreground text-center">Project Management Made Simple</p>
        </div>

        <Card className="border shadow-lg bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Welcome to Projivy</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="•••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 my-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="rememberMe"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="rememberMe">Remember me for 30 days</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity"
                      disabled={loginForm.formState.isSubmitting}
                    >
                      {loginForm.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                    
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGoogleSignIn}
                      disabled={isGoogleLoading}
                      className="w-full"
                    >
                      {isGoogleLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full mr-2" />
                          Signing in...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          Sign in with Google
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="•••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="•••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity"
                      disabled={signupForm.formState.isSubmitting}
                    >
                      {signupForm.formState.isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
            <Link to="/" className="text-sm text-center text-primary hover:underline w-full">
              Back to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
