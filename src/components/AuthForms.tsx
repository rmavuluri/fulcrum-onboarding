import React, { useState } from 'react';

interface AuthFormsProps {
  onSubmit: (data: any) => void;
  onToggle: () => void;
  onGoogleSignIn: () => void;
}

export function SignUpForm({ onSubmit, onToggle, onGoogleSignIn }: AuthFormsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sign up with Fulcrum</h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onToggle}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Log in
          </button>
        </p>
      </div>

      <button
        onClick={onGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="newsletter"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
            I would like to receive platform updates and tips
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Get Started
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center">
        By signing up, you acknowledge that you have read and agree to our{' '}
        <a href="#" className="text-blue-600 hover:text-blue-500">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-blue-600 hover:text-blue-500">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}

export function LoginForm({ onSubmit, onToggle, onGoogleSignIn }: AuthFormsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="mt-2 text-sm text-gray-600">
          New to Fulcrum?{' '}
          <button
            onClick={onToggle}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>

      <button
        onClick={onGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-end">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log in
        </button>
      </form>
    </div>
  );
}