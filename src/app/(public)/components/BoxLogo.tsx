import Image from "next/image";

const BoxLogo = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <Image className="rounded-lg" quality={100} src="/logo.webp" width={120} height={100} alt="logo" />
      <p className="opacity-55">Âm nhạc kết nối cảm xúc</p>
    </div>
  );
};

export default BoxLogo;
