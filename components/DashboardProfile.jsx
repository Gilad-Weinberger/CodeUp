import Image from "next/image";

const DashboardProfile = (user) => {
  return (
    <div className="h-[220px] rounded-xl border border-white bg-color-bg-main p-5">
      <div className="flex items-center gap-4">
        <Image
          src={"/profile.jpg"}
          alt="profile image"
          height={100}
          width={100}
          className="h-10 w-10 rounded-full border-[1.5px] border-white object-cover"
        />
        <div>
          <p className="text-[14px]">Gilad Weinberger</p>
          <p className="text-[12px] text-color-gray">Full Stack Developer</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-[14px]">Completed Courses</p>
        <p className="mt-0.5 font-medium text-color-main-light">12 Courses</p>
      </div>
      <div className="mt-5">
        <p className="text-[14px]">Active Streak</p>
        <p className="mt-0.5 flex items-center gap-2 font-medium text-color-main-light">
          15 Days <Image src={"/fire.svg"} alt="fire" width={18} height={18} />
        </p>
      </div>
    </div>
  );
};

export default DashboardProfile;
