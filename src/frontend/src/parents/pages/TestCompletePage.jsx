import { Header } from "../components/Header";
import SmileyFace from "../../assets/smileyface.svg";
import NextButton from "../components/NextButton";
import { motion } from "framer-motion";
import { Card, Container } from "react-bootstrap";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

function TestComplete() {
  return (
    <div className="flex flex-col items-center h-screen bg-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full">
        <Header title="Assessment Complete!" />
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-10 pt-40 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-4xl">
          <motion.div variants={cardVariants} initial="hidden" animate="show" className="flex-1">
            <Card className="shadow-lg transition-all duration-300 text-center bg-blue-100 rounded-2xl p-6 w-full h-full flex flex-col justify-center">
              <Card.Body>
                <div className="flex justify-center mb-4">
                  <img
                    loading="lazy"
                    src={SmileyFace}
                    alt="Test completion indicator"
                    className="object-contain w-[120px]"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-blue-700">
                    You did a fantastic job!
                </h2>
                <p className="text-lg text-gray-700 mt-2">
                  Your results have been saved!
                  {/* <span className="block font-medium mt-1">You did a fantastic job!</span> */}
                </p>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div variants={cardVariants} initial="hidden" animate="show" className="flex-1">
            <Card className="shadow-lg transition-all duration-300 text-center bg-blue-100 rounded-2xl p-6 w-full h-full flex flex-col justify-center">
              <Card.Body>
                <h3 className="text-xl font-semibold text-blue-700 mt-10 mb-6">
                  Would you like to do another assessment?
                </h3>
                <div className="flex gap-4 justify-center">
                  <NextButton to="/parents/TestSelection" name="Yes, Let's Go!" icon={false} />
                  <NextButton to="/parents/ParentHomePage" name="No, I'm Done" icon={false} />
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