import Image from "next/image";

export default function VideoReveal() {
  return (
    <div className="relative w-full flex justify-center">
      <div className="footerBg w-full h-[70vh] sm:h-[100vh] absolute filter brightness-50">
        <video
          src="https://legendary.b-cdn.net/website/sample.mp4"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center relative mt-[35vh]">
        <div
          data-scroll
          data-scroll-speed="0.3"
          className="footerImg absolute w-[350px] h-[475px] text-center font-medium text-xl "
        ></div>
        <h1
          data-scroll
          data-scroll-speed="0.7"
          className="text-white text-[7vw] z-30 text-center whitespace-nowrap"
        >
          <Image
            src="/images/gomotion.svg"
            alt="gomotion"
            width={55}
            height={55}
            unoptimized
          />
        </h1>
      </div>
    </div>
  );
}
