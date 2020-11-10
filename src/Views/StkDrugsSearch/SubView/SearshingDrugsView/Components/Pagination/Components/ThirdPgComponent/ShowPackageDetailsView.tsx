import React, { useContext } from 'react';
import GContext from '@/Views/StkDrugsSearch/GViewContext'

interface IShowPackageDetailsViewProps {

}

const ShowPackageDetailsView: React.FC<IShowPackageDetailsViewProps> =props => {
  const context=useContext(GContext);
  const {packagesSettings:{packages,selectedPackage,hasEdit}}=context;
  return (
    <div>
      
    </div>
  );
};

export default ShowPackageDetailsView;
