import React from 'react';
import { Link } from 'react-router-dom';

const PricingCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonLink: string;
}> = ({ title, price, features, isPopular = false, buttonText, buttonLink }) => {
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${isPopular ? 'border-2 border-primary-500 transform scale-105' : 'border border-gray-200'}`}>
      {isPopular && (
        <div className="bg-primary-500 text-white text-center py-2 font-semibold">
          Most Popular
        </div>
      )}
      <div className="px-6 py-8 bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <div className="mt-4 flex justify-center">
            <span className="text-5xl font-extrabold text-gray-900">{price}</span>
            <span className="ml-1 text-xl font-medium text-gray-500 self-end">/month</span>
          </div>
        </div>
      </div>
      <div className="px-6 pt-6 pb-8 bg-gray-50">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            to={buttonLink}
            className={`block w-full bg-${isPopular ? 'primary-600 hover:bg-primary-700' : 'white hover:bg-gray-50 border border-primary-600 text-primary-600'} rounded-md py-3 px-6 text-center font-medium text-${isPopular ? 'white' : 'primary-600'}`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section className="py-12 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choose the plan that best fits your restaurant's needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <PricingCard
            title="Basic Plan"
            price="$49"
            features={[
              "WhatsApp ordering (Delivery/Pickup)",
              "Feedback & Complaints",
              "Table Booking",
              "Dashboard Access",
              "1 Location only",
              "Email Support"
            ]}
            buttonText="Get Started"
            buttonLink="/signup?plan=basic"
          />
          <PricingCard
            title="Executive Plan"
            price="$99"
            features={[
              "Everything in Basic Plan",
              "Order Analytics",
              "Broadcast/Promotions",
              "Multi-location support",
              "Customer retention tools",
              "Role-based access",
              "Priority Support"
            ]}
            isPopular={true}
            buttonText="Get Started"
            buttonLink="/signup?plan=executive"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
