export default function Page () {
  return (
    <div className="container mx-auto mt-12 p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold text-blue-600">Login</h2>
        </div>
        <form className="bg-white p-8 shadow-md rounded-lg">
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-full"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-green-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
