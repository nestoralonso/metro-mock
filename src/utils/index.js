export function changeLanguage(langCode) {
  document.cookie=`i18next=${langCode}`;
}


export function readCookie(name) {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');

  if(ca.length === 0) return null;
  for(let part of ca) {
    part = part.trim();
    if (part.startsWith(nameEQ)) return part.substring(nameEQ.length);
  }
  return null;
};
