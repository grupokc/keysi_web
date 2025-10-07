export let dollarUSLocale = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
export let percentageUSLocale = Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const formatNumber = (value: number): string => {
  return value.toFixed(2);
};

export const formatData = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => formatData(item));
  } else if (typeof data === 'object' && data !== null) {
    const formattedData: { [key: string]: any } = {};
    for (const key in data) {
      if (typeof data[key] === 'number') {
        formattedData[key] = formatNumber(data[key]);
      } else {
        formattedData[key] = formatData(data[key]);
      }
    }
    return formattedData;
  }
  return data;
};
