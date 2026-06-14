import PropertyValuationView from "@/modules/main/property/property-valuation/views/PropertyValuationView";
import { customMetadataGenerator } from "@/utils/helper/Metadata";

export async function generateMetadata() {
  return customMetadataGenerator({
    title: "تخمین قیمت",
    description: "ارزش ملک موردنظرتان را تخمین بزنید",
  });
}
const PropertyValuationPage = () => {
  return (
    <>
      <PropertyValuationView />
    </>
  );
};

export default PropertyValuationPage;
