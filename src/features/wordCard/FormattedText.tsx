import React from 'react';

interface IProps {
  text: string;
}

const FormattedText = ({ text }: IProps): JSX.Element => {
  const regexp = new RegExp('(<b>|<i>)(.*)(<[/]b>|<[/]i>)', 'i');
  const divided = text.split(regexp);

  return (
    <>
      {divided[0]}
      {divided[1] === '<b>' ? <b>{divided[2]}</b> : <i>{divided[2]}</i>}
      {divided[4]}
    </>
  );
};

export default FormattedText;
