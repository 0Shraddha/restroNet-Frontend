
import { useState } from "react";
import { Link } from "react-router-dom";

const EmailForm = ({setIsValid}) => {
      const [email, setEmail] = useState("");

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
              <p className="text-gray-600 mt-2">No worries, we'll send you reset instructions</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>

              <button
                onClick={() => setIsValid(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 cursor-pointer"
              >
                Send OTP Code
              </button>

              <div className="text-center">
                <Link to="/consumer?mode=login" className="text-sm text-gray-600 hover:text-red-600 transition hover:underline hover:underline-offset-4">
                  ← Back to Login
                </Link>
              </div>
            </div>
          </div>
    )
}

export default EmailForm;