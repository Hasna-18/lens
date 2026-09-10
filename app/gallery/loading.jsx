import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function GalleryLoading() {
  return <LoadingSpinner fullScreen={true} message="Loading Media & Gallery" />;
}
