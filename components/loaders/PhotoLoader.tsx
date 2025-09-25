const PhotoLoader = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.1rem]">
      {Array.from({ length: 60 }).map((_, index) => (
        <div
          key={index}
          className="bg-black/30 aspect-square animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default PhotoLoader;
