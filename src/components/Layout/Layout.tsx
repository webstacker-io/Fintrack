import { useNavigate,Navigate, NavLink, useLocation } from "react-router-dom";
import { X, Menu, Wallet,LogOut, User } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/images/fintrack-logo.png";
const Layout = ({ children }: any) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const localUser= JSON.parse(localStorage.getItem("user") || "{}");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Clear auth token
    navigate("/auth");
  };

  console.log(localUser)
  return( (localUser) ?
    
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`$ {
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-blue-100 flex flex-col transition-all duration-300`}
      >
        <div className="p-4 border-b border-blue-200 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="border-b-2 border-blue-500">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          {isSidebarOpen && <span className="text-lg font-semibold border-b-2 border-blue-500">Menu</span>}
        </div>
        <div className="flex flex-col items-center space-y-4 mt-6">
          <div className="p-3 bg-blue-200 rounded-full">
             <Wallet className="w-6 h-6 border-b-2 border-blue-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {/* <Wallet className="w-8 h-8 border-b-2 border-blue-500" />
                <span className="ml-2 text-xl font-semibold">FinTrack</span> */}
                <img src={logo} className='w-70 h-16' />
              </div>
              <div className="flex space-x-4">
              <NavLink 
                  to="/" 
                  className={() => 
                    (location.pathname === '/' || location.pathname === '/dashboard') ? "border-b-2 text-blue-500  border-blue-500 font-semibold" : "text-gray-700 hover:border-b-2 border-blue-500"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/categories" 
                  className={() => 
                    location.pathname === '/categories'  ? "border-b-2 text-blue-500  border-blue-500 font-semibold" : "text-gray-700 hover:border-b-2 border-blue-500"
                  }
                >
                  Categories
                </NavLink>
                <NavLink 
                  to="/expenses" 
                  className={() => 
                    location.pathname === '/expenses' ? "border-b-2 text-blue-500  border-blue-500 font-semibold" : "text-gray-700 hover:border-b-2 border-blue-500"
                  }
                >
                  Expenses
                </NavLink>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
                    <User className="w-8 h-8 text-white bg-gray-700 p-1 rounded-full border-2 border-white" />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-5 h-5 mr-2" /> Logout
                      </button>
                    </div>
                  )}
                  </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  
                  
            {children} 
        </main>
      </div>
    </div>
  
  : <Navigate to="/auth" replace />);
};

export default Layout;