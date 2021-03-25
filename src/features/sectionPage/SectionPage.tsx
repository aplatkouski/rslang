import React from 'react';
import { useParams } from 'react-router-dom';

type SectionPageParams = {
  sector?: string;
  page?: string;
  color?: string;
};

export default function SectionPage(): JSX.Element {
  const { sector, page, color } = useParams<SectionPageParams>();
  const bgColor: string = color || 'white';

  return (
    <div style={{ backgroundColor: decodeURIComponent(bgColor) }}>
      Section Page: {sector} {page}
    </div>
  );
}
