export function search(items, keyword) {
  const result = items.filter((item) => {
    let found = false;
    for (let key in item) {
      if (item[key].toLowerCase().includes(keyword.toLowerCase())) {
        found = true;
        break;
      } else {
        found = false;
        break;
      }
    }
    return found;
  });

  return result;
}

export function extractErrors({ inner }) {
  return inner?.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message };
  }, {});
}

export function formatRupiah(nominal) {
  var formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return formatter.format(nominal);
}

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
