import Image from "next/image";
import Philippe from "../../../../public/images/team-philippe.jpg";
import Lionel from "../../../../public/images/team-tatkeu.jpg";

const Team = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-10 px-5 sm:px-20 lg:px-40 mt-24 z-50">
      <div className="team-member flex  flex-col lg:flex-row gap-7">
        <div className="relative h-[26rem] aspect-[12/16] overflow-hidden">
          <Image
            style={{ objectFit: "cover" }}
            src={Philippe}
            alt="image"
            fill
          />
        </div>

        <div>
          <div className="text-2xl font-semibold uppercase">
            Philippe Tedajo
          </div>
          <div className="text-lg font-medium text-stone-400">Co-founder</div>
          <div className="text-md font-medium text-stone-400 mb-5">
            Senior Software Engineer
          </div>

          <div className="sm:max-w-xs leading-loose">
            Armed with over a decade of experience across the globe, he builds
            the rock-solid backbone that powers Gomotion&apos;s instant video.
          </div>
        </div>
      </div>

      <div className="team-member flex  flex-col lg:flex-row gap-7">
        <div className="relative h-[26rem] aspect-[12/16] overflow-hidden">
          <Image style={{ objectFit: "cover" }} src={Lionel} alt="image" fill />
        </div>

        <div>
          <div className="text-2xl font-semibold uppercase">Lionel Tatkeu</div>
          <div className="text-lg font-medium text-stone-400">Co-founder</div>
          <div className="text-md font-medium text-stone-400 mb-5">
            Senior Data Scientist
          </div>

          <div className="sm:max-w-xs leading-loose">
            Fueled by a PhD in machine learning and a relentless curiosity, he
            transforms raw viewership data into cinematic gold.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
