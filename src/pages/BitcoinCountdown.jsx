import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBitcoin } from "react-icons/fa";
import CountDownComponent from "../components/CountDownComponent";
import Loader from "../components/Loader";
import "../styles/bitcoinCountdown.css";
import { calculateFutureDate } from "../utils/calculateFutureDate";
import { startCountdown } from "../utils/startCountdown";

const BitcoinCountdown = () => {
  const [blockHeight, setBlockHeight] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [predictDate, setPredictedDate] = useState("");
  const [blocksRemains, setBlocksRemains] = useState("");
  const [bitCoinPrice, setBitCoinPrice] = useState(0);
  const [fetchInterval, setFetchInterval] = useState(null);

  // Function to fetch current Block Height
  const fetchBlockHeight = async () => {
    try {
      const resData = await axios.get("https://api.blockchain.info/stats");
      if (resData.status !== 200) {
        throw new Error(
          "Failed to fetch Bitcoin price. Status: " + resData.status
        );
      }
      setBlockHeight(resData.data);
    } catch (error) {
      console.error("Error fetching block height:", error);
    }
  };

  // Function to fetch current Bitcoin Price
  const fetchBitCoinPrice = async () => {
    try {
      const resData = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR"
      );

      if (resData.status !== 200) {
        throw new Error(
          "Failed to fetch Bitcoin price. Status: " + resData.status
        );
      }
      const { USD } = resData.data;
      setBitCoinPrice(USD);
    } catch (error) {
      console.error("Error fetching Bitcoin price:", error);
    }
  };

  // Function to calculate the timer until the next Bitcoin halving
  const calculateCountdown = () => {
    if (!blockHeight) return;

    const fourthHalvingBlockHeight = 840000;
    const blocksRemaining =
      fourthHalvingBlockHeight - blockHeight.n_blocks_total;
    setBlocksRemains(blocksRemaining);

    const estimatedMinutes =
      blocksRemaining * Math.floor(blockHeight.minutes_between_blocks);

    const { predictDateTime, formattedDate } =
      calculateFutureDate(estimatedMinutes);
    setPredictedDate(formattedDate);

    startCountdown(predictDateTime, setCountdown, fetchInterval);
  };

  useEffect(() => {
    const intervalPriceUpdate = setInterval(fetchBitCoinPrice, 1500);
    const intervalBlockHeight = setInterval(fetchBlockHeight, 1000);
    setFetchInterval(intervalBlockHeight);

    return () => {
      clearInterval(intervalPriceUpdate);
      clearInterval(intervalBlockHeight);
    };
  }, []);

  useEffect(() => {
    calculateCountdown();
  }, [blockHeight]);

  return (
    <>
      <div className="flex flex-col justify-center items-center m-10 h-full responsive">
        <h1 className="flex text-[#ff984e] font-bold m-7 text-5xl">
          <FaBitcoin className="text-[#ff984e]" />
          Live Bitcoin Halving Countdown
        </h1>
        <p className="text-xs text-[#a0a1a4]">
          Auto updates in real-time with every new block
        </p>
        <div className="flex text-xl mid-section">
          <div className="flex flex-col items-center justify-evenly w-72 h-40 m-5 px-10 py-2 bg-[#121419] rounded-lg gap-4">
            <span className="text-[#a0a1a4] bg-[#121419] text-lg font-semibold">
              Predicted Date
            </span>
            <span className="text-[#05c37c] text-2xl font-semibold bg-[#121419]">
              {predictDate ? predictDate : <Loader />}
            </span>
            <span className="bg-[#172b28] block w-full h-1 mb-3"></span>
          </div>
          <div className="flex flex-col items-center justify-evenly w-96 h-40 m-5 px-10 py-3 bg-[#121419] rounded-lg gap-5 count-down">
            <span className="text-[#a0a1a4] bg-[#121419] text-lg font-semibold">
              Est. Time Remaining
            </span>
            <span className="bg-[#121419]">
              {countdown ? (
                <CountDownComponent countdown={countdown} />
              ) : (
                <Loader />
              )}
            </span>
            <span className="bg-[#172b28] block w-full h-1 mb-3"></span>
          </div>
          <div className="flex flex-col items-center justify-evenly w-72 h-40 m-5 px-53 py-2 bg-[#121419] rounded-lg gap-4">
            <span className="text-[#a0a1a4] bg-[#121419] text-lg font-semibold">
              Blocks Remaining
            </span>
            <span className="text-[#05c37c] text-2xl font-semibold bg-[#121419]">
              {blocksRemains ? blocksRemains : <Loader />}
            </span>
            <div className="flex w-full items-center justify-center bg-[#121419]">
              <span className="w-14 h-1 m-4 bg-[#172b28]"></span>
              <span className="relative bg-[#121419] flex items-center">
                <span className="text-[#a0a1a4] bg-[#121419] text-sm font-semibold ">
                  Target #840,000
                </span>
              </span>
              <span className="w-14 h-1 m-4 bg-[#172b28]"></span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-evenly w-[65rem] h-44 m-5 px-10 py-2 bg-[#121419] rounded-lg gap-4 price-section">
          <span className="flex items-center text-[#a0a1a4] bg-[#121419] text-lg font-semibold">
            <FaBitcoin className="text-[#cac9c9]" /> BitCoin Price
          </span>
          <span className="text-[#05c37c] text-2xl font-semibold bg-[#121419]">
            {bitCoinPrice ? `$${bitCoinPrice}` : <Loader />}
          </span>
          <div className="flex w-full items-center justify-center bg-[#121419]">
            <span className="w-full h-1 m-4 bg-[#172b28]"></span>
            <div className="blob green"></div>
            <span className="relative bg-[#121419]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-95"></span>
              <span className="text-[#a0a1a4] bg-[#121419] text-sm">Live</span>
            </span>
            <span className="w-full h-1 m-4 bg-[#172b28]"></span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly w-[65rem] h-44 m-5 px-10 py-2 bg-[#121419] rounded-lg gap-4 block-height">
          <span className="text-[#a0a1a4] bg-[#121419] text-lg font-semibold">
            Current Block height
          </span>
          <span className="text-[#05c37c] text-2xl font-semibold bg-[#121419]">
            {blockHeight ? blockHeight.n_blocks_total : <Loader />}
          </span>
          <span className="bg-[#172b28] block w-full h-1 mb-3"></span>
        </div>
      </div>
    </>
  );
};

export default BitcoinCountdown;
