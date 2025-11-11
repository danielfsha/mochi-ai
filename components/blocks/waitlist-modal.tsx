"use client";

import { useRef, useState } from "react";

import { MotionConfig, motion } from "motion/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useMeasure from "@/hooks/use-measure";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Input } from "../ui/input";
import { Spinnaker } from "next/font/google";
import { Spinner } from "../ui/spinner";

const STATE = ["initial", "loading", "success", "error"] as const;

export default function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { height } = useMeasure({ ref });
  const [state, setState] = useState<(typeof STATE)[number]>("initial");

  const sendCode = () => {
    // send code logic here
    // wait 5 sec each step
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => {
        setState("initial");
      }, 3000);
    }, 5000);
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ height }}
          className={cn(
            "relative flex w-full max-w-[500px] flex-col overflow-hidden rounded-2xl bg-black will-change-transform",
            "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10),0px_12px_24px_-6px_rgba(51,51,51,0.03),0px_8px_16px_-4px_rgba(51,51,51,0.03),0px_4px_8px_-2px_rgba(51,51,51,0.03),0px_2px_4px_-0.5px_rgba(51,51,51,0.03)]"
          )}
          layoutId="modal-cta"
          exit="none"
          style={{
            width: isOpen ? "450px" : "auto",
            transformOrigin: "bottom center",
          }}
        >
          <div ref={ref} className="h-fit w-full">
            <div className="p-1">
              <motion.div
                layout
                className={`border-primary/10 mb-4 overflow-hidden rounded-xl border ${
                  isOpen
                    ? "bg-white text-black"
                    : "bg-white text-black cursor-pointer"
                } p-2`}
                onClick={() => {
                  if (!isOpen) setIsOpen(true);
                }}
              >
                {/* header part with close button */}
                <div className="w-full flex items-center justify-between">
                  <motion.span
                    layout
                    exit="none"
                    layoutId="modal-cta-text px-4 inline-block cursor-pointer py-2"
                  >
                    Join Waitlist
                  </motion.span>
                  {isOpen && (
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant={"outline"}
                    >
                      <XIcon />
                    </Button>
                  )}
                </div>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(2px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(2px)" }}
                    transition={{
                      delay: 0.05,
                    }}
                    className="py-6 pb-0 flex flex-col gap-8"
                  >
                    <p>Enter your phone to get a verification code.</p>

                    <div className="flex items-center justify-center space-x-1 h-auto">
                      <div className="bg-gray-100 border px-4 py-2 rounded-sm flex items-center justify-center space-x-2 h-full cursor-not-allowed">
                        <Image
                          src="/USA.png"
                          alt="US Flag"
                          width={20}
                          height={20}
                        />
                        <span className="">+1</span>
                      </div>

                      <Input
                        placeholder="(212) 555-1234"
                        className="flex-1 py-5 text-lg"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Checkbox id="agreement" />
                      <Label htmlFor="agreement">
                        <p className="text-gray-500 tracking-tight">
                          By continuing, you agree to receive a one-time
                          passcode and onboarding texts from Moshi. Msg & data
                          rates may apply. Reply STOP to opt out, HELP for help.
                          See our{" "}
                          <Link
                            target="_blank"
                            href={"http://www.google.com"}
                            className="underline"
                          >
                            SMS Terms & Conditions
                          </Link>
                        </p>
                      </Label>
                    </div>

                    {/* bottom ctas */}
                    <div className="w-full flex items-center justify-between space-x-2">
                      <Button
                        disabled={state === "loading" || state === "success"}
                        onClick={() => setIsOpen(false)}
                        className="flex-1"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={state === "loading" || state === "success"}
                        onClick={() => sendCode()}
                        className="flex-1"
                        variant="default"
                      >
                        {state === "initial" && (
                          <motion.span
                            initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit="none"
                          >
                            Send Code
                          </motion.span>
                        )}
                        {state === "loading" && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit="none"
                          >
                            <Spinner />
                          </motion.div>
                        )}
                        {state === "success" && (
                          <motion.span
                            initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit="none"
                          >
                            Sent!
                          </motion.span>
                        )}
                        {state === "error" && (
                          <motion.span
                            initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit="none"
                            className="text-red-500"
                          >
                            Try Again
                          </motion.span>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* footer */}
            <Image
              src="/logo-light.svg"
              alt="mascot-bottom-left"
              width={120}
              height={120}
              className="absolute bottom-0 left-0 -mb-4 -ml-4 opacity-50"
            />
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
