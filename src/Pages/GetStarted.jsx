import { useUser, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Optional auto redirect (if desired):
      // navigate("/home", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-10 max-w-md w-full shadow-2xl border border-white/20 text-white text-center animate__animated animate__fadeInDown">

        {/* Header */}
        <h1 className="text-4xl font-bold mb-3">
          Welcome to <span className="text-yellow-300">Study Genie</span>
        </h1>
        <p className="text-lg mb-6 text-white/80">Your AI-powered Socratic learning assistant</p>

        {/* If NOT signed in */}
        {!isSignedIn ? (
          <div className="flex flex-col gap-4">
            <SignInButton afterSignInUrl="/home">
              <button className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton afterSignUpUrl="/home">
              <button className="w-full py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-md">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        ) : (
          <>
            {/* Signed-in User Info */}
            <div className="flex items-center gap-4 mt-6 bg-white/20 p-4 rounded-lg shadow-md backdrop-blur-sm">
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-14 h-14 rounded-full border border-gray-300"
              />
              <div className="text-left">
                <p className="text-lg font-semibold">{user.fullName}</p>
                <p className="text-sm text-white/80">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => navigate("/home")}
              className="mt-6 w-full py-2 bg-yellow-400 text-purple-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg"
            >
              Continue to Home →
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GetStarted;
