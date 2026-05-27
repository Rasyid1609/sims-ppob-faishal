import React from 'react'
import { serviceIcons } from "../../constants/serviceIcons";
import { useNavigate } from "react-router-dom";

export default function ServiceItem({service}) {
    const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(
          `/service/${service.service_code}`
        )
      }
      className="
        flex
        flex-col
        items-center
        cursor-pointer
      "
    >
      <img
        src={
          serviceIcons[service.service_code]
        }
        alt={service.service_name}
        className="w-16 h-16"
      />

      <p className="text-xs text-center mt-2">
        {service.service_name}
      </p>
    </div>
  );
}
