import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Helmet>
    </div>
  );
};

Meta.defaultProps = {
  title: 'ISU | Shopping Mall',
  description: 'Shopping Mall',
  keywords: 'clothes, clothing, fashion, online shop, fashion store, isu',
};

export default Meta;
