const { spawn } = require("child_process");

const recommendMeal = (processedInput) => {
  console.log("I am in pythonToCall");
  const pythonProcess = spawn("python", [
    "./ModelProcessing.py",
    processedInput,
  ]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Child process output: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Child process error: ${data}`);
  });

  pythonProcess.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

module.exports = recommendMeal;
