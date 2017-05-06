import format from 'date-fns/format';

window.addEventListener('DOMContentLoaded', () => {
  console.log(`[${format(Date.now(), 'YYYY-MM-DD HH:mm:ss')}] DOMContentLoaded`);
});
