import React from 'react';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  th: {
    padding: '10px 20px',
    fontWeight: 'bold',
    textAlign: 'left',
    background: theme.palette.primary.main,
    color: 'rgba(255,255,255,1)',
    textTransform: 'uppercase',
    cursor: 'pointer',
    height: 50,
    minWidth: 200,
    whiteSpace: 'pre-wrap',
    transition: '0.25s ease-out',
    '&:hover': {
      background: '#7a2877',
    },
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function Icon({ hovered, sort, sortBy }) {
  return (
    <ArrowDownwardOutlinedIcon
      style={{
        transition: '0.25s ease-out',
        transform: `rotate(${sort.order == 'ASC' ? '0deg' : '180deg'})`,
        display: hovered || sort.by == sortBy ? 'inline-block' : 'none',
        color:
          hovered && sort.by != sortBy
            ? 'rgba(255,255,255,0.4)'
            : 'rgba(255,255,255,1)',
      }}
    />
  );
}

export default function Th({ sortBy, sort, setSort, children }) {
  const classes = useStyles();
  const [hovered, setHovered] = React.useState(false);
  function handleSort() {
    setSort({
      by: sortBy,
      order:
        sort.by == sortBy ? (sort.order == 'ASC' ? 'DESC' : 'ASC') : sort.order,
    });
  }

  return (
    <th
      className={classes.th}
      onClick={handleSort}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={classes.spaceBetween}>
        {children}
        <Icon hovered={hovered} sort={sort} sortBy={sortBy} />
      </div>
    </th>
  );
}
