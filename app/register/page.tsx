export default function Page() {
  return (
    <div className="container mx-auto mt-12 p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold text-blue-600">Sign Up</h2>
        </div>
        <form className="bg-white p-8 shadow-md rounded-lg">
          <div className="form-group mb-5">
            <label htmlFor="email" className="block font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 border rounded-full"
            />
          </div>
          <div className="form-group mb-5">
            <label htmlFor="username" className="block font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              required
              className="w-full px-4 py-2 border rounded-full"
            />
          </div>
          <div className="form-group mb-5">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border rounded-full"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
