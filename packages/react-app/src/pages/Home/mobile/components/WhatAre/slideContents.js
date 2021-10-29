const images = [
  //'moontotems_g1_symbol_6k_935.jpg',
  //'moontotems_g1_symbol_6k_258.jpg',
  'moontotems_g1_symbol_6k_330.jpg',
  'moontotems_g1_symbol_6k_332.jpg',
  'moontotems_g1_symbol_6k_367.jpg',
  //'moontotems_g1_symbol_6k_385.jpg',
  //'moontotems_g1_symbol_6k_388.jpg',
  'moontotems_g1_symbol_6k_391.jpg',
  'moontotems_g1_symbol_6k_440.jpg',
  //'moontotems_g1_symbol_6k_442.jpg',
  //'moontotems_g1_symbol_6k_451.jpg',
  //'moontotems_g1_symbol_6k_459.jpg',
  'moontotems_g1_symbol_6k_479.jpg',
  //'moontotems_g1_symbol_6k_485.jpg',
  //'moontotems_g1_symbol_6k_529.jpg',
  //'moontotems_g1_symbol_6k_555.jpg',
  'moontotems_g1_symbol_6k_576.jpg',
  'moontotems_g1_symbol_6k_577.jpg',
  //'moontotems_g1_symbol_6k_597.jpg',
  'moontotems_g1_symbol_6k_688.jpg',
  //'moontotems_g1_symbol_6k_761.jpg',
  'moontotems_g1_symbol_6k_809.jpg'
  //'moontotems_g1_symbol_6k_825.jpg',
  //'moontotems_g1_symbol_6k_838.jpg',
  //'moontotems_g1_symbol_6k_893.jpg',
  //'moontotems_g1_symbol_6k_920.jpg',
  //'moontotems_g1_symbol_6k_921.jpg'
]
const imagePath =
  'https://moontotems.blob.core.windows.net/website-assets/headercrops/'

const slideContents = images.map((image, index) => {
  return {
    index,
    image: `${imagePath}${image}`
  }
})

console.log({ slideContents })

export default slideContents
