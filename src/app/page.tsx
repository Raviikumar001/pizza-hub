"use client";

import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import {
  Pizza,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  Sparkles,
  Star,
  LogIn,
} from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);


  if (!isLoaded) {
    return <div></div>;
  }
  return (
    <>
      <SignedIn>
   
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </SignedIn>
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  );
};

const LandingPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Track your pizza orders with live updates and detailed insights.",
      color: "bg-gradient-to-br from-blue-500 to-cyan-400",
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Effortlessly manage customer data and order history.",
      color: "bg-gradient-to-br from-purple-500 to-pink-400",
    },
    {
      icon: Shield,
      title: "Secure & Fast",
      description: "Google OAuth integration with lightning-fast performance.",
      color: "bg-gradient-to-br from-emerald-500 to-teal-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg">
                <Pizza className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                PizzaHub
              </span>
            </motion.div>

            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
              >
                Sign In
                <LogIn className="h-4 w-4" />
              </motion.button>
            </SignInButton>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
     
        <motion.div
          className="text-center py-20 lg:py-32"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center bg-white/50 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Trusted by 1000+ pizza businesses
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gray-900">Manage Your</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Pizza Orders
            </span>
            <br />
            <span className="text-gray-900">Effortlessly</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            The most intuitive dashboard for tracking orders, managing
            customers, and growing your pizza business.
          </motion.p>

          <motion.div variants={fadeInUp}>
          <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-orange-500/30 hover:shadow-3xl hover:shadow-orange-500/40 transition-all duration-300 group"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </SignInButton>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="pb-20 lg:pb-32"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your pizza business
              operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 ${feature.color} rounded-2xl mb-6 shadow-lg`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center pb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 lg:p-16 shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to transform your pizza business?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Join thousands of pizza shop owners who trust PizzaHub for
                their daily operations.
              </p>
              <Link href="/sign-up">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  Start Your Free Trial
                  <Sparkles className="h-5 w-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
