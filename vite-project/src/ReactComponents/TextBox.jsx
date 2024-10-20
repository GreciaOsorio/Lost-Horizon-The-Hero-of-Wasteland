import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { motion } from "framer-motion";
import { isTextBoxVisibleAtom, textBoxContentAtom } from "../store";
import "./textbox.css";


const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.5 },
  };

export default function TextBox() {
    const [isVisible, setIsVisible] = useAtom(isTextBoxVisibleAtom);
    const [isCloseRequest, setIsCloseRequest] = useState(false);
    const content = useAtomValue(textBoxContentAtom);

    const handleAnimationComplete = () => {
        if (isCloseRequest) {
          setIsVisible(false);
          setIsCloseRequest(false);
        }
      };
    useEffect(() => {
        // function to determine whether to close texbox or not
        const closeHandler = (e) => {
            // if not visible do not run
            if(!isVisible) return;

            if(e.code == "Space"){
                setIsCloseRequest(true);
            }
        };
        // when isVisible changes will run this function again
        window.addEventListener("keydown", closeHandler)
            // instance to close
            return () => {
                window.removeEventListener("keydown", closeHandler);
              };
    }, [isVisible]);
    return (
        isVisible && (
            <motion.div
            className="text-box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isCloseRequest ? "closed" : "open"}
            variants={variants}
            transition={{ duration: 0.2 }}
            onAnimationComplete={handleAnimationComplete}
          >
            <p>{content}</p>
          </motion.div>
        )
    );

}