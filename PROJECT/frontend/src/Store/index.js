import { proxy } from "valtio";
const state = proxy({
intro: true,
color:'#EFBD48',
isLogoTextTure:true,
isFullTexture:false,
LogoDecal:'./threejs.png',
fullDecal:'./threejs.png'

})
export default state;