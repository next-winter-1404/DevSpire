import { apiFetch } from "@/core/Server-fetch/fetchApi";
import SayAboutUsSliderClient from "./SayAboutUsSliderClient";

const SayAboutUsSlider = async () => {
  const data = await apiFetch("/comments", {
    params: {
      limit: 5,
    },
    next: {
      revalidate: 60,
    },
  });

  return <SayAboutUsSliderClient initialData={data.comments} />;
};

export default SayAboutUsSlider;
