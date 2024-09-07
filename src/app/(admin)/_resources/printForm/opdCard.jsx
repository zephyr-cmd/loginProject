"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import "./print.css";

function OpdCard(props) {
  console.log("L-10, props fitness------->", props);

  let name = props.name || "Mr/Ms._______________________________";
  let age = props.age || "___________";
  return (
    <div className="flex flex-col justify-center items-center p-2 mt-5">
      <div className="flex justify-between w-full mt-5">
        <Image
          src={"/sarvanjana.png"}
          alt="logo"
          height={"125"}
          width={"250"}
        ></Image>
        <div className="flex flex-col text-xs gap-1 items-center">
          <h5> Near Railway Crossing, Khadri Road Shyampur</h5>
          <h5>Rishikesh 249204, Uttrakhand</h5>
          <div>
            <Link href={"tel:+911353152695"}>
              <strong className="text-lg">☎️</strong> &nbsp; +91-1353152695
            </Link>
            {/* <Link href={"tel:+918266028116"}>
              {" "}
              &nbsp;/ &nbsp; +918266028116
            </Link> */}
          </div>
        </div>
      </div>
      <section className="flex flex-col items-center text-black gap-2 m-5 px-5 w-full border-black border-y-2">
        <div className="flex justify-between items-center w-full py-5">
          <div>{`OPD Number: ${props.appointmentId}`}</div>
          <div>{`Date: ${new Date().toLocaleDateString()}`}</div>
        </div>
        <div className="flex justify-between items-center w-full pb-3">
          <div>
            Patient Name: &nbsp;<span className="uppercase">{props.name}</span>
          </div>
          <div>Age : {props.age}</div>
          <div>Sex : {props.gender}</div>
        </div>
      </section>
    </div>
  );
}

export default OpdCard;
