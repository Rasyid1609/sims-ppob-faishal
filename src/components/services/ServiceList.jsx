import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../features/service/serviceSlice";

import ServiceItem from "./ServiceItem";

export default function ServiceList() {
    const dispatch = useDispatch();

  const { data } = useSelector(
    (state) => state.service
  );

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);
  return (
    <div className="mt-10">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {data?.map((service) => (
          <ServiceItem
            key={service.service_code}
            service={service}
          />
        ))}
      </div>
    </div>
  );
}
