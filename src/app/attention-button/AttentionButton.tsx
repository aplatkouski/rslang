import React from 'react';

import './AttentionButton.scss';

interface Props {
  btnTitle: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AttentionButton({ btnTitle, handleClick }: Props): JSX.Element {
  return (
    <div className="btn-wrap">
      <button className="effect-btn" onClick={handleClick} type="button">
        {btnTitle}
      </button>
    </div>
  );
}
