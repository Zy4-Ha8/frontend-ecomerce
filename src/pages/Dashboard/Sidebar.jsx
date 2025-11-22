import {
  Users,
  FolderTree,
  Package,
  ChevronRight,
  ChevronDown,
  UserPlus,
  List,
  Plus,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AdminSidebar({ isSidebarOpen }) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState({});
  const pageWidth = useSelector((state) => state.pageWidth);
  const menuItems = [
    {
      id: "users",
      label: "User Management",
      icon: Users,
      subItems: [
        { id: "add-user", label: "Add User", icon: UserPlus },
        { id: "show-users", label: "Show Users", icon: List },
      ],
    },
    {
      id: "categories",
      label: "Categories",
      icon: FolderTree,
      subItems: [
        { id: "add-category", label: "Add Category", icon: Plus },
        { id: "show-categories", label: "Show Categories", icon: Eye },
      ],
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      subItems: [
        { id: "add-product", label: "Add Product", icon: Plus },
        { id: "show-products", label: "Show Products", icon: Eye },
      ],
    },
  ];

  const toggleMenu = (itemId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleItemClick = (itemId, hasSubItems) => {
    if (hasSubItems) {
      toggleMenu(itemId);
    } else {
      setActiveItem(itemId);
    }
  };

  return (
    <div className="flex bg-gray-50">
      {/*  Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 h-full  ${
          pageWidth.isMoblie
            ? isSidebarOpen
              ? "absolute top-16 left-0 z-1000 h-full w-64"
              : "absolute top-16 -left-65 z-1000 h-full w-64"
            : isSidebarOpen
            ? "w-64"
            : "w-0"
        }
        
        overflow-hidden`}
      >
        <div className="w-64">
          {/* Navigation */}
          <nav className="p-4 h-[calc(100vh-64px-88px)] overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                const isExpanded = expandedMenus[item.id];
                const hasSubItems = item.subItems && item.subItems.length > 0;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id, hasSubItems)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive && !hasSubItems
                          ? "text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      style={
                        isActive && !hasSubItems
                          ? { backgroundColor: "#3a5b22" }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {hasSubItems && (
                        <div
                          className="transition-transform duration-200"
                          style={{
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        >
                          <ChevronDown size={18} />
                        </div>
                      )}
                      {!hasSubItems && isActive && <ChevronRight size={18} />}
                    </button>

                    {/* Submenu */}
                    {hasSubItems && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? "max-h-96 mt-1" : "max-h-0"
                        }`}
                      >
                        <ul className="ml-4 space-y-1">
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = activeItem === subItem.id;

                            return (
                              <li key={subItem.id}>
                                <Link
                                  to={subItem.id}
                                  onClick={() => setActiveItem(subItem.id)}
                                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                                    isSubActive
                                      ? "text-white shadow-sm"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                  style={
                                    isSubActive
                                      ? { backgroundColor: "#3a5b22" }
                                      : {}
                                  }
                                >
                                  <SubIcon size={18} />
                                  <span className="text-sm font-medium">
                                    {subItem.label}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          {/* <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3 px-4 py-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "#3a5b22" }}
              >
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
