import { FC } from 'react';

import { Box, BoxProps } from '@material-ui/core';

interface IProps {
  left: React.ReactElement;
  right: React.ReactElement;
  style?: BoxProps;
}

const defaultStyle: BoxProps = {
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '0.3fr 1fr',
};

export const Row: FC<IProps> = ({ left, right, style = defaultStyle }) => (
  <Box {...style}>
    {left}
    {right}
  </Box>
);
