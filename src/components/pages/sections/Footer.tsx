import { MapPinned, Mail, PhoneCall } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Logo */}
        <div className="flex items-center lg:justify-start justify-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="mr-2 w-[62px] h-[62px] object-contain"
          />
        </div>

        {/* Company Links */}
        <div className="lg:text-start text-center">
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="text-sm hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="text-sm hover:underline">
                Services
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:text-start text-center">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="flex lg:justify-start justify-center items-center space-x-2">
              <MapPinned className="w-5 h-5 text-white" />
              <span className="text-sm">
                78 Pioneer Rd, Hunterview NSW 2330, Australia
              </span>
            </li>
            <li className="flex lg:justify-start justify-center items-center space-x-2">
              <PhoneCall className="w-5 h-5 text-white" />
              <span className="text-sm">
                <a
                  href="tel:+61466367629"
                  className="lg:text-base text-xs hover:underline"
                >
                  +61 466 367 629
                </a>
              </span>
            </li>
            <li className="flex lg:justify-start justify-center items-center space-x-2">
              <Mail className="w-5 h-5 text-white" />
              <span className="text-sm">
                <a
                  href="mailto:ryan.java@javaconditionmonitoring.com.au"
                  className="lg:text-base text-xs hover:underline"
                >
                  ryan.java@javaconditionmonitoring.com.au
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
