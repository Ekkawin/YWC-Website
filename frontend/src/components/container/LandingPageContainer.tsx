/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

export const LandingPageContainer = (props: any) => {
  return (
    <div
      className="px-4 py-2"
      css={css`
        background-image: url('map-background.png');
      `}
    >
      {props.children}
    </div>
  );
};
