function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Chat App
                </h1>
                <p className="text-gray-600 text-center mb-4">
                    Tailwind CSS is working! 🎉
                </p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default App;