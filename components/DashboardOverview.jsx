import Image from "next/image";
import Link from "next/link";
import { Achievements, Courses } from "../lib/data";

const DashboardOverview = () => {
  const sortedCourses = Courses.sort((a, b) => b.progress - a.progress).slice(
    0,
    3,
  );
  const topAchievements = Achievements.slice(0, 4);

  return (
    <div>
      <div className="w-full rounded-xl border border-white bg-color-bg-main p-5">
        <p>Current Learning Path</p>
        <div className="mt-4 flex flex-col gap-4">
          {sortedCourses.map((course) => (
            <Link
              href={"/"}
              key={course.id}
              className="w-full rounded-lg bg-[#1F2937] p-4"
            >
              <p className="text-[14px]">{course.name}</p>
              <div className="relative mt-1.5 h-2 w-full rounded bg-white">
                <div
                  className="absolute left-0 top-0 h-2 rounded bg-primary"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-[12px] text-color-gray">
                {course.progress}% Completed
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4 w-full rounded-xl border border-white bg-color-bg-main p-5">
        Recent Achievements
        <div className="mt-4 flex items-center gap-4">
          {topAchievements.map((item) => (
            <div
              key={item.id}
              className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg bg-[#1F2937] p-3.5"
            >
              <Image
                src={`/${item.icon}`}
                alt="achievement-icon"
                width={22}
                height={22}
              />
              <p className="text-[14px]">{item.name}</p>
              <p className="text-[12px] text-color-gray">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
