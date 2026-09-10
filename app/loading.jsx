import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Loading() {
  return <LoadingSpinner fullScreen={true} message="Loading Universe" />;
}
