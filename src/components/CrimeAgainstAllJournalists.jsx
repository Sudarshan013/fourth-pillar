import React, { memo } from 'react'
import AffectedJournalistCard from './AffectedJournalistCard'
import HomeNavbarActions from './HomeNavbarActions'
import Navbar from './Navbar'

export default memo(function CrimeAgainstAllJournalists() {
  return (
    <div>
      <Navbar>
        <HomeNavbarActions />
      </Navbar>
      <div className="mt-10 view__all__crime__details container">
        <AffectedJournalistCard label={"List of all crimes happened to journalists"} showAllJournalists={true} />
      </div>
    </div>
  );
})
