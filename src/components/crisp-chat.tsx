"use client";
import React, { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("f58728d9-464b-40c7-9631-e149b6a37d01");
  }, []);
  return null;
};
