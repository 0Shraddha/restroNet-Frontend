import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddEmailMutation } from "../../state/restaurants/passwordApi";

const EmailForm = ({ setIsValid }) => {
  const [email, setEmail] = useState("");

  const [addEmail, { isLoading, isError, error }] = useAddEmailMutation();

  const handleSubmit = async () => {
    if (!email) return;

    try {
      await addEmail({ email }).unwrap(); // 🔥 API call
      setIsValid(true); // move to OTP step only after success
    } catch (err) {
      console.error("Failed to send OTP:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
        <p className="text-gray-600 mt-2">
          No worries, we'll send you reset instructions
        </p>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg"
        >
          {isLoading ? "Sending..." : "Send OTP Code"}
        </button>

        {isError && (
          <p className="text-sm text-red-600 text-center">
            {error?.data?.message || "Something went wrong"}
          </p>
        )}

        <div className="text-center">
          <Link
            to="/consumer?mode=login"
            className="text-sm text-gray-600 hover:text-red-600 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
