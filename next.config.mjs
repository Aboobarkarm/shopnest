/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "raw.githubusercontent.com",
      "images.pexels.com", // also needed for your other image URLs
      "res.cloudinary.com" // needed if you use Cloudinary-hosted images too
    ],
  },
};

export default nextConfig;
