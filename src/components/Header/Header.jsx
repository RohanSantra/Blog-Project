import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AlignRight, X } from "lucide-react";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isOpen, setIsOpen] = useState(false);


  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: "My Post", slug: '/my-post', active: authStatus }
  ];

  return (
    <header className="relative py-4 px-4 border-b border-gray-700 bg-gray-950 text-white z-50">
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/">
            <Logo width="70px" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-4 items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `px-4 py-2 transition border-b-2 ${isActive ? "border-white" : "border-transparent"
                        } hover:border-white`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <AlignRight size={36} />
          </button>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
            <Logo width="60px" />
            <button onClick={() => setIsOpen(false)}>
              <X size={36} />
            </button>
          </div>

          <ul className="flex flex-col p-6 gap-4 text-lg">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} onClick={() => setIsOpen(false)}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded hover:bg-gray-800 ${isActive ? "bg-gray-800 font-semibold" : ""
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <li onClick={() => setIsOpen(false)}>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>

        {/* Overlay when sidebar is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-gray-950/80 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </Container>
    </header>
  );
}

export default Header;
