import React from 'react';
import { useParams } from 'react-router-dom';

type SectionPageParams = {
  sector?: string | undefined;
  page?: string | undefined;
  color?: string | undefined;
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
