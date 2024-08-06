import React, { useContext, useState } from "react";
import {
  MENU_DEFAULT,
  MENU_MESSAGE_CHATTING,
  PHONE_HEIGHT,
  PHONE_WIDTH,
} from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdCancel, MdWhatsapp } from "react-icons/md";
import { FaLocationDot, FaKey, FaHouse } from "react-icons/fa6";
import LoadingComponent from "./LoadingComponent";

const HouseComponent = ({ isShow }) => {
  const { setMenu, houses } = useContext(MenuContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto py-10 ${
          isShowModal ? "visible" : "invisible"
        }`}
        style={{
          height: PHONE_HEIGHT,
          width: PHONE_WIDTH,
          backgroundColor: "rgba(31, 41, 55, 0.8)",
        }}
      >
        <div className="flex flex-col justify-center rounded-xl h-full w-full px-3">
          <div className="bg-white rounded-lg py-2 flex flex-col w-full p-3">
            <div className="flex justify-between items-center pb-3">
              <span className="truncate font-semibold">
                {dataModal != null ? dataModal.name : ""}
              </span>
              <div>
                <MdCancel
                  className="text-2xl text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => setIsShowModal(false)}
                />
              </div>
            </div>
            {dataModal == null ? (
              <LoadingComponent />
            ) : (
              <div className="w-full">
                <img
                  src={dataModal.image}
                  alt=""
                  className="mx-auto w-28"
                  onError={(error) => {
                    error.target.src = "./files/images/noimage.jpg";
                  }}
                />
                <div className="flex flex-col justify-center items-center gap-2">
                  {/* <h4 className="font-semibold">Business Name</h4> */}
                </div>
                <div className="flex flex-col gap-1 border-b py-2 text-xs">
                  <span className="flex justify-between">
                    <span className="text-gray-800 text-sm">Keyholders:</span>
                    <div className="flex flex-col space-y-1 font-semibold">
                      {dataModal.keyholders.map((v, i) => {
                        return <span>{v}</span>;
                      })}
                    </div>
                  </span>
                </div>
                <div className="flex flex-col gap-3 pb-2 pt-2 text-xs">
                  <span className="flex justify-between items-center">
                    <span className="text-gray-800">Share Key:</span>
                    <span>
                      <input
                        className="border-b w-24 text-base font-medium focus:outline-none"
                        placeholder="CITIZENID"
                        autoComplete="off"
                      />
                    </span>
                    <div>
                      <button
                        className="flex rounded-full text-white bg-blue-500 px-2 py-1 text-xs items-center justify-center"
                        type="button"
                      >
                        <span>Give</span>
                      </button>
                    </div>
                  </span>
                  <span className="flex justify-center space-x-2 items-center pt-2">
                    <div>
                      <FaHouse className="text-sm" />
                    </div>
                    <span>E-Property by Kota Manis</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-0 flex w-full justify-between py-3 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Houses
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      {houses == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto px-4 space-y-4 pb-5"
          style={{
            paddingTop: 65,
          }}
        >
          {houses.map((v, i) => {
            return (
              <div
                key={i}
                className="flex w-full flex-col border-gray-500"
                style={{
                  borderRadius: "15px",
                  borderWidth: "1px",
                }}
              >
                <div
                  className="bg-gray-500 text-gray-700"
                  style={{
                    borderTopLeftRadius: "13px",
                    borderTopRightRadius: "13px",
                  }}
                >
                  <img
                    src={v.image}
                    className="h-auto w-full object-cover"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./files/images/noimage.jpg";
                    }}
                    style={{
                      borderTopLeftRadius: "13px",
                      borderTopRightRadius: "13px",
                    }}
                  />
                </div>
                <div className="px-6 pt-4 pb-2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-base font-medium truncate">House</p>
                    <p className="text-base font-medium truncate">{v.tier}</p>
                  </div>
                  <div className="flex flex-col gap-2 py-2 text-xs">
                    <span className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span>{v.name}</span>
                    </span>
                    <span className="flex justify-between">
                      <span className="text-gray-400">Keyholders:</span>
                      <span className="truncate">
                        {v.keyholders.length} Keys
                      </span>
                    </span>
                    <span className="flex justify-between">
                      <span className="text-gray-400">Garage:</span>
                      <span>{v.is_has_garage ? "Yes" : "No"}</span>
                    </span>
                  </div>
                </div>
                <div className="border-b border border-dashed border-gray-500"></div>
                <div className="px-6 pt-4 pb-2">
                  <div className="flex flex-col gap-2 py-2 text-xs">
                    <span className="flex justify-between">
                      <span className="text-gray-400">House Locked:</span>
                      <span>{v.is_house_locked ? "Yes" : "No"}</span>
                    </span>
                    <span className="flex justify-between">
                      <span className="text-gray-400">Garage Locked:</span>
                      <span>{v.is_garage_locked ? "Yes" : "No"}</span>
                    </span>
                    <span className="flex justify-between">
                      <span className="text-gray-400">Stash Locked:</span>
                      <span>{v.is_stash_locked ? "Yes" : "No"}</span>
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 px-6 pb-6 pt-2">
                  <button
                    className="flex w-full rounded-lg bg-gray-700 py-2 text-sm items-center justify-center space-x-1"
                    type="button"
                    onClick={() => {
                      setIsShowModal(true);
                      setDataModal(v);
                    }}
                  >
                    <span>Keys</span>
                    <div>
                      <FaKey />
                    </div>
                  </button>
                  <button
                    className="flex w-full rounded-lg bg-gray-700 py-2 text-sm items-center justify-center space-x-1"
                    type="button"
                  >
                    <span>Location</span>
                    <div>
                      <FaLocationDot />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default HouseComponent;