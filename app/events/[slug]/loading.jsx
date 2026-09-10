import React from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function EventDetailLoading() {
  return <LoadingSpinner fullScreen={true} message="Loading Event Details" />;
}
