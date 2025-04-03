/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 27, 2025
 * Purpose: Displays TestCompletePage and its content
 */

import { Header } from "../components/Header";
import SmileyFace from "../../assets/Halfwaythrough.gif";
import NextButton from "../components/NextButton";
import { motion } from "framer-motion";
import { Card } from "react-bootstrap";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

function TestComplete() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Header title="Assessment Complete!" />
      </div>
      <div className="flex flex-col items-center justify-center pt-28 pb-6 px-6 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col h-full"
          >
            <Card className="shadow-lg transition-all duration-300 bg-blue-100 rounded-2xl h-full flex flex-col p-6">
              <Card.Body className="flex flex-col justify-between items-center text-center flex-grow">
                <div>
                  <img
                    loading="lazy"
                    src={SmileyFace}
                    alt="Test completion indicator"
                    className="mx-auto w-[500px] h-auto"
                  />

                  <h2 className="text-4xl font-semibold text-blue-700 mt-4 mb-4">
                    You did a fantastic job!
                  </h2>
                  <p className="text-xl text-gray-700">
                    Your results have been saved!
                  </p>
                </div>
                <div />
              </Card.Body>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col h-full"
          >
            <Card className="shadow-lg transition-all duration-300 bg-blue-100 rounded-2xl h-full flex flex-col p-6">
              <Card.Body className="flex flex-col justify-center items-center text-center flex-grow">
                <h3 className="text-4xl font-semibold text-blue-700 mb-6">
                  Would you like to do another assessment?
                </h3>
                <div className="flex gap-4">
                  <NextButton
                    to="/parents/TestSelection"
                    name="Yes, Let's Go!"
                    icon={false}
                  />
                  <NextButton
                    to="/parents/ParentHomePage"
                    name="No, I'm Done"
                    icon={false}
                  />
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TestComplete;
