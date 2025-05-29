import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen flex flex-col justify-between">
      
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 md:mt-36 px-4">
        
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
          <Image src="/facebook.svg" alt="Facebook Logo" width={300} height={100} />
          <p className="text-2xl mt-4">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <input
            type="text"
            placeholder="Email address or phone number"
            className="w-full px-4 py-3 mb-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-3 border border-gray-300 rounded"
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700">
            Log In
          </button>
          <div className="text-center my-4">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgotten password?
            </a>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <button className="bg-green-600 text-white py-3 px-4 rounded font-bold hover:bg-green-700">
              Create new account
            </button>
          </div>
        </div>
      </div>

      
      <footer className="bg-white mt-10 py-6 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="flex flex-wrap justify-center space-x-4 mb-4">
            <a href="#" className="hover:underline">English (UK)</a>
            <a href="#" className="hover:underline">اردو</a>
            <a href="#" className="hover:underline">हिन्दी</a>
            <a href="#" className="hover:underline">বাংলা</a>
            <a href="#" className="hover:underline">ਪੰਜਾਬੀ</a>
            <a href="#" className="hover:underline">Español</a>
            <a href="#" className="hover:underline">Français (France)</a>
            <a href="#" className="hover:underline">Deutsch</a>
            <a href="#" className="hover:underline">Italiano</a>
            <a href="#" className="hover:underline">العربية</a>
            <a href="#" className="hover:underline">Português (Brasil)</a>
            <a href="#" className="hover:underline">日本語</a>
          </div>
          <hr className="mb-4" />
          
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="#" className="hover:underline">Sign Up</a>
            <a href="#" className="hover:underline">Log In</a>
            <a href="#" className="hover:underline">Messenger</a>
            <a href="#" className="hover:underline">Facebook Lite</a>
            <a href="#" className="hover:underline">Watch</a>
            <a href="#" className="hover:underline">Places</a>
            <a href="#" className="hover:underline">Games</a>
            <a href="#" className="hover:underline">Marketplace</a>
            <a href="#" className="hover:underline">Meta Pay</a>
            <a href="#" className="hover:underline">Meta Store</a>
            <a href="#" className="hover:underline">Meta Quest</a>
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Threads</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Help</a>
          </div>
          <div className="text-center mt-4">
            <small>Meta © 2025</small>
          </div>
        </div>
      </footer>
    </main>
  );
}
