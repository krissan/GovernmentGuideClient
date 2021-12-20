import React from "react";

export default function Marker({
  text = "",
  ...props
}) {
  return (
    <div>
        {text}
    </div>
  );
}