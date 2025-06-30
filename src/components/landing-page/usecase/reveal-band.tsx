import Image from "next/image";
import Picture1 from "../../../../public/images/salar_de_atacama.jpg";

export const RevealBand = () => {
  return (
    <div className="flex flex-col px-5 sm:px-10 gap-10 text-black mb-6">
      <div className="reveal-row grid grid-cols-2 md:grid-cols-6 w-full md:min-h-60 rounded-3xl">
        <div className="col-span-2 pl-20 min-h-24 md:min-h-auto text-2xl font-medium flex items-center">
          <div className="max-w-[10rem]">Lorem ipsum dolor</div>
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center md:justify-end px-5 md:px-10">
          <span className="relative h-52 aspect-[14/16] overflow-hidden">
            <Image
              style={{ objectFit: "cover" }}
              src={Picture1}
              alt="image"
              fill
            />
          </span>
        </div>

        <div className="ol-span-1 md:col-span-2 h-full flex items-center px-5">
          <div className="max-w-sm opacity-50 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium asperiores consectetur corporis cupiditate deserunt
            distinctio dolor fuga.
          </div>
        </div>
      </div>
      <div className="reveal-row grid grid-cols-2 md:grid-cols-6 w-full md:min-h-60 rounded-3xl">
        <div className="col-span-2 pl-20 min-h-24 md:min-h-auto text-2xl font-medium flex items-center">
          <div className="max-w-[10rem]">Lorem ipsum dolor</div>
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center md:justify-end px-5 md:px-10">
          <span className="relative h-52 aspect-[14/16] overflow-hidden">
            <Image
              style={{ objectFit: "cover" }}
              src={Picture1}
              alt="image"
              fill
            />
          </span>
        </div>

        <div className="ol-span-1 md:col-span-2 h-full flex items-center px-5">
          <div className="max-w-sm opacity-50 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium asperiores consectetur corporis cupiditate deserunt
            distinctio dolor fuga.
          </div>
        </div>
      </div>
      <div className="reveal-row grid grid-cols-2 md:grid-cols-6 w-full md:min-h-60 rounded-3xl">
        <div className="col-span-2 pl-20 min-h-24 md:min-h-auto text-2xl font-medium flex items-center">
          <div className="max-w-[10rem]">Lorem ipsum dolor</div>
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center md:justify-end px-5 md:px-10">
          <span className="relative h-52 aspect-[14/16] overflow-hidden">
            <Image
              style={{ objectFit: "cover" }}
              src={Picture1}
              alt="image"
              fill
            />
          </span>
        </div>

        <div className="ol-span-1 md:col-span-2 h-full flex items-center px-5">
          <div className="max-w-sm opacity-50 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium asperiores consectetur corporis cupiditate deserunt
            distinctio dolor fuga.
          </div>
        </div>
      </div>
    </div>
  );
};
