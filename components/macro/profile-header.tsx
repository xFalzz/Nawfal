import Image from "next/image";
import { BadgeCheck } from "lucide-react";



const ProfileHeader = () => {
  return (
    <div className="pad-x flex items-center gap-x-3 pb-6">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src="/images/snp.png"
          alt="Nawfal Irfan Ramadhan"
          fill
          className="rounded-2xl object-cover"
          priority
        />
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background bg-green-500" />
      </div>

      <div className="flex min-w-0 flex-col gap-y-0.5">
        <div className="flex items-center gap-x-1.5">
          <h2 className="truncate text-lg font-semibold leading-tight">
            Nawfal Irfan Ramadhan
          </h2>
          <BadgeCheck className="h-4 w-4 flex-shrink-0 fill-blue-500 text-white" />
        </div>
        <p className="text-sm text-muted-foreground">nawfalirfan005@gmail.com</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
