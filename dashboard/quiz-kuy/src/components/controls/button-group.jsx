import React from 'react';
import Button from '@material-ui/core/Button';
import MuiButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

const ButtonGroup = ({ buttons, ...others }) => {
  return (
    <MuiButtonGroup
      disableElevation
      size="small"
      variant="contained"
      color="primary"
      {...others}
    >
      {buttons.map((button) => {
        const Icon = button.icon;
        if (typeof button.show == 'undefined' || button.show) {
          return (
            <Tooltip arrow title={button.tooltip} key={button.tooltip}>
              <Button onClick={button.onClick}>
                <Icon style={{ color: 'white' }} />
              </Button>
            </Tooltip>
          );
        }
      })}
    </MuiButtonGroup>
  );
};

export default ButtonGroup;
