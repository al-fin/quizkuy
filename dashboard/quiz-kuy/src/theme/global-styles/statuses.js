const statusShape = {
  whiteSpace: 'nowrap',
  padding: '4px 12px',
  textTransform: 'uppercase',
  borderRadius: 4,
};

export const statuses = () => ({
  '.STATUS_ORANGE': {
    ...statusShape,
    color: 'rgb(230, 128, 43)',
    background: 'rgba(230, 128, 43, 0.2)',
  },
  '.STATUS_GREEN': {
    ...statusShape,
    color: 'rgba(27, 170, 86, 1)',
    background: 'rgba(27, 170, 86, 0.2)',
  },
  '.STATUS_RED': {
    ...statusShape,
    color: 'rgba(220, 0, 78, 1)',
    background: 'rgba(220, 0, 78, 0.2)',
  },
  '.STATUS_GREY': {
    ...statusShape,
    color: 'rgba(0,0,0, 0.5)',
    background: 'rgba(0,0,0, 0.1)',
  },
});
