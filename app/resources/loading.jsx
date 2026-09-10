import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ResourcesLoading() {
  return <LoadingSpinner fullScreen={true} message="Loading Academic Resources" />;
}
