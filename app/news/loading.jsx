import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function NewsLoading() {
  return <LoadingSpinner fullScreen={true} message="Loading News & Insights" />;
}
