import React from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function NewsDetailLoading() {
  return <LoadingSpinner fullScreen={true} message="Loading News Article" />;
}
