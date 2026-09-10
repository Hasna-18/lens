import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function FacultyLoading() {
  return <LoadingSpinner fullScreen={true} message="Loading Faculty Profiles" />;
}
