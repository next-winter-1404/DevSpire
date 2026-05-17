import Image from "next/image";

const AuthImagePanel = () => {
  return (
    <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl ">
      <Image
        src="/images/auth/login.jpg"
        alt="Modern House"
        layout="fill"
        quality={100}
        className="z-0 object-cover hover:scale-106 transition-all duration-200 "
      />
      <div
        className="absolute bottom-9   p-6 bg-black/60 bg-opacity-50
       text-white z-10  rounded-[40px] right-4 left-4 hover:bottom-11 transition-all duration-150  "
      >
        <div className="flex items-center gap-3">
          <div className=" h-full flex items-start -space-x-2  ">
            <Image
              src="/images/auth/person1.png"
              alt="User"
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
            <Image
              src="/images/auth/person2.png"
              alt="User"
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
            <Image
              src="/images/auth/person3.png"
              alt="User"
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
            <Image
              src="/images/auth/person4.png"
              alt="User"
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
          </div>
          <div className="mt-1">
            <p className="text-lg font-bold ">همین حالا به ما بپیوند!</p>
            <p className="text-sm mt-1">
              همراه هزاران کاربر دیگر از خدمات ما استفاده کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePanel;
