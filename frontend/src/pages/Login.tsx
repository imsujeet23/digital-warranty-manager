/**
 * Login Page
 *
 * User login form with validation and API integration.
 */

import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { FormInput } from '@/components/forms/FormInput';
import { LoadingButton } from '@/components/forms/LoadingButton';
import { AlertMessage } from '@/components/feedback/AlertMessage';
import { loginUser, isValidEmail } from '@/services/authService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * LoginPage handles user login with form validation.
 */
export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        localStorage.setItem('currentUserEmail', email);
        setSuccess(true);
        setTimeout(() => {
          navigate('/warranties');
        }, 1000);
      } else {
        setApiError(result.error?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md shadow-elevated">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <LogIn className="h-7 w-7 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Login to access your digital warranties
            </CardDescription>
          </CardHeader>

          <CardContent>
            {success && (
              <AlertMessage type="success" title="Login Successful!" className="mb-6">
                Redirecting to warranties...
              </AlertMessage>
            )}

            {apiError && (
              <AlertMessage type="error" className="mb-6">
                {apiError}
              </AlertMessage>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                disabled={isLoading || success}
                autoComplete="email"
              />

              <FormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                disabled={isLoading || success}
                autoComplete="current-password"
              />

              <LoadingButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
                loadingText="Signing In..."
                disabled={success}
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </LoadingButton>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Create Account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
