/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

export const LandingPageContainer = (props: any) => {
  return (
    <div
      className="px-4 py-2"
      css={css`
        max-width: 1440px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      `}
    >
      {props.children}
    </div>
  );
};
