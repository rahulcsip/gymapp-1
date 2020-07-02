
export const cardBackgrounds = {
  bg1: require('../../assets/images/card/1.jpeg'),
  bg2: require('../../assets/images/card/2.jpeg'),
  bg3: require('../../assets/images/card/3.jpeg'),
  bg4: require('../../assets/images/card/4.jpeg'),
  bg5: require('../../assets/images/card/5.jpeg'),
  bg6: require('../../assets/images/card/6.jpeg'),
  bg7: require('../../assets/images/card/7.jpeg'),
  bg8: require('../../assets/images/card/8.jpeg'),
}


export const getRandomImage = ()=> {
  const images = Object.keys(cardBackgrounds);
  const count = images.length;
  const index = Math.floor(Math.random()*count) ;
  return cardBackgrounds[ images[index]];
}