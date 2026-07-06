import MainLayout from "../../layouts/MainLayout";

function Contact() {
  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <span className="uppercase tracking-[5px] text-[#C9A227] font-semibold">
            Contact Us
          </span>

          <h1 className="mt-4 text-5xl font-bold text-[#111111]">
            We'd Love to Hear From You
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Have questions or need assistance? Get in touch with us using the
            details below or send us a message.
          </p>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">

            {/* Contact Information */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="text-2xl font-bold">
                Contact Information
              </h2>

              <div className="mt-8 space-y-6">

                <div>
                  <h3 className="font-semibold">📍 Address</h3>
                  <p className="text-gray-600">
                    Dehradun, Uttarakhand, India
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">📞 Phone</h3>
                  <p className="text-gray-600">
                    +91 98765 43210
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">📧 Email</h3>
                  <p className="text-gray-600">
                    support@mkjewellers.com
                  </p>
                </div>

              </div>

            </div>

            {/* Contact Form */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="text-2xl font-bold">
                Send a Message
              </h2>

              <form className="mt-8 space-y-5">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:border-[#C9A227]"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:border-[#C9A227]"
                />

                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:border-[#C9A227]"
                ></textarea>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-black py-3 text-white transition hover:bg-[#C9A227]"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}

export default Contact;