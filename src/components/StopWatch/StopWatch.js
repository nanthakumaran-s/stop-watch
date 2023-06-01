import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Text,
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
  const [snap, setSnap] = useState([]);

  useEffect(() => {
    let currentInterval;
    if (isTimerStart) {
      currentInterval = setInterval(() => {
        setTimePassed(Date.now() - startTime);
      }, 100);
    } else {
      clearInterval(currentInterval);
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
    setSnap([]);
  };

  const handleReset = () => {
    setStartTime(Date.now());
    setTimePassed(0);
    setSnap([]);
  };

  const handleLap = () => {
    if (isTimerStart) setSnap([...snap, Date.now() - startTime]);
  };

  const format = (time) => {
    const seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor(time / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
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
      <Flex
        alignItems="center"
        justifyContent="center"
        gap="5"
        width="60%"
        wrap="wrap"
      >
        {snap.map((snap, i) => (
          <Text
            bg="gray.100"
            px="5"
            py="2"
            fontSize="lg"
            cursor="none"
            _hover={{
              bg: "gray.200",
            }}
            fontWeight="medium"
            rounded="full"
            key={i}
          >
            {format(snap)}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default StopWatch;
