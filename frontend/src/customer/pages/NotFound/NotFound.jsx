import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";

function NotFound() {
  return (
    <MainLayout>
      <section className="flex min-h-[80vh] items-center justify-center bg-[#FAF7F2] px-6">

        <div className="text-center">

          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-8xl font-extrabold text-[#C9A227]"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-4xl font-bold"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-lg text-gray-500"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/"
              className="mt-10 inline-block rounded-xl bg-[#111111] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#C9A227]"
            >
              Back To Home
            </Link>
          </motion.div>

        </div>

      </section>
    </MainLayout>
  );
}

export default NotFound;