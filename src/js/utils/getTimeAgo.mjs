export default function getTimeAgo(timestamp) {
  const currentTimestamp = Date.now();
  const postTimestamp = new Date(timestamp).getTime();
  const timeDifference = currentTimestamp - postTimestamp;

  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference >= 1) {
    return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
  } else if (hoursDifference >= 1) {
    return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutesDifference >= 1) {
    return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`;
  }
}
