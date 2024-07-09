import Search from "./Search";
import logo from "../assets/logo.jpg"; // Adjust the path according to your directory structure

export default function NavBar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-800">
      <div className="flex items-center mb-4 sm:mb-0">
        <img src={logo} alt="MedoZ Games Logo" className="h-10 w-10 mr-2" />
        <div className="text-white text-xl sm:text-2xl font-bold">
          MedoZ Games
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <Search />
      </div>
    </div>
  );
}
