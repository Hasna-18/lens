import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function InitiativesLoading() {
  return <LoadingSpinner fullScreen={true} message="Loading Initiatives" />;
}
