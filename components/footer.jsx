import Link from "next/link";

const Footer = () => {
  return (
    <div className="container py-2 w-full flex flex-col md:flex-row justify-between bg-primary/5">
      <div className="flex justify-center space-x-6">
        <Link
          href="https://github.com/NO-Alim"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        <Link
          href="abdulalimrakib53@gmail.com"
          className="text-primary hover:underline"
        >
          Contact
        </Link>
      </div>
      <p className="text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Abdul Alim. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
