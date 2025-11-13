"use client";

import { FormEvent, useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useMeasure from "@/hooks/use-measure";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Checkbox } from "../ui/checkbox";

const STATE = ["initial", "loading", "success", "error"] as const;

export default function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { height } = useMeasure({ ref });
  const [state, setState] = useState<(typeof STATE)[number]>("initial");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);

  // Instead of sending, on submit just collapse the modal
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phone.length < 10) {
      setState("error");
      alert("Please enter a valid phone number.");
      return;
    }

    if (!agreed) {
      setState("error");
      alert("Please agree to the terms.");
      return;
    }

    setState("loading");

    // Simulate an API call delay
    setTimeout(() => {
      setState("success");
      // After showing success, collapse modal
      setTimeout(() => {
        setState("initial");
        setPhone("");
        setAgreed(false);
      }, 1500);
    }, 2000);
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
      <div className="flex items-center justify-center">
        <motion.div
          layout
          animate={{ height }}
          className={cn(
            "relative flex w-full max-w-[500px] flex-col overflow-hidden rounded-2xl bg-black will-change-transform",
            "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10),0px_12px_24px_-6px_rgba(51,51,51,0.03),0px_8px_16px_-4px_rgba(51,51,51,0.03),0px_4px_8px_-2px_rgba(51,51,51,0.03),0px_2px_4px_-0.5px_rgba(51,51,51,0.03)]",
            `w-full max-w-md m-1`
          )}
          layoutId="modal-cta"
          exit="none"
          style={{
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
                <div className="w-full flex items-center justify-between">
                  <motion.span
                    layout
                    exit="none"
                    className="px-4 inline-block cursor-pointer py-2"
                    layoutId="modal-cta-text"
                  >
                    Join Waitlist
                  </motion.span>
                  {isOpen && (
                    <Button onClick={() => setIsOpen(false)} variant="outline">
                      <XIcon />
                    </Button>
                  )}
                </div>

                {isOpen && (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, filter: "blur(2px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(2px)" }}
                    transition={{ delay: 0.05 }}
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
                        <span>+1</span>
                      </div>

                      <Input
                        placeholder="(212) 555-1234"
                        className="flex-1 py-5 text-lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={state === "loading" || state === "success"}
                      />
                    </div>

                    <div className="flex items-start gap-3 px-2">
                      <Checkbox
                        id="agreement"
                        checked={agreed}
                        onCheckedChange={(checked) =>
                          setAgreed(checked === true)
                        }
                        disabled={state === "loading" || state === "success"}
                        className="mt-1"
                      />

                      <Label
                        htmlFor="agreement"
                        className="text-gray-500 tracking-tight"
                      >
                        By continuing, you agree to receive a one-time passcode
                        and onboarding texts from Moshi. Msg & data rates may
                        apply. Reply STOP to opt out, HELP for help. See our{" "}
                        <Link
                          target="_blank"
                          href="http://www.google.com"
                          className="underline"
                        >
                          SMS Terms & Conditions
                        </Link>
                        .
                      </Label>
                    </div>

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
                        type="submit"
                        disabled={state === "loading" || state === "success"}
                        className="flex-1"
                        variant="default"
                      >
                        {state === "initial" || state === "error" ? (
                          "Send Code"
                        ) : state === "loading" ? (
                          <Spinner />
                        ) : (
                          "Sent!"
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </motion.div>
            </div>

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
