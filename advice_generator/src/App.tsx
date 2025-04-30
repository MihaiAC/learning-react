function App() {
  return (
    <div className="flex flex-col justify-center items-center text-white w-full h-screen bg-darkGray">
      <div className="bg-midGray relative p-6 rounded-xl shadow-md mx-auto max-w-100 flex flex-col items-center space-y-8">
        <div className="text-hospitalGreen uppercase tracking-widest text-xs">
          Advice #117
        </div>
        <div className="text-3xl mx-4 text-center">
          "It is easy to sit up and take notice, what's difficult is getting up
          and taking action."
        </div>
        <img
          className="hidden md:block"
          src="/images/pattern-divider-desktop.svg"
          alt=""
        />
        <img
          className="block md:hidden"
          src="/images/pattern-divider-desktop.svg"
          alt=""
        />
        <div className="absolute -bottom-6 bg-hospitalGreen rounded-full p-4 shadow-md">
          <img src="/images/icon-dice.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
