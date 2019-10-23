import React from "react";

const Notification = ({ notification }) => {
  if (notification === null) return null;
  const color = notification.type === "successful" ? "green" : "red";
  const style = {
    border: `2px solid ${color}`,
    color: color,
    borderRadius: "0.4rem",
    fontSize: "1.2rem",
    margin: "1rem auto",
    padding: "0.8rem"
  };
  return <div style={style}>{notification.message}</div>;
};

export default Notification;
