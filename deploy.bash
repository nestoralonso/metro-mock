npm run build
mkdir -p build/css
npm run autopref
npm run autopref2
cp -R img/ data/ locales/ build/. 
firebase deploy

