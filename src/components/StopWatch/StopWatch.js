import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import {
  BsFillPlayFill,
  BsPauseFill,
  BsFillStopFill,
  BsCameraFill,
} from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import React, { useEffect, useState } from "react";

const StopWatch = () => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let currentInterval;
    if (isTimerStart) {
      currentInterval = setInterval(() => {
        setTimePassed(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(currentInterval);
  }, [isTimerStart, startTime]);

  const handleStartPause = () => {
    if (!isTimerStart) setStartTime(Date.now() - timePassed);
    setIsTimerStart(!isTimerStart);
  };

  const handleStop = () => {
    setIsTimerStart(false);
    setTimePassed(0);
    setLaps([]);
  };

  const handleReset = () => {
    setStartTime(Date.now());
    setTimePassed(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isTimerStart) setLaps([...laps, Date.now() - startTime]);
  };

  const format = (time) => {
    const zeroAdder = (value) => value.toString().padStart(2, "0");
    const seconds = zeroAdder(Math.floor((time / 1000) % 60));
    const minutes = zeroAdder(Math.floor((time / (1000 * 60)) % 60));
    const hours = zeroAdder(Math.floor(time / (1000 * 60 * 60)));
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Flex
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      gap="20"
    >
      <Heading fontSize="5xl">{format(timePassed)}</Heading>
      <ButtonGroup size="lg" isAttached variant="outline">
        <IconButton
          variant="solid"
          colorScheme={isTimerStart ? "yellow" : "green"}
          onClick={handleStartPause}
          icon={
            isTimerStart ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )
          }
        />
        <IconButton
          variant="solid"
          colorScheme="red"
          onClick={handleStop}
          icon={<BsFillStopFill size={30} />}
        />
        <IconButton
          variant="solid"
          colorScheme="blue"
          onClick={handleReset}
          icon={<VscDebugRestart size={30} />}
        />
        <IconButton
          variant="solid"
          colorScheme="blackAlpha"
          onClick={handleLap}
          icon={<BsCameraFill size={30} />}
        />
      </ButtonGroup>
    </Flex>
  );
};

export default StopWatch;
