export default function Page() {
    return(
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Title</h2>
          <p className="mt-2 text-gray-500">Description</p>
          <div className="mt-4">
            <p className="text-sm text-gray-900">Directed by: ABC</p>
            <p className="text-sm text-gray-900">Release Date: 06/03/2024</p>
            <p className="text-sm text-gray-900">Rating: 8/10</p>
          </div>
        </div>
      </div>
    </div>
    )
}