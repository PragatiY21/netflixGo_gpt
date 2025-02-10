export const LOGO="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR ="https://easydrawingart.com/wp-content/uploads/2019/08/How-to-draw-a-cartoon-character.jpg.webp"

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDc3MjYwY2NhMzEwMDI3M2E1NzAyMzQyYTFlMWM5MSIsIm5iZiI6MTczNjc2MTY2Ny4zMDA5OTk5LCJzdWIiOiI2Nzg0ZTE0Mzk0ZmM4N2VmNDg3YjJiZjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oEvdF-zGSzBOpZMV9UZut9CMp18oTR8Bg3oGPzEj0_s'
      //'Bearer' + process.env.REACT_APP_TMDB_KEY,
    }
  };

  export const IMG_CDN_URL ="https://image.tmdb.org/t/p/w500";

  export const BG_URL="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg";

  export const SUPPORTED_LANGUAGES=[{identifier :"en",name :"english"},{identifier :"hindi",name :"Hindi"},{identifier :"spanish",name :"Spanish"}]

  export const OPENAI_KEY=process.env.REACT_APP_OPENAI_KEY;