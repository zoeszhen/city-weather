import * as moment from 'moment';
// Generate icon link
export const getIconLink = (iconId: string): string =>
  `http://openweathermap.org/img/wn/${iconId}@2x.png`;

//calculate current local time
export const getCurrentTime = (timezoneOffset: number): string =>
  moment()
    .utcOffset(timezoneOffset / 3600)
    .format('lll');

//calculate Unix time
export const getUnixTime = (sec: number): string => moment.unix(sec).format('LT');

export const windDegToDirection = (speed: number, deg: number): string => {
  const speedToString = `${speed} m/s`;
  if (deg > 11.25 && deg < 33.75) {
    return `${speedToString} NNE`;
  }
  if (deg > 33.75 && deg < 56.25) {
    return `${speedToString} ENE`;
  }
  if (deg > 56.25 && deg < 78.75) {
    return `${speedToString} E`;
  }
  if (deg > 78.75 && deg < 101.25) {
    return `${speedToString} ESE`;
  }
  if (deg > 101.25 && deg < 123.75) {
    return `${speedToString} ESE`;
  }
  if (deg > 123.75 && deg < 146.25) {
    return `${speedToString} SE`;
  }
  if (deg > 146.25 && deg < 168.75) {
    return `${speedToString} SSE`;
  }
  if (deg > 168.75 && deg < 191.25) {
    return `${speedToString} S`;
  }
  if (deg > 191.25 && deg < 213.75) {
    return `${speedToString} SSW`;
  }
  if (deg > 213.75 && deg < 236.25) {
    return `${speedToString} SW`;
  }
  if (deg > 236.25 && deg < 258.75) {
    return `${speedToString} WSW`;
  }
  if (deg > 258.75 && deg < 281.25) {
    return `${speedToString} W`;
  }
  if (deg > 281.25 && deg < 303.75) {
    return `${speedToString} WNW`;
  }
  if (deg > 303.75 && deg < 326.25) {
    return `${speedToString} NW`;
  }
  if (deg > 326.25 && deg < 348.75) {
    return `${speedToString} NNW`;
  } else {
    return `${speedToString} N`;
  }
};
