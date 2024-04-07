import icon1 from './weather-icons/cloud.svg'
import icon2 from './weather-icons/day-rain.svg'
import icon3 from './weather-icons/day.svg'
import icon4 from './weather-icons/mist.svg'
import icon5 from './weather-icons/night-rain.svg'
import icon6 from './weather-icons/night.svg'
import icon7 from './weather-icons/partial-day.svg'
import icon8 from './weather-icons/partial-night.svg'
import icon9 from './weather-icons/rain.svg'
import icon10 from './weather-icons/snow.svg'
import icon11 from './weather-icons/thunder.svg'

import img1 from './weather-images/cloud.jpg'
import img2 from './weather-images/day-rain.jpg'
import img3 from './weather-images/day.jpg'
import img4 from './weather-images/mist.jpg'
import img5 from './weather-images/night-rain.jpg'
import img6 from './weather-images/night.jpg'
import img7 from './weather-images/partial-day.jpg'
import img8 from './weather-images/partial-night.jpg'
import img9 from './weather-images/rain.jpg'
import img10 from './weather-images/snow.jpg'
import img11 from './weather-images/thunder.jpg'

export function getSvg(data) {
    const svgs = {
      '01d': icon3,
      '01n': icon6,
      '02d': icon7,
      '02n': icon8,
      '03d': icon1,
      '03n': icon1,
      '04d': icon1,
      '04n': icon1,
      '09d': icon9,
      '09n': icon9,
      '10d': icon2,
      '10n': icon5,
      '11d': icon11,
      '11n': icon11,
      '13d': icon10,
      '13n': icon10,
      '50d': icon4,
      '50n': icon4,
    }
    return svgs[data];
}

export function getImg(data) {
    const imgs = {
      '01d': img3,
      '01n': img6,
      '02d': img7,
      '02n': img8,
      '03d': img1,
      '03n': img1,
      '04d': img1,
      '04n': img1,
      '09d': img9,
      '09n': img9,
      '10d': img2,
      '10n': img5,
      '11d': img11,
      '11n': img11,
      '13d': img10,
      '13n': img10,
      '50d': img4,
      '50n': img4,
    }
    return imgs[data];
}