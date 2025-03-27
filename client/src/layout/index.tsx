const AuthLayouts = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex justify-center items-center py-3 h-20 shadow-md bg-white">
        <img
          loading="lazy"
          src="/logo.png"
          alt="logo"
          width={180}
          height={60}
        />
      </header>

      {children}
    </>
  );
};

export default AuthLayouts;
