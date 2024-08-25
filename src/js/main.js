const lifts = [
  {
    id: "lift-1",
    name: "Lift 1",
    currentFloor: 0,
    isMoving: false,
  },
  {
    id: "lift-2",
    name: "Lift 2",
    currentFloor: 0,
    isMoving: false,
  },
];

const callLift = (calledFloor, direction) => {
  console.log(`Calling lift to floor ${calledFloor}, direction: ${direction}`);

  const availableLift = findNearestAvailableLift(calledFloor);
  if (!availableLift) {
    console.log("No lifts available");
    return;
  }

  if (calledFloor !== availableLift.currentFloor) {
    moveLiftToFloor(availableLift, calledFloor);
  } else {
    console.log(`${availableLift.name} is already at floor ${calledFloor}`);
    operateDoors(availableLift, "open");
  }
};

const findNearestAvailableLift = (calledFloor) => {
  return lifts.find((lift) => !lift.isMoving);
};

const moveLiftToFloor = (lift, calledFloor) => {
  lift.isMoving = true;
  const liftElement = document.getElementById(lift.id);
  const targetHeight = calculateTargetHeight(calledFloor);
  const floorsToTravel = Math.abs(calledFloor - lift.currentFloor);
  const travelTime = floorsToTravel * 2000; // 2 seconds per floor

  operateDoors(lift, "close");

  setTimeout(() => {
    liftElement.style.transition = `bottom ${travelTime / 1000}s`;
    liftElement.style.bottom = `${targetHeight}px`;

    setTimeout(() => {
      lift.currentFloor = calledFloor;
      lift.isMoving = false;
      console.log(`${lift.name} reached floor ${calledFloor}`);

      operateDoors(lift, "open");

      setTimeout(() => {
        operateDoors(lift, "close");
      }, 2500); // Doors remain open for 2.5 seconds
    }, travelTime); // Time to move to the target floor
  }, 500); // Time for doors to close before moving
};

const calculateTargetHeight = (floor) => {
  const floorHeight = 100;
  return floorHeight * (floor - 1);
};

const operateDoors = (lift, action) => {
  const liftElement = document.getElementById(lift.id);
  liftElement.classList.toggle("open", action === "open");
  liftElement.classList.toggle("close", action === "close");
};
