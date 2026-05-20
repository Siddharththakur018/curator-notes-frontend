"use client";

type LoaderProps = {
  size?: number;
};

const Loader: React.FC<LoaderProps> = ({ size = 20 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-700"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

export default Loader;
