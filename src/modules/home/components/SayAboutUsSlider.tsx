import { apiFetch } from '@/core/Server-fetch/fetchApi'
import SayAboutUsSliderClient from './SayAboutUsSliderClient'

const SayAboutUsSlider = async () => {
  const data = await apiFetch("/houses", {
    params: {
      limit: 5,
    },
    next: {
      revalidate: 60,
    },
  })

  return <SayAboutUsSliderClient initialData={data} />
}

export default SayAboutUsSlider
