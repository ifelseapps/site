import FontFaceObserver from 'fontfaceobserver';

function parseParams (fonts) {
  return Object.keys(fonts).reduce((result, font) => {
    const params = fonts[font];

    result = [
      ...result,
      ...Object.keys(params)
        .reduce((result, weight) => {
          const style = params[weight];

          if (Array.isArray(style)) {
            return [
              ...result,
              ...style.map(s => ({ font, params: { weight, style: s } }))
            ];
          }

          return [
            ...result,
            { font, params: { weight, style } }
          ];
        }, [])
    ];

    return result;
  }, []);
}

export default (fonts, cb) => {
  const preloaderMinTime = 700;
  const loadTimeout = 5000;
  const start = Date.now();
  const promises = parseParams(fonts)
    .map(({ font, params }) => (new FontFaceObserver(font, params)).load(null, loadTimeout));

  Promise.all(promises)
    .then(
      () => {
        const finish = Date.now();
        // Если шрифты загрузились очень быстро - покрутим еще немного прелоадер
        if (finish < start + preloaderMinTime) {
          setTimeout(cb, preloaderMinTime - (finish - start));
          return;
        }

        cb();
      },
      // Если шрифты не смогли загрузиться - прячем прелоадер, будь что будет...
      cb
    );
};
