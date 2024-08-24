import React, { createContext, useState } from "react";

const FitnessItems = createContext();

const FitnessContext = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [selectedWorkout, setSelectedWorkout] = useState(undefined);
  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
        selectedWorkout,
        setSelectedWorkout,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };