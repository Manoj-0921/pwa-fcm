import React from 'react';

function LoginScreen() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        {/* Header Container */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-lg text-gray-600">Sign in to continue</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Username Input */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              autoCapitalize="none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-base">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
