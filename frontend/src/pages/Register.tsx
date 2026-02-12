/**
 * Register Page
 * 
 * User registration form with validation and API integration.
 * Allows new users to create an account.
 */

import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { FormInput } from '@/components/forms/FormInput';
import { LoadingButton } from '@/components/forms/LoadingButton';
import { AlertMessage } from '@/components/feedback/AlertMessage';
import { registerUser, isValidEmail, validatePassword } from '@/services/authService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * RegisterPage handles new user registration with form validation.
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Validates all form fields
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }

    // Validate password confirmation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser(email, password);

      if (result.success) {
        localStorage.setItem('currentUserEmail', email);
        setSuccess(true);
        // Redirect to warranties page after short delay
        setTimeout(() => {
          navigate('/warranties');
        }, 2000);
      } else {
        setApiError(result.error?.message || 'Registration failed. Please try again.');
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
                <UserPlus className="h-7 w-7 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Register to start managing your warranties digitally
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Success Message */}
            {success && (
              <AlertMessage type="success" title="Account Created!" className="mb-6">
                Your account has been created successfully. Redirecting to warranties...
              </AlertMessage>
            )}

            {/* Error Message */}
            {apiError && (
              <AlertMessage type="error" className="mb-6">
                {apiError}
              </AlertMessage>
            )}

            {/* Registration Form */}
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                helperText="Min 8 characters with uppercase, lowercase, and number"
                disabled={isLoading || success}
                autoComplete="new-password"
              />

              <FormInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                disabled={isLoading || success}
                autoComplete="new-password"
              />

              <LoadingButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
                loadingText="Creating Account..."
                disabled={success}
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </LoadingButton>
            </form>

            {/* Link to login */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-primary hover:underline"
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
