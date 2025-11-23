"use client";

import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-950 text-gray-200 px-6 py-25"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Refund Policy
        </h1>
        <p className="text-gray-400 mb-10">
          Last Updated: {new Date().getFullYear()}
        </p>

        {/* Content */}
        <div className="space-y-10 text-gray-300 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Overview
            </h2>
            <p>
              At <span className="text-cyan-400 font-medium">CyberCafe</span>, we aim to provide 
              high-quality digital and offline services. Since most of our services are delivered 
              instantly or processed quickly, certain orders may not be eligible for refunds once 
              processing has begun.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. Eligibility for Refunds
            </h2>
            <p>
              A refund may be provided only under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>The service was not delivered due to a system or technical failure.</li>
              <li>Payment was made but the service could not be processed.</li>
              <li>Multiple payments were made for the same order due to transaction errors.</li>
              <li>A cancellation request was made within the allowed 5-minute cancellation window.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Non-Refundable Services
            </h2>
            <p>
              The following types of services cannot be refunded:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Online form submissions after data has been entered or uploaded.</li>
              <li>Printing, scanning, photocopying, and digital file processing.</li>
              <li>Ticket booking charges and convenience fees.</li>
              <li>Any service that has already been fully or partially processed.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. 5-Minute Cancellation Refund Eligibility
            </h2>
            <p>
              Some services include a **5-minute cancellation window** immediately after placing an order.  
              If you cancel within this time period, you may be eligible for a full refund.  
            </p>
            <p className="mt-2">
              After 5 minutes, the order is automatically processed and becomes **non-refundable**.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Processing Time for Refunds
            </h2>
            <p>
              Once approved, refunds may take:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>3–7 business days for UPI refunds</li>
              <li>5–10 business days for bank/credit card refunds</li>
              <li>Instant for wallet balance refunds (if applicable)</li>
            </ul>
            <p className="mt-2">
              Time may vary depending on your payment provider.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. No-Show or Delay Policy
            </h2>
            <p>
              For offline CyberCafe services, if the customer does not visit at the scheduled time 
              or delays beyond the allowed period, the service fee may not be refunded.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Customer Service & Support
            </h2>
            <p>
              If you believe a refund request applies to your situation, you may contact our support team:
            </p>
            <p className="mt-2">
              Email: <span className="text-cyan-400">support@cybercafe.com</span>
            </p>
            <p>
              Please include your Order ID and payment details for faster processing.
            </p>
          </section>

        </div>

      </div>
    </motion.div>
  );
}
