import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";
import React, { useEffect, useState } from "react";
import { MANAGE_VENUE_API } from "../../../../../Utilities/APIs/APIs";
import useFetchItems from "../../../utils/useFetchItems";

const VenueSelectInput = () => {
  const venues = useFetchItems(MANAGE_VENUE_API);
  const [venueOptions, setVenueOptions] = useState([]);
  useEffect(() => {
    const options = venues.map((venue) => ({
      value: venue._id,
      label: venue.name,
    }));
    setVenueOptions(options);
  }, [venues]);
  return (
    <SelectInput
      options={venueOptions}
      name="venue"
      label="Venue"
      placeholder="Select Venue"
    />
  );
};

export default VenueSelectInput;
