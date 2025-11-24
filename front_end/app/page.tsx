import React from "react";
import "./globals.css";
import { HomePage } from "../components/homepage";
import ChatWidget from "../components/chatwidget";

export default function Home() {
  return (
    <>
      <HomePage />
      <ChatWidget />
    </>
  );
}
