import { InfoCircledIcon } from "@radix-ui/react-icons";
import { FacilityCard } from "./FacilityCard";
import { useTranslations } from "next-intl";

export default function FacilitiesTab({
  tags,
}: {
  tags: string | string[] | null | undefined;
}) {
  const normalizedTags = Array.isArray(tags)
    ? tags
    : typeof tags === "string" && tags.trim() !== ""
      ? [tags]
      : [];
const t = useTranslations("fastReserveDetail");

  return (
    <div className="w-full">
      {normalizedTags.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
          <InfoCircledIcon className="text-4xl text-gray-300 mb-2" />
          <p className="text-gray-500 font-medium">
  {t("noFacilities")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {normalizedTags.map((facility, i) => (
            <div key={i} className="h-full">
              <FacilityCard facility={facility} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
