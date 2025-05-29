"use client";

import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";

interface PizzaOrder {
  id: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status:
    | "Pending"
    | "Preparing"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  total: number;
}

const mockOrders: PizzaOrder[] = [
  {
    id: "PZA001",
    customerName: "John Doe",
    pizzaType: "Margherita",
    quantity: 2,
    orderDate: "2024-05-28 14:30",
    status: "Delivered",
    total: 24.99,
  },
  {
    id: "PZA002",
    customerName: "Sarah Johnson",
    pizzaType: "Pepperoni",
    quantity: 1,
    orderDate: "2024-05-28 15:15",
    status: "Out for Delivery",
    total: 16.99,
  },
  {
    id: "PZA003",
    customerName: "Mike Chen",
    pizzaType: "Veggie Supreme",
    quantity: 3,
    orderDate: "2024-05-28 16:45",
    status: "Preparing",
    total: 45.97,
  },
  {
    id: "PZA004",
    customerName: "Emily Davis",
    pizzaType: "Hawaiian",
    quantity: 1,
    orderDate: "2024-05-28 17:20",
    status: "Pending",
    total: 18.99,
  },
  {
    id: "PZA005",
    customerName: "David Wilson",
    pizzaType: "Meat Lovers",
    quantity: 2,
    orderDate: "2024-05-28 18:00",
    status: "Delivered",
    total: 39.98,
  },
  {
    id: "PZA006",
    customerName: "Lisa Brown",
    pizzaType: "BBQ Chicken",
    quantity: 1,
    orderDate: "2024-05-28 18:30",
    status: "Preparing",
    total: 19.99,
  },
  {
    id: "PZA007",
    customerName: "Tom Miller",
    pizzaType: "Four Cheese",
    quantity: 2,
    orderDate: "2024-05-28 19:15",
    status: "Pending",
    total: 33.98,
  },
  {
    id: "PZA008",
    customerName: "Anna Garcia",
    pizzaType: "Margherita",
    quantity: 1,
    orderDate: "2024-05-28 19:45",
    status: "Cancelled",
    total: 12.99,
  },
  {
    id: "PZA009",
    customerName: "James Rodriguez",
    pizzaType: "Pepperoni",
    quantity: 3,
    orderDate: "2024-05-28 20:00",
    status: "Out for Delivery",
    total: 50.97,
  },
  {
    id: "PZA010",
    customerName: "Rachel White",
    pizzaType: "Veggie Supreme",
    quantity: 1,
    orderDate: "2024-05-28 20:30",
    status: "Preparing",
    total: 15.99,
  },
];

const PizzaOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof PizzaOrder>("orderDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Preparing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Out for Delivery":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleSort = (field: keyof PizzaOrder) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = mockOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [searchTerm, statusFilter, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: keyof PizzaOrder }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  Pizza Orders
                </h1>
                <p className="text-gray-600">
                  Manage and track all your pizza orders
                </p>
              </div>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 shadow-sm">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-gray-200/60 p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders, customers, or pizza types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">More</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Orders Table */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-gray-200/60 overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50/50 border-b border-gray-200">
                  <tr>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("id")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Order ID</span>
                        <SortIcon field="id" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("customerName")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        <SortIcon field="customerName" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("pizzaType")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Pizza</span>
                        <SortIcon field="pizzaType" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("quantity")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Qty</span>
                        <SortIcon field="quantity" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("orderDate")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        <SortIcon field="orderDate" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <SortIcon field="status" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("total")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Total</span>
                        <SortIcon field="total" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAndSortedOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.pizzaType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.orderDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${order.total}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAndSortedOrders.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-500 text-lg font-medium">
                  No orders found
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  Try adjusting your search or filter criteria
                </div>
              </div>
            )}
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white rounded-xl border border-gray-200/60 p-6 text-center">
              <div className="text-2xl font-semibold text-gray-900 mb-1">
                {filteredAndSortedOrders.length}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200/60 p-6 text-center">
              <div className="text-2xl font-semibold text-green-600 mb-1">
                {
                  filteredAndSortedOrders.filter(
                    (o) => o.status === "Delivered",
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200/60 p-6 text-center">
              <div className="text-2xl font-semibold text-blue-600 mb-1">
                {
                  filteredAndSortedOrders.filter((o) =>
                    ["Pending", "Preparing", "Out for Delivery"].includes(
                      o.status,
                    ),
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Active Orders</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200/60 p-6 text-center">
              <div className="text-2xl font-semibold text-gray-900 mb-1">
                $
                {filteredAndSortedOrders
                  .reduce((sum, order) => sum + order.total, 0)
                  .toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </ProtectedRoute>
  );
};

export default PizzaOrders;
