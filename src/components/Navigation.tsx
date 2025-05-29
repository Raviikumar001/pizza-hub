"use client";
import { UserButton, useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Pizza, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Pizza Orders", path: "/pizza-orders", icon: Pizza },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <motion.div
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl shadow-lg"
              >
                <Pizza className="h-8 w-8 text-white" />
              </motion.div>
              <span className="ml-3 text-2xl font-black text-gray-900">
                Pizza
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  Dash
                </span>
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link key={item.name} href={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300",
                        isActive
                          ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg"
                          : "text-gray-700 hover:text-orange-600 hover:bg-white/50 backdrop-blur-sm",
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-sm font-semibold text-gray-700 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl"
              >
                Welcome,{" "}
                {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </motion.span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 rounded-xl shadow-lg border-2 border-white",
                    },
                  }}
                />
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/20 py-4 bg-white/50 backdrop-blur-sm rounded-b-2xl"
            >
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300",
                          isActive
                            ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg"
                            : "text-gray-700 hover:text-orange-600 hover:bg-white/70",
                        )}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/20 flex items-center space-x-3 px-4"
              >
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 rounded-xl shadow-lg border-2 border-white",
                    },
                  }}
                />
                <span className="text-sm font-semibold text-gray-700">
                  {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
