export const storeSettings = {
  storeName: "MK Jewellers",
  ownerName: "Ashish Raj",
  email: "info@mkjewellers.com",
  phone: "+91 9876543210",

  gstNumber: "22ABCDE1234F1Z5",

  address:
    "Dehradun, Uttarakhand",

  currency: "INR",

  timezone: "Asia/Kolkata",

  shippingCharge: 99,

  freeShippingAbove: 5000,
};

export const paymentMethods = [
  {
    name: "Razorpay",
    enabled: true,
  },
  {
    name: "Cash on Delivery",
    enabled: true,
  },
  {
    name: "Stripe",
    enabled: false,
  },
];

export const notificationSettings = {
  orderEmail: true,
  lowStock: true,
  newCustomer: true,
  newsletter: false,
};