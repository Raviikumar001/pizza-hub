"use client";
import { useUser } from "@clerk/clerk-react";
import Navigation from "@/components/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Calendar,
  Clock,
  Pizza,
  TrendingUp,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Dashboard = () => {
  const { user } = useUser();


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    {
      name: "Total Orders",
      value: "24",
      icon: Pizza,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Revenue",
      value: "$1,248",
      icon: TrendingUp,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
      change: "+8%",
      changeType: "positive",
    },
    {
      name: "Active Orders",
      value: "8",
      icon: Clock,
      color: "bg-orange-50",
      iconColor: "text-orange-600",
      change: "-2",
      changeType: "neutral",
    },
    {
      name: "This Week",
      value: "156",
      icon: Calendar,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      change: "+15%",
      changeType: "positive",
    },
  ];

  const quickActions = [
    {
      title: "View All Orders",
      description: "Manage your pizza orders",
      icon: Pizza,
      href: "/pizza-orders",
    },
    {
      title: "Analytics",
      description: "View performance metrics",
      icon: TrendingUp,
      href: "#",
    },
    {
      title: "Active Orders",
      description: "Track current deliveries",
      icon: Clock,
      href: "#",
    },
  ];

  const recentActivities = [
    {
      message: "Order #PZA156 was delivered successfully",
      time: "2 minutes ago",
      status: "completed",
    },
    {
      message: "New order #PZA157 received from downtown",
      time: "5 minutes ago",
      status: "new",
    },
    {
      message: "Order #PZA155 is out for delivery",
      time: "12 minutes ago",
      status: "progress",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50/50">
        <Navigation />

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  {getGreeting()}, {user?.firstName || "there"}!{" "}
                  {/* Add emoji based on time */}
                  {getGreeting() === "Good morning" && " ☀️"}
                  {getGreeting() === "Good afternoon" && " 🌤️"}
                  {getGreeting() === "Good evening" && " 🌅"}
                  {getGreeting() === "Good night" && " 🌙"}
                </h1>
                <p className="text-gray-600">
                  Here&apos;s what&apos;s happening with your pizza business
                  today.
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-3">
                <Image
                  className="h-12 w-12 rounded-full ring-2 ring-white shadow-sm"
                  src={
                    user?.imageUrl ||
                    `https://ui-avatars.com/api/?name=${user?.firstName || "User"}&background=f97316&color=ffffff`
                  }
                  alt="Profile"
                  height={23}
                  width={23}
                />
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.name}
                  whileHover={{ y: -2 }}
                  className="group"
                >
                  <div className="bg-white rounded-xl border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "positive"
                            ? "text-emerald-600"
                            : stat.changeType === "negative"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-600">{stat.name}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200/60 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Actions
                  </h3>
                  <Eye className="h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.title}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-left group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <Icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">
                                {action.title}
                              </h4>
                              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-xl border border-gray-200/60 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Activity
                  </h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === "completed"
                            ? "bg-green-500"
                            : activity.status === "new"
                              ? "bg-blue-500"
                              : "bg-orange-500"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  View all activities
                </button>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
