export default function getTimeAgo(timestamp) {
  const currentTimestamp = Date.now();
  const postTimestamp = new Date(timestamp).getTime();
  const timeDifference = currentTimestamp - postTimestamp;

  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);

  if (hoursDifference >= 1) {
    return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutesDifference >= 1) {
    return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`;
  }
}