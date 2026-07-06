function InstagramSection() {
  const posts = [
    "https://placehold.co/400x400",
    "https://placehold.co/400x400",
    "https://placehold.co/400x400",
    "https://placehold.co/400x400",
    "https://placehold.co/400x400",
    "https://placehold.co/400x400",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-[#C9A227] uppercase tracking-[4px] text-center">
          Follow Us
        </p>

        <h2 className="text-4xl font-bold text-center mt-2">
          Instagram Gallery
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-14">
          Discover our latest jewellery collections.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl shadow-lg group cursor-pointer"
            >
              <img
                src={post}
                alt="Instagram"
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/_mk_jewellers_1111"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-black text-white px-8 py-4 rounded-xl hover:bg-[#C9A227] transition"
          >
            Follow @_mk_jewellers_1111
          </a>
        </div>

      </div>
    </section>
  );
}

export default InstagramSection;