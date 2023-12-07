"use client";
import { ColorScheme, Map, Marker } from "mapkit-react";

interface AppleMapProps {
  token: string;
}

const AppleMap = ({ token }: AppleMapProps) => {
  return (
    // <Map token="eyJhbGciOiJFUzI1NiIsImtpZCI6Ik1BTTQ3NVA0WTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJSVzc4SFg2UDI1IiwiaWF0IjoxNzAxOTYwMTgzLCJleHAiOjE3MzM1OTE0MjYsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.VNdNvIsNKgVsEiVohFDLJNBedex5gtRv0lSh1kckIXTamAaGjzqLMt2mSjztcRrb-HVkuOwKv0ss75JsfX_u8w">
    <Map token={token} allowWheelToZoom colorScheme={ColorScheme.Dark}>
      <Marker latitude={46.52} longitude={6.57} />
    </Map>
  );
};

export default AppleMap;
