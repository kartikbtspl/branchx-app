import React from "react";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) { 
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
      alert("Form submitted!");
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-r from-[#1a132e] to-[#0c033e] text-white">
    <div className="max-w-screen-md mx-auto">
      <h2 className="text-4xl font-bold text-center text-green-500 ">Login</h2>
      <p className="text-center text-gray-300 mb-12 text-lg">
        Please log in to your account to continue
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-[#1a0f2e] p-6 rounded-lg shadow-md flex items-center space-x-4">
            <span className="text-xl font-semibold">📧 Email us:</span>
            <span className="text-sm text-gray-200">care@branchx.in</span>
          </div>
          <div className="bg-[#1a0f2e] p-6 rounded-lg shadow-md flex items-center space-x-4">
            <span className="text-xl font-semibold">📞 Contact us:</span>
            <span className="text-sm text-gray-200">+91 9711007799</span>
          </div>
          <div className="bg-[#1a0f2e] p-6 rounded-lg shadow-md flex items-start space-x-4">
            <span className="text-xl">📍</span>
            <span className="text-sm text-gray-200">
              H-87, Sector-63, Noida, Uttar Pradesh 201301, India
            </span>
          </div>
          <div className="bg-[#1a0f2e] p-6 rounded-lg shadow-md flex items-start space-x-4">
            <span className="text-xl">📍</span>
            <span className="text-sm text-gray-200">
              7th Floor, Office No B-708/709/710, BSEL Tech Park, Vashi, Navi
              Mumbai, Maharashtra 400705
            </span>
          </div>
        </div>

        {/* Right Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black p-8 rounded-xl shadow-xl space-y-5 text-sm"
        >
          <h3 className="text-xl font-semibold text-center text-[#13001f] mb-3">
            Login
          </h3>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              // className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13001f] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13001f] transition`}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13001f] transition"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Role</label>
            <select className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13001f] transition">
              <option value="">Select Role</option>
              <option value="retailer">Retailer</option>
              <option value="distributer">Distributer</option>
              <option value="advertiser">Advertiser</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#13001f] text-white py-2.5 rounded-md hover:bg-[#1e0e2d] transition duration-200 font-medium text-sm"
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default Login;
