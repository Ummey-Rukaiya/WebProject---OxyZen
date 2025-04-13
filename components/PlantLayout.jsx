import React from 'react';
import PlantHeader from './PlantHeader';
import { Outlet } from 'react-router-dom';

const PlantLayout = () => {
  return (
    <>
      <PlantHeader />
      <Outlet /> {/* This is where the nested page content will show */}
    </>
  );
};

export default PlantLayout;
