import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
     

      <h1 className="mt-40 text-3xl font-bold lg:text-6xl  bg-gradient-to-r from-purple-500 to-teal-700 text-transparent bg-clip-text">
        Summarize Articles with GEN-AI
      </h1>
      <div className="text-center py-12 px-4">
         <p className="text-xl text-gray-500 mb-8">Transform lengthy articles into clear and concise summaries, Unleash the power of GEN-AI and streamline your reading experience like never before.</p>
         <p className="text-lg text-gray-400">Say goodbye to information overload and hello to efficient reading!</p>
      </div>
    </header>
  );
};

export default Hero;
