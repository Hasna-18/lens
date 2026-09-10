import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EventsLoading() {
  return <LoadingSpinner fullScreen={true} message="Loading Events" />;
}
