import React from 'react';

interface IProps {
  text: string;
}

const regExp = new RegExp(
  '(?<prefix>.*)<(?<tag>[bi])>(?<word>.*)</[bi]>(?<postfix>.*)',
  'i'
);

const TransformText = ({ text }: IProps) => {
  const match = text.match(regExp);

  if (match && match.groups) {
    const { prefix, word, postfix } = match.groups;
    return (
      <>
        {prefix}
        {match.groups.tag === 'b' ? <b>{word}</b> : <i>{word}</i>}
        {postfix}
      </>
    );
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{text}</>;
};

export default TransformText;
